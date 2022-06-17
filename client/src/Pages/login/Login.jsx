import { useContext, useState } from 'react'
import {useNavigate} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import './login.css'
import axios from 'axios'

const Login = () => {
  const [Credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  })

  const {loading, error, dispatch} = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) =>{
    setCredentials((prev)=>({...prev, [e.target.id]: e.target.value}));
  }
  const handleClick = async e=>{
    e.preventDefault() //otherwise it will refresh your page
    dispatch({type:"LOGIN_START"})
    try{
        const res = await axios.post("/auth/login", Credentials)
        dispatch({type: "LOGIN_SUCCESS", payload: res.data})
        navigate("/")
    }catch(err){
        dispatch({type:"LOGIN_FAILURE", payload : err.response.data})
    }
  }
//  console.log(user);
  return (
    <div className='login'>
        <div className='lContainer'>
        <input type="text" placeholder='username' id='username' className='lInput' onChange={handleChange} />
        <input type="password" placeholder='password' id='password' className='lInput' onChange={handleChange} />
        <button disabled={loading} className='lButton' onClick={handleClick}>Login</button>
        {error && <span>{error.message}</span>}
        </div>
    </div>
  )
}

export default Login