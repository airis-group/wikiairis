import {useEffect, useState} from 'react'
import { apiCred } from '../../../libs/connection';

const Assignment = () => {
    const surah = Array.from({ length: 114 }, (_, index) => index + 1);
    const [validator, setValidator] = useState([])
    const [datas, setDatas] = useState([])
    const [rld, setRld] = useState(false)
    const getValidator = async () => {
        await apiCred.get('/adm/users')
        .then((res) => {
            console.log("ere", res)
            setValidator(res.data)
        })
        .catch((err) => {
            console.log("err", err)
        })
    }
    const getDatas = async () => {
        await apiCred.get('/adm/assignment')
        .then((res) => {
            console.log("ere", res)
            setDatas(res.data)
        })
        .catch((err) => {
            console.log("err", err)
        })
    }
    useEffect(() => {
        getValidator()
        getDatas()
    },[rld])
    let userVal = validator && validator.filter(it => it.email != 'erna@erna.com')
    const filter = (usid, sid) => {
        let n = datas && datas.find((it) => it.user_id == usid && it.surah_id ==  sid)
        if(n){
            return <button 
            onClick={()=>remAsss(n.id)}
            key={sid} className='bg-emerald-400 px-2 py-1 rounded-md'>SID. {sid}</button>
        }else{
            return <button 
            onClick={()=>addAsss(usid, sid)}
            
            key={sid} className='bg-red-400 px-2 py-1 rounded-md'>SID. {sid}</button>
        }
    }

    const addAsss = async (usid, sid) => {
        let data = {
            user_id : usid,
            surah_id : sid
        }
        await apiCred.post('/adm/assignment/store', data)
        .then((res) => {
            console.log("ere", res)
            setRld(!rld)
        })
        .catch((err) => {
            console.log("err", err)
        })

    }
    const remAsss = async (id) => {
        await apiCred.delete(`/adm/assignment/destroy?id=${id}`)
        .then((res) => {
            console.log("ere", res)
            setRld(!rld)
        })
        .catch((err) => {
            console.log("err", err)
        })

    }

    return (
    <div className='flex flex-col gap-2'>
        <h2 className='text-4xl font-bold text-orange-600'>Validator Assignment</h2>
        <div className='bg-purple-500 text-sm text-white p-8 rounded-md mb-2'>
            <h2 className='font-bold'>Informasi Penting</h2>
            1. Pada modul ini, Administrator menentukan penugasan terhadap Validator dengan ketentuan seorang Validator boleh memiliki lebih dari satu Surah
            <br />
            2. Sudah yang ditugaskan pada laman ini, kemudian akan terlihat pada laman Assignment dari masing-masing Validator. 
        </div>

        <div className='flex flex-col gap-2'>
        {userVal && userVal.map((r, i) => (
            <div key={i} className='flex flex-row gap-4 items-start justify-start odd:bg-slate-50 p-4 rounded-md'>
                <div className='w-2/12'>{r.name}</div>
                <div className='w-full flex flex-wrap gap-2 text-xs text-white'>
                    {/* {surah.map((sid) => (
                        <button key={sid} className='bg-red-400 rounded-md px-4 py-1'>SID.{sid}</button>

                    ))} */}
                    {surah.map((sid) => filter(r.id, sid))}
                        
                </div>
            </div>

        ))}
        </div>
    </div>
  )
}

export default Assignment