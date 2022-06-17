import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons"
import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import MailList from "../../components/mailList/MailList"
import Footer from "../../components/footer/Footer"
import "./hotel.css"
import { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import { SearchContext } from "../../context/SearchContext"
import { AuthContext } from "../../context/AuthContext"
import Reserve from "../../components/reserve/Reserve"

const Hotel = () => {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate()
  const [slideNumber, setSlideNumber] = useState(0); 
  const [open,setOpen] = useState(false);
  const [openModal,setOpenModal] = useState(false);

  const location = useLocation()
  // console.log(location.pathname);
  const id = location.pathname.split("/")[2];

  const {data, loading, error} = useFetch(`/hotels/find/${id}`);
  const {dates, options} = useContext(SearchContext);
  
  const MILLISECONDS_PER_DAY = 1000*60*60*24;
  function dayDifference(date1,date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  const handleOpen = (i) =>{
    setSlideNumber(i);
    setOpen(true)
  }
  const handleMove = (d) =>{
    let newSlideNumber;
    if(d === "l"){
      newSlideNumber = slideNumber === 0? 5: slideNumber-1;
    }
    else{
      newSlideNumber = slideNumber === 5? 0: slideNumber+1;
    }
    setSlideNumber(newSlideNumber)
  }
  
  const handleClick = () =>{
    if(user){
      setOpenModal(true)
    }else{
      navigate("/login")
    }
  }

  return (
    <div>
      <Navbar/>
      <Header type="list"/>
     {loading ? "loading" : <div className="hotelContainer">
      {open && <div className="slider">
        <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)} />
        <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=>handleMove("l")}/>
        <div className="sliderWrapper">
          <img src={data.photos[slideNumber]} className="sliderImg"></img>
        </div>
        <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>handleMove("r")} />
      </div>}
      <div className="hotelWrapper">
      <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>
        <h1 className="hotelTitle">{data.name}</h1>
        <div className="hotelAddress">
          <FontAwesomeIcon icon={faLocationDot}/>
          <span>{data.address}</span>
        </div>
        <span className="hotelDistance">
          Excellent location {data.distance} km from airport
        </span>
        <span className="hotelPriceHighlight">
          Book a stay over Rs. {data.cheapestPrice} at this property and get a free airport taxi
        </span>
        <div className="hotelImages">
          {data.photos?.map((photo,i)=>(
            <div className="hotelImgWrapper">
            <img src={photo} className="hotelImg" onClick={()=>handleOpen(i)}/>
            </div>
          ))}
        </div>
        <div className="hotelDetails">
          <div className="hotelDetailsTexts">
            <p className="hotelDesc">{data.desc}</p>
          </div>
          <div className="hotelDetailsPrice">
          <h1>Perfect for a {days}-night stay</h1>
          <span>
            Located in real heart of Mumbai, this property is excellent
          </span>
          <h2>
            <b>Rs.{days * data.cheapestPrice * options.room}</b> ({days} nights)
          </h2>
          <button onClick={handleClick}>Reserve or Book Now!</button>
          </div>
        </div>
      </div>
      <MailList/>
      <Footer/>
      </div>}
      {openModal && <Reserve setOpenModal={setOpenModal} hotelId = {id} /> }
    </div>
  )
}

export default Hotel