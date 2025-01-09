import express from "express";
const router = express.Router();

router.get('/',(req,res) => {
    res.json({result : 'success'});
})

// add to db
// router.post('/',)

// update element 
// router.put('/',)

// delete element
// router.delete('/',)

export default router