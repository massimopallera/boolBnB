import express from "express";
const router = express.Router();

router.get('/',(req,res) => {
    res.json({result : 'success'});
})


export default router