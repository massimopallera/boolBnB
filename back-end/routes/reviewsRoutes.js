import express from "express";
import controller from "../controllers/reviewsController.js"
const router = express.Router();

router.get('/', controller.index)

// add to db
router.post('/', controller.store)


export default router