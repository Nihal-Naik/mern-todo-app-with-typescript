import { useForm, type SubmitHandler } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { Changelogin } from "../features/loginSlice";
import { Changesignup } from "../features/signupSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type Inputs = {
    email: string;
    password: string;
};

const Login = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        try {
            const response=await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,{
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify(data),
                credentials:"include",
            })
            const res=await response.json()
            if(response.ok){
                toast.success("Login successfull")
                navigate('/todos')
                dispatch(Changelogin())
            }else{
                toast.error(res.message)
            }
        } catch (error) {
            console.log("Error in onsubmit function",error);
        }   
    };
    const displaylogin=()=>{
        dispatch(Changelogin())
        dispatch(Changesignup())
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="fixed top-24 left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,0.6)] p-8 rounded-2xl shadow-xl w-[90%] max-w-md space-y-6 text-white z-50"
            >
                <h2 className="text-2xl font-bold text-white text-center">Login</h2>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">Email</label>
                    <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        className="placeholder-white p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-white"
                        placeholder="Enter your email"
                    />
                    {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">Password</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long",
                            },
                        })}
                        className="placeholder-white text-white p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter your password"
                    />
                    {errors.password && <span className="text-red-400 text-sm">{errors.password.message}</span>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                >
                    Login
                </button>
                <p className='text-white text-sm font-medium'>Don't have an account? <span onClick={displaylogin} className='cursor-pointer text-orange-400 text-sm font-medium'>Signup</span></p>
            </form>
            <Toaster position='top-center' reverseOrder={false} />  
        </>

    );
};

export default Login;
