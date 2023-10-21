const router = require("express").Router();
const bodyParser = require("body-parser");
const Conversation = require("../models/conversation");
const conversation = require("../models/conversation");

//new conv
router.post("/", bodyParser.json(), async(req,res)=>{
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.recieverId]
    });

    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }catch(err){
        res.status(500).json(err);
    }
})

//get conv of a user
router.get("/:userId", bodyParser.json(), async(req,res)=>{
    try{
        const conversation = await Conversation.find({
            members: {$in:[req.params.userId]},
        });
        res.status(200).json(conversation);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;