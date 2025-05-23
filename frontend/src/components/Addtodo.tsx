import { useForm, type SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

type Inputs = {
    name: string;
    status: boolean;
};
type AddtodoProps = {
  addform: boolean;
  setaddform: React.Dispatch<React.SetStateAction<boolean>>;
  getlist: () => Promise<void>;
};

const Addtodo: React.FC<AddtodoProps> = ({ addform, setaddform,getlist }) => {
    const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await fetch("http://localhost:3000/api/app/addtodo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data),
            });

            const res = await response.json();

            if (response.ok) {
                toast.success(res.message || "Todo added successfully");
                setaddform(!addform)
                getlist()
            } else {
                toast.error(res.message || "Failed to add todo");
                setaddform(!addform)
            }
        } catch (error) {
            console.error("Error adding todo:", error);
            toast.error("Something went wrong");
        }
    };

    
  return (
    <>
      <form
                onSubmit={handleSubmit(onSubmit)}
                className="fixed top-24 left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,0.6)] p-8 rounded-2xl shadow-xl w-[90%] max-w-md space-y-6 text-white z-50"
            >
                <h2 className="text-2xl font-bold text-white text-center">Add Todo</h2>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Name of todo is required" })}
                        className="placeholder-white p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-white"
                        placeholder="Enter todo name"
                    />
                    {errors.name && <span className="text-red-400 text-sm">{errors.name.message}</span>}
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        {...register("status")}
                        className="h-5 w-5 accent-orange-500 rounded focus:ring-2 focus:ring-orange-400"
                        id="status"
                    />
                    
                    <label htmlFor="status" className="text-white font-medium select-none">
                        Completed
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                >
                    Add Todo
                </button>
            </form>
            <Toaster position='top-center' reverseOrder={false} />  
    </>
  )
}

export default Addtodo
