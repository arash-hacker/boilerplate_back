const express = require('express');
const router = express.Router();

const Controller = require(`${config.path.controller}/sys/FileController`);
const acl = require(`${config.path.middleware}/acl`);
const { uploadImage } = require(`${config.path.middleware}/uploader`);

router.post('/', acl('upload_file'), uploadImage.single('file'), Controller.create.bind(Controller));

module.exports = router;