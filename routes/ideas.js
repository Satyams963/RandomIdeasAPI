const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');
const e = require('express');


// read all ideas

router.get('/', async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.json({ sucess: true, data: ideas})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong'})
    }
});

// get a single Idea

router.get('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        res.json({ sucess: true, data: idea})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong'})
    }
});

// add an Idea:
router.post('/', async (req, res) => {
    const idea = new Idea ({
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
    });

    try {
        const savedIdea = await idea.save();
        res.json({ success: true, data: savedIdea });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong'})
    }
    
});

// update Idea:

router.put('/:id', async(req, res) => {
    try {
        const updatedIdea = await Idea.findByIdAndUpdate(
            req.params.id, {
                            $set: {
                                text: req.body.text,
                                tag: req.body.tag
                                }
                            }, 
                            {
                                new: true
                            }
        );
        res.json({success: true, data: updatedIdea})

    } catch (error) {
        res.status(500).json({ success: false, error: 'Something went wrong'})
    }

});

// Delete Idea:

router.delete('/:id',async(req, res) => {
    try {
        await Idea.findByIdAndDelete(req.params.id);
        res.json({ sucess: true, data: {} })
    } catch (error) {
        res.status(500).json({ success: false, error: 'Something went wrong'})
    }

});

module.exports = router;