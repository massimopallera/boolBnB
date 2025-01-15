import express from "express";
import controller from "../controllers/apartmentsController.js"
const router = express.Router();

router.get('/', controller.index)

//show element with specific index
router.get('/owner-apartments', controller.show)

//add new element
router.post('/', controller.store)

// update element 
router.put('/:id', controller.update)


export default router