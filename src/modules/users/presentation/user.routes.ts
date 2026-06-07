import { Router } from 'express';
import { UserController } from './user.controller';
import { UserService } from '../application/user.service.impl';
import { UserRepository } from '../infrastructure/user.repository';
import { authMiddleware } from '@/middleware/auth.middleware';
import { authRateLimiter } from '@/middleware/rate-limit.middleware';

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post('/auth/register', authRateLimiter, userController.register);
router.post('/auth/login', authRateLimiter, userController.login);
router.get('/users/me', authMiddleware, userController.getProfile);

export default router;
