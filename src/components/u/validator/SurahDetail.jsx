import { useEffect, useState } from 'react'
import { surahArray } from '../../../data/surah'
import DropdownMenu from '../comp/DropdownMenu'
import { entitas, toastSuccess } from '../../../data/airis'
import { apiCred } from '../../../libs/connection'
import Swal from 'sweetalert2'

const SurahDetail = ({ dtp, kembali }) => {
    let id = 96
    const [datas, setDatas] = useState([])
    const [rld, setRld] = useState(false)
    useEffect(() => {
        const nf = Object.values(surahArray[id]);
        setDatas(nf)
    }, [dtp])


    const [surahLabel, setSurahLabel] = useState([]) 


    const getSurahLabel = async () => {
        await apiCred.get(`/airis/surah/label?surid=${id}`)
        .then((res) => {
            // console.log("res surah label", res)
            setSurahLabel(res.data.data)

        })
        .catch((err) => {
            console.log("err", err)
        })
    }

    useEffect(() => {
        getSurahLabel()

    },[rld])

    const [logSurah, setLogSurah] = useState('')

    const pilihWord = (word, surid, ayaid) => {
        setIsOpen(true)
        // alert(w)
        setLogSurah({
            surah_id : surid, 
            ayah_id : ayaid
        })
        setWtp(word)
        setNlab('')
    }

    const [isOpen, setIsOpen] = useState(false);
    // const [dtp, setDtp] = useState('')
    const closeModal = () => {
        setIsOpen(false)
    }

    
    const [wtp, setWtp] = useState('')
    const [nlab, setNlab] = useState('')
    const handleSubmit = async (e) => {

        let newData = {
            surah_id : logSurah?.surah_id,
            ayah_id : logSurah?.ayah_id,
            label : nlab
        }
        await apiCred.post(`/airis/label/store`, newData)
        .then((res) => {
            // console.log("res", res)
            setRld(!rld)
            toastSuccess()
        })
        .catch((err) => {
            console.log("err", err)
        })
    }
    const handleChangeLabel = (tag) => {
        const n = wtp.split('/')[0];
        const newLabel = `${n}/${tag}`
        setNlab(newLabel)
    }
    
    const usulanLabel = (ayaid) => {
        let n = surahLabel && surahLabel.filter((it) => it.ayah_id == ayaid)
        if(n){
            return(
                <div className='flex flex-row text-xs gap-2'>
                {n.map((r, i) => (
                    <span key={i} className='text-white bg-emerald-500 px-2 py-1 rounded-full'>{r.label}</span>
                ))}
                </div>
            )
        }
    }


    const hapusLabel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                apiCred.delete(`/airis/label/destroy?id=${id}`)
                .then((res) => {
                    console.log("res", res)
                    setRld(!rld)
                })
                .catch((err) => {
                    console.log("err", err)
                })
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    }
    
    return (
        <div className='w-full flex flex-col mt-8'>
        <h2 className='text-4xl font-bold text-emerald-600 mb-2'>Detail Surah</h2>
        <button onClick={kembali}
            className='bg-red-500 px-4 py-1 rounded-md w-fit text-xs text-white'
            >Kembali</button>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
                <div className="md:col-span-10">
                    
                <div className='flex flex-col gap-3 max-h-[80vh] overflow-x-auto no-scrollbar mt-4'>
                    {datas && datas.map((r, i) => (
                        <div key={i} className='flex flex-col odd:bg-slate-100 odd:rounded-lg p-4 gap-2'>
                            <div>
                                <span className=' bg-cyan-500 p-2 rounded-md  text-white text-xs'>Ayah Number {r.verseid}</span>

                            </div>
                            <div>
                                <span className='font-bold text-slate-600 text-xs'>1. Text Quran</span>

                            </div>
                            <div className='flex flex-col text-red-600'>
                                <span className='font-bold text-slate-600 text-xs'>2. Terjemahan</span>

                                {r.verse}</div>
                            <div>
                                <span className='font-bold text-slate-600 text-xs'>3. Entitas</span>
                                <ul className='flex items-center gap-2 bg-emerald-50 p-2 text-sm'>
                                    {r.results.split(/[\s.]+/).map((result, index) => {
                                        const trimmedResult = result.trim();
                                        if (trimmedResult) {
                                            const afterW = trimmedResult.split('/').slice(-1)[0];
                                            const isAfterO = afterW === 'O' || afterW === 'O)' ? true : false; 
                                            const parts = trimmedResult.split('/');
                                            const sebelumWord = parts.length > 1 ? parts[0] : null;
                                            // const wordPilih = {
                                            //     word : 
                                            // }
                                            return (
                                                <li key={index} className={` ${isAfterO ? '' : 'bg-red-400 text-white rounded-md px-2 py-1 font-bold text-xs'}`}>
                                                    {/* <span onClick={()=>pilihWord(sebelumWord)}> */}
                                                    <span onClick={()=>pilihWord(trimmedResult, r.chapterid, r.verseid )}>
                                                    {trimmedResult}

                                                    </span>
                                                </li>
                                            );
                                        }
                                        return null;
                                    })}
                                </ul>

                            </div>
                            <div className='flex flex-col'>
                                <span className='font-bold text-slate-600 text-xs'>4. Usulan Label Entitas</span>
                                    {usulanLabel(r.verseid)}

                            </div>
                            <div>

                            <span className='font-bold text-slate-600 text-xs'>5. Usulan Entitas Span</span>
                            </div>
                        </div>

                    ))}

                </div>

                </div>
                <div className="md:col-span-2">
                    <div className='flex flex-col gap-2'>
                        <div className='bg-red-500 p-3 rounded-lg text-sm'>
                            <span className='font-bold text-white'>Informasi Umum</span>
                            <ul className='text-xs text-white'>
                                <li>1. Perubahan Label Entitas : <br /> 
                                Struktur Entitas adalah <br /> <br />
                                <span className='bg-purple-600 px-4 py-1 mt-2 mb-2'>Entitas/Label</span>
                                <br/>
                                O = Tidak / Belum ada Label. <br /> <br />
                                Validator bisa mengusulkan perubahan / penambahan label pada entitas yang dimaksud. Setelah proses input New Entitas Label berhasil maka data tersebut akan tersimpan pada kolom 4. Usulan Label Entitas 
                                </li>
                                <li>1. sdfasd</li>
                                <li>1. sdfasd</li>
                                <li>1. sdfasd</li>
                                <li>1. sdfasd</li>
                                <li>1. sdfasd</li>
                                <li>1. sdfasd</li>
                            </ul>
                        </div>
                        <div className='bg-slate-950 p-3 rounded-lg text-sm flex flex-col'>
                            <span className='font-bold text-white'>Pernyataan</span>
                            <span className='text-white text-xs'>Jika Bapak/Ibu Validator secara yakin telah melakukan dan atau memberikan masukan untuk Surah ini, mohon kiranya mengklik tombol pada bagain bahwa ini</span>
                            <button 
                            className='bg-red-600 text-white px-4 py-2 text-xs rounded-lg mt-4'
                            >Saya sudah selesai pada surah ini</button>
                        </div>
                    </div>
                </div>

            </div>

            <div 
            className={`transition-transform duration-500 ease-in-out ${
                isOpen ? 'translate-x-0 w-96 px-8' : 'translate-x-full'
            } fixed top-0 right-0 h-full backdrop-blur-lg p-4 shadow-lg`}
            >
                <div className="flex items-center justify-between">
                <h2 className="text-xl text-emerald-600 font-bold mb-4">Entitas Modul</h2>
                <span 
                onClick={()=>closeModal()}
                className="bg-red-500 px-4 py-1 text-xs text-white font-bold cursor-pointer rounded-xl">X</span>

                </div>
                <div className="max-h-[90vh] overflow-x-auto no-scrollbar">
                <DropdownMenu entitas={entitas} wtp={wtp} nlab={nlab} handleSubmit={handleSubmit} handleChangeLabel={handleChangeLabel} />

                </div>
            </div>
        </div>
    )
}

export default SurahDetail