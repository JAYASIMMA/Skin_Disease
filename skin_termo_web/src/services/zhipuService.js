import axios from 'axios';

// The Backend is running on port 8000
const BACKEND_URL = 'http://127.0.0.1:8000';

export const analyzeSkinImage = async (base64Image) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${BACKEND_URL}/analysis/scan`, 
      { image_base64: base64Image },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Analysis Error:', error.response?.data || error.message);
    throw error;
  }
};

export const chatWithAI = async (messages) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${BACKEND_URL}/chat/message`, 
      { messages: messages },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.content;
  } catch (error) {
    console.error('Chat AI Error:', error.response?.data || error.message);
    throw error;
  }
};

export const getAnalysisHistory = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${BACKEND_URL}/analysis/history`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Fetch History Error:', error.response?.data || error.message);
    throw error;
  }
};
