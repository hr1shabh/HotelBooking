import express from "express"
import { countByCity, countByType, createHotel, deleteHotel, getAllHotel, getHotel, getHotelRoom, updateHotel } from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//Create
router.post("/",verifyAdmin , createHotel);

//update
router.put("/:id", verifyAdmin, updateHotel)
//delete
router.delete("/:id",verifyAdmin, deleteHotel)

//get
router.get("/find/:id", getHotel)
//get all
router.get("/", getAllHotel)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRoom)
export default router