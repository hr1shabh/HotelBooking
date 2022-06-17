import { Link } from 'react-router-dom'
import './searchItem.css'

const SearchItem = ({item}) => {
  return (
    <div className='searchItem'>
        <img src={item.photos[0]} className='siImg'></img>
        <div className='siDesc'>
            <h1 className='siTitle'>{item.name}</h1>
            <span className='siDistance'>{item.distance}m from center</span>
            <span className='siTaxiOp'>Free airport Taxi</span>
            <span className='siSubtitle'>
                Studio Apartment with AC
            </span>
            <span className='siFeatures'>
                {item.desc}
            </span>
            <span className='siCancelOp'> Free Cancellation </span>
            <span className='siCancelSubtitle'>
                You can cancel later, so lock in this great price today!
            </span>
        </div>
        <div className='siDetails'>
            {item.rating && <div className='siRating'>
                <span>Excellent</span>
                <button>{item.rating}</button>
            </div>}
            <div className='siDetailTexts'>
                <span className='siPrice'>Rs.{item.cheapestPrice}</span>
                <span className='siTaxOp'>Includes taxes and fees</span>
                <Link to={`/hotels/${item._id}`}>
                <button className='siCheckButton'>see availability</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default SearchItem