import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNote = create(persist(
    (set)=>({
        notes:[],
        setNotes:(payload)=>set((state)=>(
            {
                notes : [...state.notes, payload]
            })),
        deleteNotes : (id)=>set((state)=>({
            notes: state.notes.filter(item => item.id !== id)
        })),
        updateNotes : (id, payload)=>set((state)=>({
            notes : state.notes.map((item)=>{
                if(item.id === id){
                    return {
                        ...item,
                        ...payload
                    }
                }else{
                    return item
                }
            })

        }))
    }),
    {name:'notebook'}
))