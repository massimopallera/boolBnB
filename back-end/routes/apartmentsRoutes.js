import express from "express";
import controller from "../controllers/apartmentsController.js"
const router = express.Router();

router.get('/', controller.index)


router.post('/', controller.store)

// update element 
router.put('/', controller.update)

// delete element
// router.delete('/',)

export default router