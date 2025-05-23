import todos from "../models/todos";
import { Itodo } from "../types/tododata";
import { Request,Response } from "express";

export const displaytodo=async(req:Request,res:Response):Promise<void>=>{
    const useremail=req.user.email
    try {
        const todolist=await todos.find({useremail})
        if(!todolist){
            res.status(400).json({message:"error in fetching list"})
            return
        }
        res.status(200).json({message:"List successfully retrieved",todolist:todolist})
    } catch (error) {
        console.log("error in displaytodo controller",error);
        res.status(500).json({message:"Internal server error"})
    }
}

export const addtodo=async(req:Request,res:Response):Promise<void>=>{
    const useremail=req.user.email
    try {
        const {name,status} = req.body as Pick<Itodo, 'name' | 'status'>
        const newtodo: Itodo = new todos({
            name, useremail,status
        })

        await newtodo.save()
        res.status(201).json({ message: 'todo added successfully' })
    } catch (error) {
        console.log("error in addtodo controller",error);
        res.status(500).json({message:"Internal server error"})
    }
}
export const deletetodo=async(req:Request,res:Response):Promise<void>=>{
    const {id}=req.body
    try {
        const finditem=await todos.findOne({_id:id})
        if(!finditem) { res.status(400).json({message:"item not found"}); return}
        
        const deleteitem=await todos.findByIdAndDelete(id)
        if(!deleteitem) {res.status(400).json({message:"Item not deleted"}); return}
        
        res.status(200).json({message:"Item deleted successfully"})
    } catch (error) {
        console.log("error in deletetodo controller",error);
        res.status(500).json({message:"Internal server error"})
    }
}

export const updatestatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body; // status: boolean

  try {
    const updated = await todos.findByIdAndUpdate(id, { status }, { new: true });

    if (!updated) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json({ message: "Status updated", todo: updated });
  } catch (error) {
    console.log("Error in updatestatus controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
