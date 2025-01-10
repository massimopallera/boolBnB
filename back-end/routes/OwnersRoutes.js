import express from "express";
import controller from "../controllers/OwnersController.js"
const router = express.Router();

//all owners
router.get('/', controller.index)

//signle owners by id
router.get('/:id', controller.show)

// add to db
router.post('/', controller.store)

// update element 
// router.put('/',)

// delete element
// router.delete('/',)

export default router