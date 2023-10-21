const router = require("express").Router();
const bodyParser = require("body-parser");
const Message = require("../models/message");

//add
router.post("/", bodyParser.json(), async (req,res)=>{
    const newMessage = new Message(req.body);

    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }catch(err){
        res.status(500).json(err);
    }
});

//get
router.get("/:conversationId", bodyParser.json(), async(req,res)=>{
    try{
        const message = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(message);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;