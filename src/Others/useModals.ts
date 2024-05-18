import { create } from "zustand";

interface ModalTypes{
    isOpen_newRes:boolean;
    setIsOpen_newRes:(val:boolean)=>void;
    isOpen_newEvent:boolean;
    setIsOpen_newEvent:(val:boolean)=>void;
}

const useModals=create<ModalTypes>((set)=>({
    isOpen_newRes:false,
    setIsOpen_newRes:(val)=>set({isOpen_newRes:val}),
    isOpen_newEvent:false,
    setIsOpen_newEvent:(val)=>set({isOpen_newEvent:val}),
}))
export default useModals