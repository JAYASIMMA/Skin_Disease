import { Request, Response } from 'express';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ChatSession, ChatMessage } from '../models';

const UPLOAD_DIR = path.resolve(__dirname, '../../uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const ZHIPU_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

export const createChatSession = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { title } = req.body;
    
    const session = await ChatSession.create({
      userId: user.id,
      title,
    });
    
    return res.json(session);
  } catch (error: any) {
    return res.status(500).json({ detail: error.message });
  }
};

export const getChatSessions = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const sessions = await ChatSession.findAll({
      where: { userId: user.id },
      order: [['createdAt', 'DESC']],
    });
    
    return res.json(sessions);
  } catch (error: any) {
    return res.status(500).json({ detail: error.message });
  }
};

export const getChatSessionDetail = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { sessionId } = req.params;
    
    const session = await ChatSession.findOne({
      where: { id: parseInt(sessionId as string, 10), userId: user.id },
      include: [{ model: ChatMessage, as: 'messages' }]
    });
    
    if (!session) {
      return res.status(404).json({ detail: 'Session not found' });
    }
    
    return res.json(session);
  } catch (error: any) {
    return res.status(500).json({ detail: error.message });
  }
};

export const addChatMessage = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { sessionId } = req.params;
    const { role, content, timestamp, image_base64 } = req.body;
    
    const session = await ChatSession.findOne({
      where: { id: parseInt(sessionId as string, 10), userId: user.id }
    });
    
    if (!session) {
      return res.status(404).json({ detail: 'Session not found' });
    }
    
    let imageUrl = null;
    
    if (image_base64) {
      // Save image to disk
      const filename = `chat_${uuidv4()}.jpg`;
      const filepath = path.join(UPLOAD_DIR, filename);
      // Remove data:image/jpeg;base64, prefix if present
      const base64Data = image_base64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(filepath, buffer);
      
      imageUrl = `/uploads/${filename}`;
    }
    
    const message = await ChatMessage.create({
      sessionId: session.id,
      role,
      content,
      imageUrl,
      timestamp,
    });
    
    return res.json(message);
  } catch (error: any) {
    return res.status(500).json({ detail: error.message });
  }
};

export const chatWithAi = async (req: Request, res: Response) => {
  try {
    const { messages, provider } = req.body;
    
    console.log(`Processing clinical chat request with ${messages?.length || 0} messages`);
    
    const systemPrompt = "You are 'SkinTermo AI', a specialized Cardiology, Dermatology and Skincare AI Assistant. " +
      "Your goal is to analyze skin conditions described by the user and provide detailed, clinical, yet empathetic advice. " +
      "Structure your response logically: " +
      "1. Analysis of the condition based on symptoms. " +
      "2. Recommended medical treatments (OTC or Prescription-grade suggestions). " +
      "3. Home remedies and preventive skincare routines. " +
      "IMPORTANT: Always include a medical disclaimer advising to consult a physical doctor for formal diagnosis.";
      
    // Handle Ollama Integration
    if (provider === 'ollama' || provider === 'Jayasimma/Dermo_ai') {
      const ollamaMessages = messages.map((m: any) => {
        return {
          role: m.role,
          content: m.content,
          images: m.image_base64 ? [m.image_base64.replace(/^data:image\/\w+;base64,/, "")] : undefined
        };
      });

      try {
        console.log('Routing to local Ollama (Jayasimma/Dermo_ai)...');
        const ollamaResponse = await axios.post('http://127.0.0.1:11434/api/chat', {
          model: "Jayasimma/Dermo_ai",
          messages: [{ role: "system", content: systemPrompt }, ...ollamaMessages],
          stream: false
        });
        return res.json({ content: ollamaResponse.data.message.content });
      } catch (err: any) {
        console.error('Ollama Error:', err.message);
        return res.status(500).json({ detail: `Ollama Failed: ${err.message}` });
      }
    }
    
    // Default to ZhipuAI
    const filteredMessages = messages.map((m: any) => {
      const msgObj: any = { role: m.role };
      
      if (m.imageUrl || m.image_base64) {
        // If it has an image, format for multimodal vision model
        msgObj.content = [
          { type: "text", text: m.content }
        ];
        
        if (m.image_base64) {
          const base64Data = m.image_base64.replace(/^data:image\/\w+;base64,/, "");
          msgObj.content.push({
            type: "image_url",
            image_url: { url: `data:image/jpeg;base64,${base64Data}` }
          });
        }
      } else {
        msgObj.content = m.content;
      }
      return msgObj;
    });
    
    // Determine model based on if any message has an image component
    const hasImage = messages.some((m: any) => m.imageUrl || m.image_base64);
    const modelUsed = hasImage ? "glm-4.6v-flash" : "glm-4.7-flash";
    
    const payload = {
      model: modelUsed,
      messages: [
        { role: "system", content: systemPrompt },
        ...filteredMessages
      ],
      temperature: 0.3
    };
    
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.ZHIPU_API_KEY}`
    };
    
    const response = await axios.post(ZHIPU_URL, payload, { headers });
    return res.json({ content: response.data.choices[0].message.content });
    
  } catch (error: any) {
    console.error('Chat Error:', error.response?.data || error.message);
    const status = error.response?.status || 500;
    const detail = error.response?.data ? `AI Error: ${JSON.stringify(error.response.data)}` : error.message;
    return res.status(status).json({ detail });
  }
};
