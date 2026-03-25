import { Router } from 'express';
import { getDoctors, getAllUsers, updateDoctorLocation, deleteUser } from '../controllers/adminController';

const router = Router();

// In a real app we'd have authenticateAdmin middleware
router.get('/doctors', getDoctors);
router.get('/users', getAllUsers);
router.patch('/doctor/:doctorId/location', updateDoctorLocation);
router.delete('/users/:userId', deleteUser);

export default router;
