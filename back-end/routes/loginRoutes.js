import express from "express";
import controller from "../controllers/loginController.js"
const router = express.Router();


router.get('/', controller.show)

router.put('/:id', controller.update)



export default router