import Navbar from '../components/Navbar';
import Hero_section from '../components/Hero_section';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Changelogin } from '../features/loginSlice';




const App = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
   const handleauth=async () => {
    try {
      const response=await fetch("http://localhost:3000/api/auth/checkauth",{
        method:"GET",
        credentials:"include",
      })
      
      if(!response.ok){
        dispatch(Changelogin())
        return
      }
      navigate('/todos')
    } catch (error) {
      console.log("Error in handleauth function",error);
    }
  }

  

  return (
    <>
      
      <Navbar />
      <Hero_section handleauth={handleauth} />
      
      
 
    </>
  )
}

export default App
