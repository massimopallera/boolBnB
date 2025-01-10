import express from "express";
import controller from "../controllers/loginController.js"
const router = express.Router();


router.get('/:id', controller.show)

router.get('/:id', controller.update)



export default router