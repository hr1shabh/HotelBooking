import "./header.css";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faHotel, faPerson } from "@fortawesome/free-solid-svg-icons";
import { faTaxi } from "@fortawesome/free-solid-svg-icons";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { DateRange } from 'react-date-range';
import {useContext, useState} from 'react'
import {format} from "date-fns"; // to make js dates readable
import {useNavigate} from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
const Header = ({type}) => {
  const {user} = useContext(AuthContext);

  const [destination, setDestination] = useState("");
  const [openDates, setOpenDates] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult : 1,
    children: 0,
    room: 1,
  });

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const handleOption = (name, operation) =>{
    setOptions(prev=>{return{ // prev is the previous state of options 
      ...prev, 
      [name] : operation === 'i' ? options[name] + 1 : options[name] - 1, //it will find the name and change the value of that
    }})
  }

  const {dispatch} = useContext(SearchContext);
  const navigate = useNavigate();
  const handleSearch = () =>{
    dispatch({type: "NEW_SEARCH", payload: {destination,dates,options}})
    navigate("/hotels", {state: {destination,dates,options}});
  }


  return (
    <div className="header">
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stay</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Taxi</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faHotel} />
            <span>Attraction</span>
          </div>
        </div>

{ type !== "list" &&
  <><h1 className="headerTitle">Best Hotels in your Area!!</h1>
        <p className="headerDesc">
          Get Rewards for your travels - instant saving of 10% of more with
          prime account
        </p>

        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className="headerIcon" />
            <input
              type="text"
              placeholder="Where are you going?"
              className="headerSearchInput"
              onChange={e=>setDestination(e.target.value.toLowerCase())}
            />
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
            <span onClick={() => setOpenDates(!openDates)} className="headerSearchText">{`${format(dates[0].startDate, "dd/MM/yyyy")} to  ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
            {openDates && <DateRange
              editableDateInputs={true}
              onChange={(item) => setDates([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              className="date"
              minDate={new Date()}
            />}
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult | ${options.children} children | ${options.room} room`}</span>
            {openOptions && <div className="options">
              <div className="optionItem">
                <span className="optionText">Adult</span>
                <div className="optionCounter">
                <button disabled={options.adult <= 1} className="optionCounterButton" onClick={() => handleOption("adult", "d")} >-</button>
                <span className="optionCounterNumber">{options.adult}</span>
                <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Children</span>
                <div className="optionCounter">
                <button disabled={options.children <= 0} className="optionCounterButton" onClick={() => handleOption("children", "d")}>-</button>
                <span className="optionCounterNumber">{options.children}</span>
                <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Room</span>
                <div className="optionCounter">
                <button disabled={options.room <= 1} className="optionCounterButton" onClick={() => handleOption("room", "d")}>-</button>
                <span className="optionCounterNumber">{options.room}</span>
                <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                </div>
            </div>
            </div>}

          </div>
          <div className="headerSearchItem">
            <button className="headerBtn" onClick={handleSearch}>Search</button>
          </div>
        </div></>}
      </div>
    </div>
  );
};

export default Header;
