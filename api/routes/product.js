const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

//update user
router.put("/:id", bodyParser.json(), async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
            try{
                const product = await Product.findByIdAndUpdate(req.params.id,{$set: req.body,});
                res.status(200).json("Account has been updated");
            }catch(err){
                return res.status(500).json(err);
            }
    } else{
        return res.status(500).json("You can update only your account");
    }
})

//delete user
router.delete("/:id", bodyParser.json(), async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });

//get a user
router.get("/", bodyParser.json(), async (req,res)=>{
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const product = userId
        ? await Product.findById(userId)
        : await Product.findOne({username:username});
        const { password, updatedAt, ...other } = product._doc;
        res.status(200).json(other);
    }catch(err){
        res.status(500).json("sorry");
    }
});

//get friends
router.get("/friends/:userId", bodyParser.json(), async (req,res)=>{
    try{
        const product = await Product.findById(req.params.userId);
        const friends = await Promise.all(
            product.followings.map(friendId=>{
                return Product.findById(friendId)
            })
        )
        let friendList = [];
        friends.map(friend=>{
            const{_id , username , profilePicture} = friend;
            friendList.push({_id , username , profilePicture})
        });
        res.status(200).json(friendList);
    }catch(err){
        res.status(500).json(err);
    }
})

//follow a user
router.put("/:id/follow", bodyParser.json(), async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const product = await Product.findById(req.params.id);
            const currentProduct = await Product.findById(req.body.userId);
            if(!product.followers.includes(req.body.userId)){
                await product.updateOne({$push:{followers:req.body.userId}});
                await currentProduct.updateOne({$push:{followings:req.params.id}});
                res.status(200).json("User has been followed")
            }else{
                res.status(404).json("You already follow this user");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cant follow yourself!");
    }
})

//unfollow a user
router.put("/:id/unfollow", bodyParser.json(), async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const product = await Product.findById(req.params.id);
            const currentProduct = await Product.findById(req.body.userId);
            if(product.followers.includes(req.body.userId)){
                await product.updateOne({$pull:{followers:req.body.userId}});
                await currentProduct.updateOne({$pull:{followings:req.params.id}});
                res.status(200).json("User has been unfollowed")
            }else{
                res.status(404).json("You are not following this user");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cant unfollow yourself!");
    }
})

//get all users
router.get("/all", bodyParser.json(), async (req,res)=>{
    try{
        const product = await Product.find({});
        res.status(200).json(product);
    }catch(err){
        res.status(500).json("sorry");
    }
});

module.exports = router;