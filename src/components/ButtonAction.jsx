import React from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiOutlinePencil } from "react-icons/hi2";
import { MdCropFree, MdDelete } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa6";

export const ButtonAction = () => {
  return (
    <div className='w-full flex items-center justify-center gap-2'>
        <button>sdfa </button>
    </div>
  )
}

export const ButtonAdd = ({onClick}) => {
  return(
    <button
    onClick={onClick}
    className='bg-emerald-400 gap-2 text-xs font-bold text-white w-8 h-8 flex rounded-full flex-row items-center justify-center  shadow-xl'
    >
      <IoMdAddCircleOutline size="20" />
      {/* <span >Add</span> */}
    
    </button>
  )
}
export const ButtonEdit = ({onClick}) => {
  return(
    <button
    onClick={onClick}
    className='bg-orange-400 hover:bg-purple-600 duration-300 gap-2 text-xs font-bold text-white w-6 h-6 flex rounded-full flex-row items-center justify-center  shadow-xl'
    >
      <MdCropFree size="16" />
      {/* <span >Add</span> */}
    
    </button>
  )
}
export const ButtonHapus = ({onClick}) => {
  return(
    <button
    onClick={onClick}
    className='bg-red-400 hover:bg-purple-600 duration-300 gap-2 text-xs font-bold text-white w-6 h-6 p-1 flex rounded-full flex-row items-center justify-center  shadow-xl'
    >
      <MdDelete size="20" />
      {/* <span >Add</span> */}
    
    </button>
  )
}
export const ButtonKanan = ({onClick}) => {
  return(
    <button
    onClick={onClick}
    className='bg-sky-500 hover:bg-emerald-500 group duration-300 gap-2 text-xs font-bold text-white px-2 py-2 flex rounded-lg flex-row items-center justify-center  shadow-xl'
    >
      <FaChevronRight size="10"
      className='rotate-90 group-hover:rotate-0 duration-300'
      />
      {/* <span >Add</span> */}
    
    </button>
  )
}
