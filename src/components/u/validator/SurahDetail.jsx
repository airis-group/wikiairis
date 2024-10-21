import { useEffect, useState, useRef } from 'react'
import { surahArray } from '../../../data/surah'
import DropdownMenu from '../comp/DropdownMenu'
import { entitas, toastSuccess } from '../../../data/airis'
import { apiCred } from '../../../libs/connection'
import Swal from 'sweetalert2'
import EntitasSpan from '../comp/EntitasSpan'
import { HiChevronDoubleLeft } from "react-icons/hi";
import PernyataanValidator from './PernyataanValidator'
import GithubCompiler from '../GithubCompiler'
import axios from 'axios'
import { LoadingCard } from '../../ButtonAction'

const SurahDetail = ({ assign, dtp, kembali }) => {
    // let id = '098' => ada perubahan jika  <= contoh dtp = 98 maka return 098

    const [animate, setAnimate] = useState(false)

    let id = dtp; 

    if (typeof id === 'string') {
      id = parseInt(id, 10); 
    }
    
    if (id <= 99) {
      id = id.toString().padStart(3, '0');
    }
    

    const [surah, setSurah] = useState([])
    const [ayah, setAyah] = useState([])
    const handleFetchData = async () => {
        try {
          const response = await fetch(`/quran/${dtp}.json`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const jsonData = await response.json();
          setSurah(jsonData[dtp]);
          const textArray = Object.entries(jsonData[dtp].text).map(([key, value]) => ({
            id: key,
            text: value
        }));         
         setAyah(textArray)
        } catch (error) {
          console.error('Error fetching the JSON file:', error);
          setSurah([]); // Reset data on error
        }    
      };

    const filterQuranArabic = (vid) => {
        const n = ayah && ayah.find((it => it.id == vid))
        return n?.text
    }



    

    const [datas, setDatas] = useState([])
    const [rld, setRld] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Await the axios request to resolve
                setAnimate(true)
                const response = await axios.get(`https://raw.githubusercontent.com/RiaGusmita/E-IndQNER/refs/heads/main/al-quran-dataset-formatted/chapter_${id}.json`);
                
                const nf = Object.values(response.data[id]);
                setDatas(nf);
                handleFetchData();
                setAnimate(false)
            } catch (err) {
                console.error("Error fetching data:", err);
                setAnimate(false)
            }
        };
        
        // Call the fetchData function inside useEffect
        fetchData();
    }, [dtp])

    
    // console.log("datas disinis", datas)
    const [surahLabel, setSurahLabel] = useState([]) 


    const getSurahLabel = async () => {
        await apiCred.get(`/airis/surah/label?surid=${id}`)
        .then((res) => {
            setSurahLabel(res.data.data)

        })
        .catch((err) => {
            console.log("err", err)
        })
    }

    useEffect(() => {
        getSurahLabel()

    },[rld])

    // console.log("surah_label", surahLabel)

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
        setOpenes(false)
    }

    const [isOpen, setIsOpen] = useState(false);
    // const [dtp, setDtp] = useState('')
    const closeModal = () => {
        setIsOpen(false)
    }

    
    const [wtp, setWtp] = useState('')
    const [nlab, setNlab] = useState([])

    const handleChangeLabel = (tag, status) => {
        const n = wtp.split('/')[0];
        const newLabel = `${n}/${tag}`
        // setNlab(newLabel)
        setNlab({
            entitas : n,
            label : tag,
            newLabel : newLabel,
            status : status,
        })      
        // handleSubmit()  
    }

    const handleSubmit = async (e) => {

        let newData = {
            surah_id : logSurah?.surah_id,
            ayah_id : logSurah?.ayah_id,
            entitas : nlab?.entitas,
            label : nlab?.label,
            status : nlab?.status,
            newLabel : nlab?.newLabel,
            // el => entity label
            code : 'el',
        }
        await apiCred.post(`/airis/label/store`, newData)
        .then((res) => {
            // console.log("res", res)
            setRld(!rld)
            toastSuccess()
            setIsOpen(false)
        })
        .catch((err) => {
            console.log("err", err)
        })
    }
    
    const usulanLabel = (ayaid) => {
        let n = surahLabel && surahLabel.filter((it) => it.ayah_id == ayaid & it.code == 'el')
        if(n){
            return(
                <div className='flex flex-row text-xs gap-2'>
                {n.map((r, i) => (
                    <span key={i}
                    onClick={()=>hapusLabel(r.id)}
                    className={`text-white ${r.status === 1? `bg-emerald-500` : `bg-red-500`} px-3 py-1 rounded-full`}>{r.newLabel}</span>
                ))}
                </div>
            )
        }
    }
    const usulanSpan = (ayaid) => {
        let n = surahLabel && surahLabel.filter((it) => it.ayah_id == ayaid & it.code == 'es')
        if(n){
            return(
                <div className='flex flex-row text-xs gap-2'>
                {n.map((r, i) => (
                    <span key={i}
                    onClick={()=>hapusLabel(r.id)}
                    className={`text-white ${r.status === 1? `bg-emerald-500` : `bg-red-500`} px-3 py-1 rounded-full`}>{r.newLabel}</span>
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
                apiCred.get(`/airis/label/destroy?id=${id}`)
                .then((res) => {
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

    /// MOUSE SELECT ENTITAS SPAN
    const [selectedText, setSelectedText] = useState('');
    const [openes, setOpenes] = useState(false)
    
    const closeEntitySpan = () => {
        setOpenes(false)
        setSelectedText('')
    }
    const handleSelection = (surid, ayaid) => {
        const selection = window.getSelection().toString();
        setLogSurah({
            surah_id : surid, 
            ayah_id : ayaid
        })

        const words = selection.split(/\s+/); 

       const cleanedWords = words.map(word => {
         const index = word.indexOf('/');
         return index !== -1 ? word.slice(0, index) : word;
       });
   
       const result = cleanedWords.filter(word => word).join(' ').trim(); 
       setSelectedText(result);
       setIsOpen(false)
       setOpenes(true)
    };
    const [entitySpan, setEntitySpan] = useState('')
    const handleChangeSpanLabel = (tag, status) => {

        const newLabel = `${selectedText}/${tag}`
        setEntitySpan({
            entitas : selectedText,
            label : tag,
            newLabel : newLabel,
            status : status,
        })      
    }
    const handleSubmitSpan = async (e) => {
        let newData = {
            surah_id : logSurah?.surah_id,
            ayah_id : logSurah?.ayah_id,
            entitas : entitySpan?.entitas,
            label : entitySpan?.label,
            // status harus divalidasi oleh admin
            status : 0,
            newLabel : entitySpan?.newLabel,
            // es => entity span label
            code : 'es',
        }
        await apiCred.post(`/airis/label/store`, newData)
        .then((res) => {
            setRld(!rld)
            toastSuccess()
            setIsOpen(false)
        })
        .catch((err) => {
            console.log("err", err)
        })
    }
    /// # MOUSE SELECT ENTITAS SPAN

    return (
        <div className='w-full flex flex-col mt-8 mb-8'>
        <div className='bg-purple-400 rounded-lg flex items-center flex-col justify-center py-8 mb-4 mt-4 shadow-lg'>
            <h2 className='text-2xl font-bold text-white mb-2'>Detail Surah Number {dtp} </h2>
            <h2 className='arabic-font text-4xl font-bold text-white mb-2'>{surah?.name}</h2>
            <h2 className='text-2xl font-bold text-white mb-2'>{surah?.name_latin}</h2>
        <GithubCompiler />
        </div>
        <button onClick={kembali}
            className='bg-red-500 px-4 py-1 rounded-md w-fit text-xs text-white flex items-center justify-between gap-3'
            >
                <HiChevronDoubleLeft />

                Back to Assessment List
            </button>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
                <div className="md:col-span-10">

                <div className='flex flex-col gap-3 max-h-[70vh] overflow-x-auto no-scrollbar mt-4'>
                    {animate ? 
                        <LoadingCard />
                    : null}
                    {datas && datas.map((r, i) => (
                        <div key={i} className='flex flex-col odd:bg-slate-100 odd:rounded-lg p-4 gap-2'>
                            <div>
                                <span className=' bg-cyan-500 p-2 rounded-md  text-white text-xs'>Ayah Number {r.verse_id}</span>

                            </div>
                            <div>
                                <span className='font-bold text-slate-600 text-xs'>1. Text Quran</span>
                                <div className='w-full flex items-center justify-end'>
                                    <p className='arabic-font text-2xl'>
                                        {filterQuranArabic(r.verse_id)}

                                    </p>
                                </div>

                            </div>
                            {/* <div className='flex flex-col text-red-600'>
                                <span className='font-bold text-slate-600 text-xs'>2. Terjemahan</span>

                                {r.verse}
                            </div> */}
                            <div className='flex-wrap'>
                                <span className='font-bold text-slate-600 text-xs'>2. Verse Translation
                                </span>
                                <ul className='flex items-center gap-2 bg-emerald-50 p-2 text-sm flex-wrap'>
                                    {r.labels.id.split(/[\s.]+/).map((result, index) => {
                                        const trimmedResult = result.trim();
                                        if (trimmedResult) {
                                            const afterW = trimmedResult.split('/').slice(-1)[0];
                                            const isAfterO = afterW === 'O' || afterW === 'O)' || afterW ==='O,/O' ? true : false; 
                                            const parts = trimmedResult.split('/');
                                            const sebelumWord = parts.length > 1 ? parts[0] : null;
                                            const sesudahWord = parts.length > 1 ? parts[1] : null;
                                            // const wordPilih = {
                                            //     word : 
                                            // }
                                            return (
                                                <li key={index} className={` ${isAfterO ? '' : 'bg-red-400 text-white rounded-md px-2 py-1 font-bold text-xs'}`}>
                                                    {/* <span onClick={()=>pilihWord(sebelumWord)}> */}
                                                    <span onClick={()=>pilihWord(trimmedResult, r.chapterid, r.verse_id )}>
                                                    {/* {trimmedResult} */}
                                                    <div onMouseUpCapture={()=>handleSelection(r.chapterid, r.verse_id)} 
                                                        //   style={{  border: '1px solid #ccc', userSelect: 'text' }}

                                                    >
                                                    {sebelumWord}{sesudahWord != "O" ? `/${sesudahWord}` : null}
                                                    
                                                    </div>
                                                  

                                                    </span>
                                                </li>
                                            );
                                        }
                                        return null;
                                    })}
                                </ul>

                            </div>
                            <div className='flex flex-col'>
                                <span className='font-bold text-slate-600 text-xs'>3. Proposed Entity Label</span>
                                    {usulanLabel(r.verse_id)}
                            </div>
                            <div>


                            <span className='font-bold text-slate-600 text-xs'>4. Proposed Entity Span & Label</span>
                                    {usulanSpan(r.verse_id)}
                            </div>
                        </div>

                    ))}

                </div>

                </div>
                <div className="md:col-span-2">
                    <div className='flex flex-col gap-2'>
                    <div className='bg-slate-950 p-3 rounded-lg text-sm flex flex-col'>
                            <span className='font-bold text-white'>Pernyataan</span>
                            <span className='text-white text-xs'>Jika Bapak/Ibu Validator secara yakin telah melakukan dan atau memberikan masukan untuk Surah ini, mohon kiranya mengklik tombol pada bagain bahwa ini</span>
                            
                            <PernyataanValidator assign={assign} />
                        </div>
                        <div className='bg-red-600 p-3 rounded-lg text-sm max-h-[350px] overflow-x-auto no-scrollbar'>
                            <span className='font-bold text-white'>Informasi Umum</span>
                            <ul className='text-xs text-white space-y-3'>
                                <li>
                                    <span className='font-bold'>
                                    1. Modul Perubahan Label Entitas : 

                                    </span>
                                    
                                    <br /> 
                                Struktur Entitas & Label adalah <br /> <br />
                                <span className='bg-purple-600 px-4 py-1 mt-2 mb-2'>Entitas/Label</span>
                                <br/>
                                <br />

                                Validator bisa mengusulkan perubahan / penambahan label pada entitas yang dimaksud. Setelah proses input New Entitas Label berhasil maka data tersebut akan tersimpan pada kolom 4. Usulan Label Entitas 
                                </li>
                                <li>
                                <span className='font-bold'>
                                    2. Modul Usulan Label Entitas baru : 
                                    </span>
                                    <br />
                                    Modul Usulan Label Entitas Baru adalah fitur yang dirancang untuk memungkinkan pengguna mengusulkan dan mendefinisikan label baru untuk entitas yang ada dalam sistem
                                </li>
                                <li>
                                <span className='font-bold'>
                                    3. Modul Usulan Entitas Span: 
                                    </span>
                                    <br />
                                    Modul Usulan Entitas Span adalah fitur yang dirancang untuk memungkinkan pengguna mengusulkan entitas baru yang berkaitan dengan data yang sedang dikelola. Modul ini berfungsi untuk memperluas basis data dan memastikan bahwa entitas yang ada relevan dan up-to-date dengan perkembangan terbaru di lapangan.
                                    <br />
                                    Modul ini memungkinkan Validator untuk menggabungkan 2(dua) kata atau lebih menjadi 1(Satu) Entitas. Seperti Contoh : 
                                    <br />
                                    <br />
                                    <span className='bg-purple-600 px-4 py-1 mt-2 mb-2'>Entitas Entitas/Label</span>


                                </li>
                            </ul>
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
                <h2 className="text-xl text-emerald-600 font-bold mb-4">Entitas Label Modul</h2>
                <span 
                onClick={()=>closeModal()}
                className="bg-red-500 px-4 py-1 text-xs text-white font-bold cursor-pointer rounded-xl">X</span>

                </div>
                <div className="max-h-[90vh]">
                <DropdownMenu entitas={entitas} wtp={wtp} nlab={nlab} handleSubmit={handleSubmit} handleChangeLabel={handleChangeLabel} />

                </div>
            </div>
            <div 
            className={`transition-transform duration-500 ease-in-out ${
                openes ? 'translate-x-0 w-96 px-8' : 'translate-x-full'
            } fixed top-0 right-0 h-full backdrop-blur-lg p-4 shadow-lg`}
            >
                <div className="flex items-center justify-between">
                <h2 className="text-xl text-emerald-600 font-bold mb-4">Entitas Span Modul</h2>
                <span 
                onClick={()=>closeEntitySpan()}
                className="bg-red-500 px-4 py-1 text-xs text-white font-bold cursor-pointer rounded-xl">X</span>

                </div>
                <div className="max-h-[90vh]">
                    <EntitasSpan entitas={entitas} selectedText={selectedText} entitySpan={entitySpan} handleChangeSpanLabel={handleChangeSpanLabel} handleSubmitSpan={handleSubmitSpan} />

                </div>
            </div>
        </div>
    )
}

export default SurahDetail