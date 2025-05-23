import { useForm, type SubmitHandler } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { Changelogin } from "../features/loginSlice";
import { Changesignup } from "../features/signupSlice";
import { useDispatch } from "react-redux";

type Inputs = {
    name: string;
    email: string;
    password: string;
};

const Signup = () => {
    const dispatch=useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitting },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        try {
          const response=await fetch("http://localhost:3000/api/auth/signup",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(data)
          })
          const res=await response.json()
          if(!response.ok){
            return toast.error(res.message)
          }
          toast.success("Signup successfull")
          dispatch(Changelogin())
          dispatch(Changesignup())
        } catch (error) {
          console.log("Error in onsubmit function",error);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="fixed top-24 left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,0.6)] p-8 rounded-2xl shadow-xl w-[90%] max-w-md space-y-6 text-white z-50"
            >
                <h2 className="text-2xl font-bold text-white text-center">Sign Up</h2>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">Name</label>
                    <input
                        {...register("name", { required: "Name is required" })}
                        className="placeholder-white p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-white"
                        placeholder="Enter your name"
                    />
                    {errors.name && <span className="text-red-400 text-sm">{errors.name.message}</span>}
                </div>

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

                <button disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                >
                    Register
                </button>
            </form>
            <Toaster position='top-center' reverseOrder={false} />            
        </>
    );
};

export default Signup;
