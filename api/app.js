require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const product_routes = require("./routes/product");
const auth_routes = require("./routes/auths");
const post_routes = require("./routes/post");
const conversation_routes = require("./routes/conservations");
const message_routes = require("./routes/messages");
const multer = require("multer");
const path = require("path");

const PORT = process.env.PORT || 8800;

app.use("/api/product", product_routes);
app.use("/api/auths", auth_routes);
app.use("/api/post", post_routes);
app.use("/api/conversation", conversation_routes);
app.use("/api/message", message_routes);

app.use("/images", express.static(path.join(__dirname, "public/images")));

//midleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, `${req.body.name}`);
    },
  });

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT,()=>{
            console.log(`${PORT} Yes I am connected`);
        })
    } catch(error){
        console.log(error);
    }
};

start();

//sudo lsof -i:3000