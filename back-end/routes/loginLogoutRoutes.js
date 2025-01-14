import express from "express";
import authenticateJWT from "../auth/authenticateJWT.js";
import controller from "../controllers/loginLogoutController.js"

const router = express.Router();


router.post('/login', controller.login)

router.post('/logout', controller.logout);

router.put('/update-password', authenticateJWT, controller.update)


export default router