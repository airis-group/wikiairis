import { useEffect, useState } from 'react'
import SurahDetail from './validator/SurahDetail'
import { apiCred } from '../../libs/connection'
import TeamB from './validator/TeamB'
import { ButtonKanan } from '../ButtonAction'
import { FaAnchorLock } from "react-icons/fa6";

const Validator = () => {
    const [dtp, setDtp] = useState('')
    const userDetail = JSON.parse(localStorage.getItem('data'))
    console.log("userDetail", userDetail)

    const [datas, setDatas] = useState([])
    const [assign, setAssign] = useState('')
    const kembali = () => {
        setDtp('')
        setAssign('')
    }
    const pilih = (id) => {
        let n = datas && datas.find((it) => it.id == id)
        setDtp(n.surah_id)
        setAssign(n)
    }

    const getDatas = async () => {
        await apiCred(`/airis/validator`)
            .then((res) => {
                setDatas(res.data.data)
            })
            .catch((err) => {
                console.log("err", err)
            })
    }
    useEffect(() => {
        getDatas()
    }, [])

    console.log("assig", userDetail?.group)

    return (
        <>
        {userDetail?.group === 'TEAMA' ? 
        
            <>
                {dtp ? <SurahDetail assign={assign} dtp={dtp} kembali={kembali} /> :
                    <div className='w-full flex flex-col gap-4 mt-8'>
                        <h2 className='text-4xl font-bold text-emerald-600'>List Assessment</h2>

                        <div className='w-full flex flex-col gap-2'>
                            {/* <div className='x-full px-4 p-2 bg-slate-100 rounded-md flex items-center justify-between'>
                                <div>Surah 1</div>
                                <div className='flex items-center justify-center gap-4'>
                                    <button>Status :  Open</button>
                                    <button
                                        onClick={() => pilih(96)}
                                    >Detail</button>

                                </div>
                            </div> */}
                            {datas && datas.map((r, i) => (
                                // <div key={i} className='x-full px-4 p-2 bg-slate-100 rounded-md'>Surah {r.surah_id}</div>
                                <div key={i} className={`x-full px-4 text-sm p-2 ${r.status_id ? `bg-red-400 shadow-lg text-white` : `bg-slate-100`} rounded-md flex items-center justify-between`}>
                                <div>Surah Number {r.surah_id}</div>
                                {r.status_id ? 
                                
                                <div className='flex items-center justify-center gap-4'>
                                    <button>Status :  Close</button>
                                   <FaAnchorLock />

                                </div>
                                
                                : 
                                
                                <div className='flex items-center justify-center gap-4'>
                                    <button>Status :  Open</button>
                                    <ButtonKanan 
                                        onClick={() => pilih(r.id)}
                                    />
                                    {/* <button
                                        onClick={() => pilih(r.id)}
                                    >Detail</button> */}

                                </div>
                                
                                }
                            </div>


                            ))}
                        </div>

                    </div>
                }
            </>
        
        : <TeamB /> }
            
        </>

    )
}

export default Validator