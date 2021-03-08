const express = require('express');
const router = express.Router();

const Fish = require('../models/fish');

router.get('./fish', (req, res) => {
    const data = Fish.all;
    res.send(data);
});

router.post('/fish', (req, res) => {
    const data = req.body;
    const newFish = Fish.create(data);
    res.send({message: `${newFish.name} successfully added to our collection.`});
})

module.exports = router;