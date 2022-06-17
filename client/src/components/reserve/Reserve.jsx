import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useContext, useState } from "react"
import { SearchContext } from "../../context/SearchContext"
import useFetch from "../../hooks/useFetch"
import {useNavigate} from "react-router-dom"
import "./reserve.css"

const Reserve = ({setOpenModal, hotelId}) => {
    const [selectRooms, setSelectRooms] = useState([])
    const {data, loading, error} = useFetch(`/hotels/room/${hotelId}`)
    const {dates} = useContext(SearchContext);
    const handleSelect = (e) =>{
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectRooms(
            checked ? [...selectRooms, value] : selectRooms.filter((item) => item !== value)
        )
    }

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)

        const date = new Date(start.getTime());
        const dates = [];
        while(date <= end){
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate()+1);
        }
        return dates;
    }
    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) =>{
        const isFound = roomNumber.unavailableDates.some((date)=>
        allDates.includes(new Date(date).getTime())
        )
        return !isFound
    }

    const navigate = useNavigate();
    const handleClick = async () => {
        try{
            await Promise.all(
                selectRooms.map(roomId =>{
                    const res = axios.put(`/rooms/availability/${roomId}`,{
                        dates: allDates,
                    });
                    return res.data

                }
            ))
            setOpenModal(false)
            navigate("/")
        }catch(err){
         console.log(err);
        }
    }

  return (
    <div className="reserve">
    <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpenModal(false)} />
        <span>Select Your Room</span>
        {data.map(item=>(
            <div className="rItem">
                <div className="rInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">Max People : {item.maxPeople}</div>
                <div className="rPrice">Price: Rs{item.price}</div>
                </div>
                    <div className="rSelectRooms">
                    {item.roomNumbers.map(roomNumber=>(
                        <div className="room">
                        <label>{roomNumber.number}</label>
                        <input type='checkbox' disabled={!isAvailable(roomNumber)} value={roomNumber._id} onChange={handleSelect} />
                        </div>
                    ))}
                    </div>
            </div>
        ))}
        <button className="rButton" onClick={handleClick}> Reserve Now</button>
    </div>
    </div>
  )
}

export default Reserve