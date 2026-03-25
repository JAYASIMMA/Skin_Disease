import { Request, Response } from 'express';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { AnalysisHistory, User } from '../models';

const ZHIPU_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
const UPLOAD_DIR = path.resolve(__dirname, '../../uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const analyzeSkin = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { image_base64 } = req.body;
    
    if (!image_base64) {
      return res.status(400).json({ detail: 'image_base64 is required' });
    }

    const prompt = `You are a highly experienced Dermatologist. Analyze this clinical skin image with precision.
    Focus on: lesion type (macule, papule, etc.), color, distribution, and border characteristics.
    
    Provide a professional assessment in the following JSON format ONLY:
    {
      "disease_name": "Primary suspected condition",
      "confidence": "High/Medium/Low",
      "severity": "Mild/Moderate/Severe",
      "description": "Professional clinical description including differential diagnoses if relevant. End with: 'DISCLAIMER: This is an AI-assisted analysis for informational purposes only. Consult a human specialist.'",
      "symptoms": ["list", "clinical", "signs"],
      "recommendations": ["immediate", "steps", "or", "prevention"],
      "seek_medical_attention": true/false
    }`;

    const payload = {
      model: "glm-4.6v-flash",
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${image_base64}` }
            }
          ]
        }
      ]
    };

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.ZHIPU_API_KEY}`
    };

    // Save image to disk
    const filename = `${uuidv4()}.jpg`;
    const filepath = path.join(UPLOAD_DIR, filename);
    const buffer = Buffer.from(image_base64, 'base64');
    fs.writeFileSync(filepath, buffer);
    
    const imageUrl = `/uploads/${filename}`;
    
    console.log('Sending enhanced analysis request to ZhipuAI...');
    const response = await axios.post(ZHIPU_URL, payload, { headers });
    
    const rawContent = response.data.choices[0].message.content;
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const parsedJson = JSON.parse(jsonMatch[0]);
      
      const history = await AnalysisHistory.create({
        userId: user.id,
        imageUrl,
        diseaseName: parsedJson.disease_name,
        confidence: parsedJson.confidence,
        severity: parsedJson.severity,
        description: parsedJson.description,
        symptoms: parsedJson.symptoms,
        recommendations: parsedJson.recommendations,
        seekMedicalAttention: parsedJson.seek_medical_attention,
      });
      
      parsedJson.image_url = imageUrl;
      return res.json(parsedJson);
    }
    
    return res.json({
      disease_name: "Analysis Failed",
      description: "Could not parse AI response",
      confidence: "N/A",
      severity: "N/A",
      symptoms: [],
      recommendations: ["Try again later"],
      seek_medical_attention: false,
      image_url: imageUrl
    });
    
  } catch (error: any) {
    console.error('Analysis Error:', error.response?.data || error.message);
    const status = error.response?.status || 500;
    const detail = error.response?.data ? `ZhipuAI Error: ${JSON.stringify(error.response.data)}` : error.message;
    return res.status(status).json({ detail });
  }
};

export const getAnalysisHistory = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const history = await AnalysisHistory.findAll({
      where: { userId: user.id },
      order: [['timestamp', 'DESC']],
    });
    return res.json(history);
  } catch (error: any) {
    return res.status(500).json({ detail: error.message });
  }
};
