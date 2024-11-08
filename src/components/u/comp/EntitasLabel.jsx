import {useEffect, useState} from 'react'
import { apiCred } from '../../../libs/connection'
import { toastSuccess } from '../../../data/airis'

const EntitasLabel = ({handleChangeLabel}) => {
    const [rld, setRld] = useState(false)

    const [datas, setDatas] = useState([])
    const getValidatorLabel = async () => {
        await apiCred.get(`/airis/validator/label`)
        .then((res) => {
            console.log("res val label", res)
            setDatas(res.data.data)

        })
        .catch((err) => {
            console.log("err", err)
        })
    }

    useEffect(() => {
        getValidatorLabel()

    },[rld])

    const [openadd, setOpenadd] = useState(false)
    const addForm = () => {
        setOpenadd(true)
        setInput('')
    }
    const tutupForm = () => {
        setOpenadd(false)
        setInput('')
    }
    const [input, setInput] = useState('')
    const handleChange = (e) => {
        setInput({...input, [e.target.name] : e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const w = input.name
        const words = w.split(' ');
        const upper = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const join = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');

        let newData = {
            name : upper,
            label : join,
            status : 0,
        }
        await apiCred.post(`/airis/validator/label/store`, newData)
        .then((res) => {
            setRld(!rld)
            toastSuccess()
            setOpenadd(false)
        })
        .catch((err) => {
            console.log("err", err)
        })
    }
  return (
    <div className='flex flex-col bg-white text-xs p-2 rounded-lg shadow-lg'>
        <div className='flex items-center justify-end mb-2 text-white'>
            {openadd ? 
            <button onClick={()=>tutupForm()} className='bg-red-400 px-2 py-1 rounded-md'>X</button>
            :
            <button onClick={()=>addForm()} className='bg-emerald-400 px-2 py-1 rounded-md'>Add New Label</button>
             }

        </div>
        {openadd ? 
        <div>
            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-2'>
                <input 
                    name="name"
                    className="rounded-md px-2 py-1 h-10 border border-purple-400"
                    placeholder='Proposed New Label Naming'
                    onChange={(e)=>handleChange(e)}
                />
                <button type="submit" className='bg-emerald-400 p-1'>Submit</button>
            </form>
        </div>
        
        
        : null}
        {datas.length >= 1 ? 
        
        
            <div className='space-y-2 mt-3'>
                <h3 className='text-md font-bold text-purple-600'>Validator Proposed New Label Naming</h3>
                <div className='flex flex-col gap-2'>
                    {datas && datas.map((r, i) => (
                        <div key={i} className='flex items-center justify-between bg-red-400 rounded-md text-white px-2 py-2'>
                            <span>{r.name}</span>
                            <span
                            onClick={()=>handleChangeLabel(r.label, 0)}
                            >Choose</span>
                        </div>

                    ))}
                </div>
            </div>
        : null}

    </div>
  )
}

export default EntitasLabel