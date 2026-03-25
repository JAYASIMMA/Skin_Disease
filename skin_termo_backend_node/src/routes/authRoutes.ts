import { Router } from 'express';
import { register, login, getMe, updateMe } from '../controllers/authController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateToken, getMe);
router.patch('/me', authenticateToken, updateMe);

export default router;
