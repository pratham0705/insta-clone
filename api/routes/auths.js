const router = require("express").Router();
const Product = require("../models/product");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");


//Register
router.post("/register", bodyParser.json(), async (req, res) => {

    try{
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newProduct = new Product({
            username : req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // save user and respond
        const product = await newProduct.save();
        res.status(200).json(product);
      } catch (err) {
        res.status(500).json(err);
      }
    });

//Login
router.post("/login", bodyParser.json(), async (req,res)=>{
    try{
    const product = await Product.findOne({email:req.body.email});
    !product && res.status(431).send("user not found");

    const validPassword = await bcrypt.compare(req.body.password, product.password)
    !validPassword && res.status(400).json("wrong password")

    res.status(200).json(product)
    } catch(err){
        res.status(500).json("sorry");
    }
});
    
module.exports = router;