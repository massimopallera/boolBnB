import express from "express";
import authenticateJWT from "../auth/authenticateJWT.js";

import login from "../auth/login.js";
import logout from "../auth/logout.js";
import updatePassword from "../auth/updatePassword.js"


const router = express.Router();


router.post('/login', login)

router.post('/logout', logout);

router.put('/update-password', authenticateJWT, updatePassword)


export default router