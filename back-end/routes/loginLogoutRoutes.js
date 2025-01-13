import express from "express";
import authenticateJWT from "../auth/authentication.js";
import controller from "../controllers/loginLogoutController.js"
const router = express.Router();


router.post('/login', controller.login)

router.post('/logout', controller.logout);

//TO FIX

// to change password
router.put('/changePassword/:id', authenticateJWT ,controller.update)


export default router