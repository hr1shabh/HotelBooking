import './list.css'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import {format} from "date-fns";
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch'
const List = () => {
  const location = useLocation()
  const [openDate, setOpenDate] = useState(false);
  const [destination,setDestination] = useState(location.state.destination);
  const [dates,setDates] = useState(location.state.dates);
  const [options,setOptions] = useState(location.state.options);
  const [min,setMin] = useState(undefined);
  const [max,setMax] = useState(undefined);

  const {data, loading, error, reFetch} = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 9999}`);

  const handleClick = () => {
    reFetch();
  }
  return (
    <div>
      <Navbar />
      <Header type = "list" />
      <div className='listContainer'>
        <div className='listWrapper'>
          <div className='listSearch'>
            <h1 className='lsTitle'>Search</h1>
            <div className='lsItem'>
              <label>Destination</label>
              <input type='text' placeholder={destination} />
            </div>
            <div className='lsItem'>
              <label>Date</label>
              <span onClick={() =>setOpenDate(!openDate) }>
              {`${format(dates[0].startDate, "dd/MM/yyyy")} to  ${format(dates[0].endDate, "dd/MM/yyyy")}`}
              </span>
              {openDate && <DateRange onChange={(item) => setDates([item.selection])} minDate={new Date} ranges = {dates}  />}
            </div>
            <div className='lsItem'>
              <label>Options</label>
              <div className='lsOptions'>
              <div className='lsOptionItem'>
                <span className='lsOptionText'>Min price <small> per night</small></span>
                <input className='lsOptionInput' onChange={e => setMin(e.target.value)} type='number'/>
              </div>
              <div className='lsOptionItem'>
                <span className='lsOptionText'>Max price <small> per night</small></span>
                <input className='lsOptionInput' onChange={e => setMax(e.target.value)} type='number'/>
              </div>
              <div className='lsOptionItem'>
                <span className='lsOptionText'>Adult</span>
                <input className='lsOptionInput' type='number' placeholder={options.adult} />
              </div>
              <div className='lsOptionItem'>
                <span className='lsOptionText'>Children</span>
                <input className='lsOptionInput' type='number' placeholder={options.children}/>
              </div>
              <div className='lsOptionItem'>
                <span className='lsOptionText'>Rooms</span>
                <input className='lsOptionInput' type='number' placeholder={options.room}/>
              </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className='listResult'>
          
          {loading ? "loading": <>
            {data.map(item =>(
              <SearchItem item={item} key={item._id}/>
            ))}
          </>}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default List