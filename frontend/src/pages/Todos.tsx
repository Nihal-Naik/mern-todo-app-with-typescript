import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import Addtodo from "../components/Addtodo";
import { ReactLenis, useLenis } from 'lenis/react'



const Todos = () => {
    const [addform, setaddform] = useState(false)
    useEffect(() => {
        getlist()

    }, [])
    const [todo_list, settodo_list] = useState([])//for displaying job list

    const getlist = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/app/todos`, {
                method: "GET",
                credentials: "include",
            })
            const list = await response.json()
            if (response.ok) {
                settodo_list(list.todolist)
            }
        } catch (error) {
            console.log("Error occured in getlist function", error);
        }
    }

    const handleStatusChange = async (id: string, newStatus: boolean) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/app/todos/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ status: newStatus })
            });

            const data = await response.json();

            if (response.ok) {
                getlist()
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handledelete = async (id: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/app/deletetodo`, {
                method: "DELETE",
                headers: { "content-type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ id }),
            })
            const res = await response.json()
            if (!response.ok) {
                return toast.error(res.message)
            }
            getlist()
            toast.success(res.message)
        } catch (error) {
            console.log("Error occured in handledelete", error);
        }
    }

    useLenis((lenis) => {
        // called every scroll
        console.log(lenis)
    })

    return (
        <>
            <ReactLenis root />
            <Navbar />
            {addform && <Addtodo addform={addform} setaddform={setaddform} getlist={getlist} />}

            <section className="w-full px-4 pt-20 pb-10 flex flex-col items-center">
                <h1 className="text-orange-600 text-4xl font-extrabold mb-6">Your Tasks</h1>

                <div className="w-full max-w-2xl space-y-4">
                    {todo_list.length > 0 ? (
                        todo_list.map((todo: { _id: string; name: string; status: boolean }) => (
                            <div
                                key={todo._id}
                                className="flex justify-between items-center bg-white/5 backdrop-blur-md p-4 rounded-xl shadow-md transition duration-300 hover:shadow-lg hover:bg-white/10"
                            >
                                <p className="text-white font-medium">{todo.name}</p>

                                <div className="flex items-center gap-4">
                                    <input
                                        type="checkbox"
                                        checked={todo.status}
                                        onChange={() => handleStatusChange(todo._id, !todo.status)}
                                        className="h-5 w-5 accent-orange-500 rounded focus:ring-2 focus:ring-orange-400"
                                    />
                                    <MdDelete
                                        onClick={() => handledelete(todo._id)}
                                        className="text-white hover:text-red-500 cursor-pointer text-xl transition-transform duration-200 hover:scale-110"
                                    />
                                </div>
                            </div>

                        ))
                    ) : (
                        <p className="text-white text-center">No tasks found.</p>
                    )}

                </div>
                <button onClick={() => { setaddform(!addform) }} className="cursor-pointer mt-8 px-6 py-3 bg-orange-600 text-white font-semibold rounded-2xl shadow-md hover:bg-orange-700 transition duration-300 transform hover:scale-105">ADD ToDos</button>
            </section>
            <Toaster position='top-center' reverseOrder={false} />
        </>
    );
};

export default Todos;
