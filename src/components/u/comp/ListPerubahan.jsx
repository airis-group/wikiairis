import React from 'react'

const ListPerubahan = ({lisper}) => {
  return (
    <div className='w-full flex flex-col mt-3'>
        <h1 className='text-md font-bold'>List Perubahan {lisper.length}</h1>

        <ul className='max-h-[300px] overflow-x-auto'>
            {lisper && lisper.map((r, i) => (
                <li key={i} className='bg-slate-100 mb-2 text-xs p-2 flex flex-col'>
                    {i+1}. {r.word}/{r.old} <br />
                    <span className='bg-orange-300 px-2 py-1'> New Tag {r.new}</span>
                </li>

            ))}
        </ul>
    </div>
  )
}

export default ListPerubahan