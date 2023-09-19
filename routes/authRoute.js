import express from 'express';
import { 
    forgotPasswordController,
    loginController,
    registerController,
    testController 
} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// router object
const router = express.Router();

// routing
// Register || Method Post
router.post('/register', registerController);

// Login || POST
router.post('/login', loginController);

// Forgot Password || POST
router.post('/forgot-password', forgotPasswordController);

// test routes
router.get('/test', requireSignIn, isAdmin, testController);

// protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ success: true })
})

export default router;
