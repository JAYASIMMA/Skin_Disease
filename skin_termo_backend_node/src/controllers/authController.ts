import { Request, Response } from 'express';
import { User, DoctorProfile } from '../models';
import { getPasswordHash, verifyPassword, createAccessToken } from '../utils/auth';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ detail: 'Email already registered' });
    }
    
    const hashedPassword = getPasswordHash(password);
    
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'patient'
    });
    
    // In Express we can just hide password from response
    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ detail: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    
    if (!user || !verifyPassword(password, user.password)) {
      return res.status(401).json({ detail: 'Incorrect email or password' });
    }
    
    const accessToken = createAccessToken({ sub: user.email, role: user.role });
    
    let isProfileComplete = true;
    if (user.role === 'doctor') {
      const profile = await DoctorProfile.findOne({ where: { userId: user.id } });
      isProfileComplete = profile !== null && profile.medicalDegree !== null;
    }
    
    return res.json({
      access_token: accessToken,
      token_type: 'bearer',
      role: user.role,
      name: user.name,
      is_profile_complete: isProfileComplete
    });
  } catch (error) {
    return res.status(500).json({ detail: (error as Error).message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { password, ...userWithoutPassword } = user.toJSON();
    return res.json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ detail: (error as Error).message });
  }
};

export const updateMe = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { name, email } = req.body;
    
    if (name) {
      user.name = name;
    }
    
    if (email) {
      const existing = await User.findOne({ where: { email } });
      if (existing && existing.id !== user.id) {
        return res.status(400).json({ detail: 'Email already in use' });
      }
      user.email = email;
    }
    
    await user.save();
    
    const { password, ...userWithoutPassword } = user.toJSON();
    return res.json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ detail: (error as Error).message });
  }
};
