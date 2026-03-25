import { Request, Response } from 'express';
import { User, DoctorProfile } from '../models';

export const getVerifiedDoctors = async (req: Request, res: Response) => {
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

export const onboardDoctor = async (req: Request, res: Response) => {
  try {
    // In actual app, we could get user from JWT, but match python logic
    const { fullName, medicalDegree, specialization, yearsOfExperience, hospitalAffiliation, latitude, longitude, currentAddress, biography } = req.body;
    
    // Find user by name (simulating python logic)
    const user = await User.findOne({ where: { name: fullName } });
    
    if (!user) {
      return res.status(404).json({ detail: 'User account not found. Please register first.' });
    }
    
    let profile = await DoctorProfile.findOne({ where: { userId: user.id } });
    
    if (profile) {
      await profile.update({
        fullName,
        medicalDegree,
        specialization,
        yearsOfExperience,
        hospitalAffiliation,
        latitude,
        longitude,
        currentAddress,
        biography
      });
    } else {
      profile = await DoctorProfile.create({
        userId: user.id,
        fullName,
        medicalDegree,
        specialization,
        yearsOfExperience,
        hospitalAffiliation,
        latitude,
        longitude,
        currentAddress,
        biography
      });
    }
    
    return res.json(profile);
  } catch (error: any) {
    return res.status(500).json({ detail: error.message });
  }
};

export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (user.role !== 'doctor') {
      return res.status(403).json({ detail: 'Not authorized' });
    }
    
    const profile = await DoctorProfile.findOne({ where: { userId: user.id } });
    if (!profile) {
      return res.status(404).json({ detail: 'Profile not found' });
    }
    
    return res.json(profile);
  } catch (error: any) {
    return res.status(500).json({ detail: error.message });
  }
};

export const getDoctorProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const profile = await DoctorProfile.findOne({ where: { userId: parseInt(userId as string, 10) } });
    
    if (!profile) {
      return res.status(404).json({ detail: 'Profile not found' });
    }
    
    return res.json(profile);
  } catch (error: any) {
    return res.status(500).json({ detail: error.message });
  }
};
