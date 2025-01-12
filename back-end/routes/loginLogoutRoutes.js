import express from "express";
import controller from "../controllers/loginLogoutController.js"
const router = express.Router();


router.post('/login', controller.login)
router.post('/logout', controller.logout);

router.put('/changePassword/:id', controller.update)



export default router