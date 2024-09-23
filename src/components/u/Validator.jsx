import {useEffect, useState} from 'react'
import SurahDetail from './validator/SurahDetail'
import { apiCred } from '../../libs/connection'

const Validator = () => {
    const [dtp, setDtp] = useState('')
    const kembali = () => {
        setDtp('')
    }
    const pilih = (id) => {
        setDtp(id)
    } 

    const getDatas = async () => {
        await apiCred(`/airis/validator`)
        .then((res) => {
            console.log("res", res)
        })
        .catch((err) => {
            console.log("err", err)
        })
    }
    useEffect(() => {
        getDatas()
    },[])
  return (
    <>
        {dtp ? <SurahDetail dtp={dtp} kembali={kembali} /> : 
    <div className='w-full flex flex-col gap-2'>
        <h2 className='text-4xl font-bold text-emerald-600'>List Assessment</h2>
        
            <div className='w-full flex flex-col gap-2'>
                <div className='x-full px-4 p-2 bg-slate-100 rounded-md flex items-center justify-between'>
                    <div>Surah 1</div>
                    <div className='flex items-center justify-center gap-4'>
                        <button>Status :  Open</button>
                        <button
                        onClick={()=>pilih(1)}
                        >Detail</button>

                    </div>
                </div>
                <div className='x-full px-4 p-2 bg-slate-100 rounded-md'>Surah 2</div>
                <div className='x-full px-4 p-2 bg-slate-100 rounded-md'>Surah 3</div>
            </div>
        
    </div>
        }
    </>
        
  )
}

export default Validator