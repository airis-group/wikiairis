import { useEffect, useState } from "react"
import Assignment from "./airis/Assignment"
import Users from "./airis/Users"

const Airis = () => {
  const [mod, setMod] = useState('user')

  return (
    <div className='flex flex-col mt-4'>
        
        <div className="flex items-center justify-end gap-4 cursor-pointer">
            <buttton onClick={()=>setMod('user')} className={`${mod === 'user' ? `bg-emerald-400` : `bg-red-400`} px-4 py-1 rounded-lg text-xs font-bold text-white`}>Users</buttton>
            <buttton onClick={()=>setMod('assign')} className={`${mod === 'assign' ? `bg-emerald-400` : `bg-red-400`} px-4 py-1 rounded-lg text-xs font-bold text-white`}>Assignment</buttton>
        </div>
        
        <div>
          {mod === 'user' ?  <Users /> : null}
          {mod === 'assign' ? <Assignment />: null}
            
            
        </div>
    </div>
  )
}

export default Airis