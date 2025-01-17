import express from "express";
import controller from "../controllers/apartmentsController.js"
import multer from 'multer';
import fs from 'fs';

// import storage from "../fileUpload/controller.js";

const dir = './uploads';

// import multer from 'multer'


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});


// Crea la cartella 'uploads' se non esiste
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}


const upload = multer({ storage });

const router = express.Router();


router.get('/', controller.index)

//show element with specific index
router.get('/owner-apartments', controller.showOwnerApartments)

router.get('/services', controller.serviceIndex)

router.get('/:id', controller.show)

//add new element
router.post('/', controller.store)
router.post('/image', upload.single("file"), (req,res) => {
    console.log(req);
    
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded." });
    }
    res.status(200).json({ success: true, message: "File uploaded successfully." });
})

// update element 
router.put('/:id', controller.update)


export default router