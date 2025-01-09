import express from "express";
import controller from "../controllers/RoomController.js"
const router = express.Router();

router.get('/', controller.index)

// add to db
// router.post('/', controller.store)

// update element 
// router.put('/',)

// delete element
// router.delete('/',)

export default router