import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../../libs/connection";
import { entitas, entitasData } from "../../data/airis";
import InfoStore from "./comp/InfoStore";
import ListPerubahan from "./comp/ListPerubahan";
import DropdownMenu from "./comp/DropdownMenu";
import GithubCompiler from "./GithubCompiler";
// import dataset from "/dataset.json"



const DatasetComp = () => {
    let TOTAL_ITEM  = 700
    const PAGE_BUTTONS_TO_SHOW = 10; // Number of page buttons to show

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [datas, setDatas] = useState([])


    const [lisper, setLisper] = useState([])

    const fetchItems = async (page) => {
        try {
            await api.get(`/ds/original_ds`, {
                params: {
                    skip: (page - 1) * 10,
                    limit: TOTAL_ITEM,
                },
            })
                .then(response => {
                    setDatas(response.data);
                    // setTotalPages(Math.ceil(response.data.total / 10));
                    setTotalPages(Math.ceil(61948 / TOTAL_ITEM));

                    setIsLoading(false)
                });

            // Adjust this based on your API response
        } catch (error) {
            setIsLoading(false)
            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        fetchItems(page);
    }, [page]);

    const [isLoading, setIsLoading] = useState(true);

    const [newdata, setNewdata] = useState([])

    const handleTagChange = (idx, newTag) => {
        setDatas(prevDatas =>
            prevDatas.map(item =>
                item.idx === idx ? { ...item, tag: newTag } : item
            )
        );

        let cekNewdata = newdata && newdata.find((it) => it.idx === idx)
        if (!cekNewdata) {
            setNewdata([...newdata, { idx: idx, tag: newTag }])
          } else {
            let nd = newdata.map(item =>
              item.idx === idx ? { ...item, tag: newTag } : item
            );
            setNewdata(nd)
          }
        let n = datas.find((it) => it.idx == idx)
        const newD = {
            idx : idx,
            word : n.word,
            old : n.tag,
            new : newTag
        }

        setLisper([... lisper, newD])
        const newDtp = {
            idx : idx,
            word : n.word,
            tag : newTag
        }
        setDtp(newDtp)

        setIsOpen(false)
    };
    const prevPage = () => {
        setPage(page - 1)
        if(newdata.length >= 1){
            handleSave()
        }
    }
    const nextPage = () => {
        setPage(page + 1)
        if(newdata.length >= 1){
            handleSave()
        }
    }


    const handleSave = async () => {
        await api.post(`/ds/dataset/store`, newdata)
            .then((res) => {
                // console.log("res", res)
            })
            .catch((err) => {
                console.log("err", err)
            })
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
          setPage(newPage);
        }
        if(newdata.length >= 1){
            handleSave()
        }
      };
    
      const getPageButtons = () => {
        const buttons = [];
        const start = Math.max(1, page - Math.floor(PAGE_BUTTONS_TO_SHOW / 2));
        const end = Math.min(totalPages, start + PAGE_BUTTONS_TO_SHOW - 1);
    
        if (start > 1) {
          buttons.push(1);
          if (start > 2) buttons.push('...');
        }
    
        for (let i = start; i <= end; i++) {
          buttons.push(i);
        }
    
        if (end < totalPages) {
          if (end < totalPages - 1) buttons.push('...');
          buttons.push(totalPages);
        }
    
        return buttons;
      };
    
    


    const [isOpen, setIsOpen] = useState(false);

    const [dtp, setDtp] = useState('')
    const pilih = (id) => {
        let n = datas && datas.find((it) => it.idx == id)
        setDtp(n)
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
        setDtp('')
    }
    return (
        <div className="w-full py-8 relative">
            <div className="flex flex-row gap-4">
                <div className="w-full md:w-10/12">
                    <div className="flex flex-col">

                        {isLoading ? <span className="bg-red-400 text-xs text-white py-2 px-4 rounded-full mb-4 text-center">Please Wait Loading the data</span> : <h1 className="text-4xl text-emerald-600 font-bold flex items-center justify-center mb-3">Dataset Entitas</h1>}
                        

                            
                       


                        <div className="relative flex flex-wrap">

                            {datas && datas.map((r, i) => (
                                <div key={i}
                                    // className={`${r.tag != 'O' ? `bg-orange-300 mr-2` : ``} px-2 text-sm flex `}
                                    onClick={() => pilih(r.idx)}
                                    // className="relative inline-block mr-2 cursor-pointer"
                                    className={`relative inline-block cursor-pointer mb-2 ${r.tag != 'O' ? `bg-orange-400 ml-2 mr-2 px-2 rounded-md` : `mr-1`}`}

                                >

                                    {r.word} {r.tag == 'O' ? null : <span className="text-white text-xs font-bold">{r.tag}</span>}

                                </div>

                            ))}
                        </div>
                    </div>
                    <div className="w-full flex flex-row items-center justify-between gap-2 mt-8">
                        <button 
                        className="bg-emerald-500 text-xs text-white px-4 py-2 rounded-md"
                        onClick={() => prevPage()} disabled={page === 1}>
                            Prev Page
                        </button>

                        <div className="flex items-center gap-2">
                        {getPageButtons().map((btn, index) => (
                            <button
                            key={index}
                            className={`px-4 py-1 text-xs border rounded-md ${page === btn ? 'bg-blue-500 text-white' : 'bg-white'}`}
                            onClick={() => {
                                if (btn !== '...') handlePageChange(btn);
                            }}
                            >
                            {btn}
                            </button>
                        ))}

                        </div>
                        <button 
                                                className="bg-red-500 text-xs text-white px-4 py-2 rounded-md"

                        onClick={() => nextPage()} disabled={page === totalPages}>
                            Next Page
                        </button>

                    </div>

                </div>
                <div className="w-full md:w-2/12">
                <div className="w-full flex flex-col gap-2">

                    <InfoStore />
                    {lisper.length >= 1 ? 
                    <ListPerubahan lisper={lisper}/>
                    : null}

                </div>
                </div>

            </div>
            <div 
                className={`transition-transform duration-500 ease-in-out ${
                    isOpen ? 'translate-x-0 w-96 px-8' : '-translate-x-full'
                } fixed top-0 left-0 h-full  backdrop-blur-md p-4 shadow-lg`}
            >
                <div className="flex items-center justify-between">
                <h2 className="text-xl text-emerald-600 font-bold mb-4">Entitas Modul</h2>
                <span 
                onClick={()=>closeModal()}
                className="bg-red-500 px-4 py-1 text-xs text-white font-bold cursor-pointer rounded-xl">X</span>

                </div>
                <div className="max-h-[90vh] overflow-x-auto no-scrollbar">
                <DropdownMenu entitas={entitas} dtp={dtp} handleTagChange={handleTagChange} />

                </div>
            </div>

            
    
        </div>
    )
}

export default DatasetComp