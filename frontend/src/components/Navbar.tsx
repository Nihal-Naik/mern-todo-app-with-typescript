import Login from "./Login";
import Signup from "./Signup";
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { Changesignup } from "../features/signupSlice";
import { Changelogin } from "../features/loginSlice";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


const Navbar = () => {
  const togglesignup = useSelector((state: RootState) => state.signup.value)
  const togglelogin = useSelector((state: RootState) => state.login.value)
  const dispatch = useDispatch()
  const navigate=useNavigate()

   const handlesignup=()=>{
    {togglelogin ? dispatch(Changelogin()): dispatch(Changesignup())}
  }

  const handlelogin=()=>{
    {togglesignup ? dispatch(Changesignup()): dispatch(Changelogin())}
  }

  const handlelogout=async () => {
    try {
      const respone=await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,{
        method:"POST",
        credentials:"include",
      })
      const res=await respone.json()
      if(!respone.ok){
        return toast.error(res.message)
      }
      toast.success(res.message)
      navigate('/')
    } catch (error) {
      console.log("Error in handlelogout function",error);
    }
  }
  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-16 px-6 flex justify-between items-center shadow-md z-50">
        <NavLink to='/' className="text-orange-500 text-2xl font-extrabold tracking-wide">ToDo</NavLink>
        <div className="flex gap-6">
          <p onClick={handlesignup} className="text-orange-400 text-lg font-semibold cursor-pointer hover:text-orange-600 transition duration-200">
            Signup
          </p>
          <p onClick={handlelogin} className="text-orange-400 text-lg font-semibold cursor-pointer hover:text-orange-600 transition duration-200">
            Login
          </p>
          <p onClick={handlelogout} className="text-orange-400 text-lg font-semibold cursor-pointer hover:text-orange-600 transition duration-200">
            Logout
          </p>
        </div>
      </nav>
      {togglesignup && <Signup />}
      {togglelogin && <Login />}
      <Toaster position='top-center' reverseOrder={false} />  
    </>
  )
}

export default Navbar
