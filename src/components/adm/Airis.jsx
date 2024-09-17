import Assignment from "./airis/Assignment"
import Users from "./airis/Users"
const Airis = () => {
  
  return (
    <div className='flex flex-col mt-4'>
        
        <div className="flex items-center justify-end gap-4">
            <buttton className="bg-red-400 px-4 py-1 rounded-lg text-xs text-white">Users</buttton>
            <buttton className="bg-red-400 px-4 py-1 rounded-lg text-xs text-white">Assignment</buttton>
        </div>
        
        <div>
            {/* <Users /> */}
            <Assignment />
        </div>
    </div>
  )
}

export default Airis