import { Request, Response } from 'express';
import { User, DoctorProfile } from '../models';

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await User.findAll({
      where: { role: 'doctor' },
      include: [{ model: DoctorProfile, as: 'profile' }],
      attributes: { exclude: ['password'] }
    });
    return res.json(doctors);
  } catch (error: any) {
    return res.status(500).json({ detail: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    return res.json(users);
  } catch (error: any) {
    return res.status(500).json({ detail: error.message });
  }
};

export const updateDoctorLocation = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;
    const { latitude, longitude } = req.body;
    
    let profile = await DoctorProfile.findOne({ where: { userId: parseInt(doctorId as string, 10) } });
    
    if (!profile) {
      profile = await DoctorProfile.create({
        userId: parseInt(doctorId as string, 10),
        latitude,
        longitude
      });
    } else {
      await profile.update({ latitude, longitude });
    }
    
    return res.json({ message: 'Location updated successfully' });
  } catch (error: any) {
    return res.status(500).json({ detail: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findByPk(parseInt(userId as string, 10));
    
    if (!user) {
      return res.status(404).json({ detail: 'User not found' });
    }
    
    await user.destroy();
    return res.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ detail: error.message });
  }
};
