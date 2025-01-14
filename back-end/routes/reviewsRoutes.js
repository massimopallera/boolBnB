import express from "express";
import controller from "../controllers/reviewsController.js"
const router = express.Router();

router.get('/', controller.index)
router.get('/:id', controller.show)


// add to db
router.post('/', controller.store)


export default router