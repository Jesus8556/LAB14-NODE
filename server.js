const express = require('express');
const multer = require('multer');
const app = express();

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 }
});

app.post('/upload', upload.array('files'), (req, res) => {
    if (req.files) {
        const fileInfos = req.files.map(file => ({
            originalname: file.originalname,
            size: file.size,
            mimetype: file.mimetype
        }));
        res.send(fileInfos);
    } else {
        res.status(400).send('Ningún archivo seleccionado.');
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
