const express = require('express');
const fish = require('../data');
const router = express.Router();

const Fish = require('../models/fish');

router.get('/', (req, res) => {
    const data = Fish.all;
    res.send(data);
});

router.get('/:id', (req, res) => {
    try {
        const fishId = parseInt(req.params.id);
        let selectFish = Fish.findById(fishId);
        if (req.query) {
            let fishInfo = selectFish.findInfo(req.query);
            res.send(fishInfo);
        } else {
            res.send(selectFish);
        }
    } catch(err) {
        console.log(err);
        res.status(404).send(err);
    }
})

router.get('/:id?', (req, res) => {
    try {
        const fishId = parseInt(req.params.id);
        let selectFish = Fish.findById(fishId);
        let fishInfo = selectFish.findInfo(req.query);
        res.send(fishInfo);
    } catch(err) {
        console.log(err);
        res.status(404).send(err);
    }
})

router.post('/', (req, res) => {
    const data = req.body;
    const newFish = Fish.create(data);
    res.send({message: `${newFish.name} successfully added to our collection.`});
})

router.delete('/:id', (req, res) => {
    const fishId = parseInt(req.params.id);
    const fishToDestroy = Fish.findById(fishId);
    fishToDestroy.destroy();
    res.status(204).send();
})

router.patch('/:id', (req, res) => {
    try {
        const fishId = parseInt(req.params.id);
        const fishToUpdate = Fish.findById(fishId);
        const fishUpdataData = req.query;
        fishToUpdate.update(fishUpdataData);
        console.log(fishToUpdate);
        res.send({message: `${fishToUpdate.name} successfully updated.`});
    } catch(err) {
        console.log(err);
        res.status(404).send(err)
    }
})

module.exports = router;