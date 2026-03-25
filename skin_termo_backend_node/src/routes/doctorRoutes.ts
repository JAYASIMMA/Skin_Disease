import { Router } from 'express';
import { getVerifiedDoctors, onboardDoctor, getMyProfile, getDoctorProfile } from '../controllers/doctorController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// In Python: @app.get('/doctors')
router.get('/', getVerifiedDoctors);

// Use /doctor base path for these
const doctorRouter = Router();
doctorRouter.post('/onboarding', authenticateToken, onboardDoctor);
doctorRouter.get('/me/profile', authenticateToken, getMyProfile);
doctorRouter.get('/profile/:userId', authenticateToken, getDoctorProfile);

export { router, doctorRouter };
