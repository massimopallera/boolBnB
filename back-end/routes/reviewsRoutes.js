import express from "express";
import controller from "../controllers/reviewsController.js"
const router = express.Router();

router.get('/', controller.index)

// add to db
router.post('/', controller.store)

// update element 
// router.put('/',) //might be deleted

// delete element
// router.delete('/',) //might be deleted

export default router