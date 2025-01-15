import express from "express";
import controller from "../controllers/ownersController.js"
const router = express.Router();

//all owners
router.get('/', controller.index)

//signle owners by id
router.get('/:id', controller.show)

// add to db
router.post('/', controller.store)


export default router