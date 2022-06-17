import express from "express"
import { updateUser, deleteUser, getUser, getAllUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();


// router.get("/checkauthentication", verifyToken, (req,res,next) =>{
//     res.send("Hello user, you are logged in");

// })

// router.get("/checkUser/:id", verifyUser, (req,res,next) =>{
//     res.send("Hello user, you can delete your id");
// })

// router.get("/checkAdmin/:id", verifyAdmin, (req,res,next) =>{
//     res.send("Hello Admin, you can delete any account");
// })

//update
router.put("/:id", verifyUser,updateUser)
//delete
router.delete("/:id",verifyUser, deleteUser)

//get
router.get("/:id",verifyUser, getUser)
//get all
router.get("/",verifyAdmin, getAllUser)


export default router