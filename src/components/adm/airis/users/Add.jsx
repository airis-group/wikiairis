import {useEffect, useState} from 'react'
import { apiCred } from '../../../../libs/connection'

const Add = ({dtp}) => {
    const [input, setInput] = useState({
        id : "",
        name : "",
        email : "",
        role : ""
    })
    const [err, setErr] = useState('')
    useEffect(() => {
        setInput({
            id : dtp.id || '',
            name : dtp.name || '',
            email : dtp.email || '',
            role : dtp.role || ''
        })
    },[dtp])
    const handleChange = (e) => {
        e.preventDefault()
        setInput({...input, [e.target.name] : e.target.value})
    }
    let role = [
        {
            role : 'admin'
        },
        {
            role : 'user'
        },
        {
            role : 'validator'
        },
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErr('')
        await apiCred.post('/adm/usr/store', input)
        .then((res) => {
            if(res.data.status === 404){
                setErr(res.data.detail)
            }
            alert('success')
        })
        .catch((err) => {
            console.log("err", err)
        })
    }

  return (
    <form className='form' onSubmit={(e)=>handleSubmit(e)}>
        {err ? 
        <div className='bg-red-500 text-white text-sm flex items-center justify-center p-8 rounded-md mb-4'>{err}</div>
        : 
                <div className='bg-purple-500 text-white text-sm flex items-center justify-center p-8 rounded-md mb-4'>
                    
            Password akan menuggunakan TOKEN PASSWORD PADA GOOGLE AUTH
                </div>
        }

  
        <div className='grid grid-cols-3 gap-4'>

            <div className='flex flex-col gap-2 text-sm'>
                <span>Name</span>
                <input 
                name="name"
                type="text"
                value={input.name || ''}
                onChange={(e)=>handleChange(e)}
                className='form-input' 
                
                />
            </div>
            <div className='flex flex-col gap-2 text-sm'>
                <span>Email</span>
                <input 
                name="email"
                type="email"
                value={input.email || ''}
                onChange={(e)=>handleChange(e)}
                className='form-input' 
                
                />
            </div>
            <div className='flex flex-col gap-2 text-sm'>
                <span>Role / Group</span>
                <select 
                name="role"
                onChange={(e)=>handleChange(e)}
                className='form-input' 
                value={input.role || ''}
                
                >
                    <option>Pilih</option>
                    {role.map((r, i) => (
                        <option key={i} value={r.role}>{r.role}</option>

                    ))}
                </select>
            </div>
            
        </div>
        <div className='flex items-center justify-end'>

            <button 
            type='submit'
            className='bg-emerald-400 text-sm text-white px-4 py-2 rounded-lg w-fit'>Save ?</button>
        </div>

    </form>
  )
}

export default Add