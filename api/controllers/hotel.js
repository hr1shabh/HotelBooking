import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err)
  }
};

export const updateHotel = async (req, res, next) => {
    try{
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updateHotel)
    }catch(err){
        next(err)
    }
  };

  export const deleteHotel = async (req, res, next) => {
    try{
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    }catch(err){
        next(err)
    }
  };

  export const getHotel = async (req, res, next) => {
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel)
    }catch(err){
        next(err)
    }
  };

  export const getAllHotel = async (req, res, next) => {
    const {min, max, ...others} = req.query;
    try{
        const hotels = await Hotel.find({
          ...others,
          cheapestPrice: {$gte: min || 1, $lte: max || 9999}
        }).limit(req.query.limit);
        res.status(200).json(hotels)
    }catch(err){
        next(err)
    }
  };

  export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",") // it will fetch the city names as string and divide them through , to make an array 
    try{
        const list = await Promise.all(cities.map(city=>{
          return Hotel.countDocuments({city: city})
        }))
        res.status(200).json(list)
    }catch(err){
        next(err)
    }
  };

  export const countByType = async (req, res, next) => {
    try{
      const hotelCount = await Hotel.countDocuments({type:"hotel"})
      const apartmentCount = await Hotel.countDocuments({type:"apartment"})
      const resortCount = await Hotel.countDocuments({type:"resort"})
      const villaCount = await Hotel.countDocuments({type:"villa"})  

      res.status(200).json([
        {type :"hotel", count: hotelCount},
        {type :"apartment", count: apartmentCount},
        {type :"resort", count: resortCount},
        {type :"villa", count: villaCount},

      ])

    }catch(err){
        next(err)
    }
  };


export const getHotelRoom = async (req,res,next) => {
  try{
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    )
    res.status(200).json(list)

  }catch(err){
    next(err)
  }
}
  