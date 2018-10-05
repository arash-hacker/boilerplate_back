const multer = require('multer');
const mkdirp = require('mkdirp');
const uniqueFilename = require('unique-filename');

function get_dir(file) {
    return `./public/uploads/${file.mimetype.replace('/', '_')}`;
}

const ImageStorage = multer.diskStorage({
    destination : (req , file , cb) => {
        let dir = get_dir(file);

        mkdirp(dir , err => cb(err , dir))
    },

    filename: (req , file , cb) => {
        cb(null, uniqueFilename(get_dir(file)).split('/').pop() + '.' + file.originalname.split('.').pop())
    }
});

const imageFilter = (req , file , cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        cb(null , true)
    } else {
        cb(null , false)
    }
}

const uploadImage = multer({
    storage : ImageStorage,
    limits : {
        fileSize : 1024 * 1024 * 100
    },
    fileFilter : imageFilter
})


module.exports = {
    uploadImage
}