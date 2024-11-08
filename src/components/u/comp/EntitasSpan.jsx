import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'; // Import Heroicons
import { apiCred } from '../../../libs/connection';

const EntitasSpan = ({ entitas, selectedText, entitySpan, handleChangeSpanLabel,  handleSubmitSpan }) => {
    const [openDropdown, setOpenDropdown] = useState({});

    const toggleDropdown = (level, index) => {
        setOpenDropdown(prev => ({
            ...prev,
            [`${level}-${index}`]: !prev[`${level}-${index}`]
        }));
    };

    const bhs = localStorage.getItem('lang')

    const filterTag = (tag) => {
            return<span className='bg-red-500 text-xs px-2 py-1 text-white rounded-md' onClick={()=>handleChangeSpanLabel(tag, 1)}>
                {/* {tag} */}
                choose</span>
 
    }


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
        <div className="flex flex-col p-4 shadow-xl">

            <div className='flex flex-col bg-emerald-600 text-sm p-4 rounded-md mb-4 text-white'>
                {/* {dpt?.} */}
                <span className='font-bold'>New Entity Span:</span>
                <span> {selectedText} </span>
                <span className='font-bold mt-2'>New Label: <br /> {entitySpan?.newLabel || ''}</span>
                {entitySpan ? 
                
                <button className='bg-red-500 hover:bg-red-600 px-4 py-1 text-xs rounded-full mt-4'
                
                onClick={(e)=>handleSubmitSpan(e)}
                >Save Changes ?</button>
                : null}
            </div>
            <div className='h-[75vh] overflow-x-auto no-scrollbar flex flex-col'>
            <div className='flex flex-col bg-white text-xs p-2 rounded-lg shadow-lg mb-3'>
            <div className='flex items-center justify-end mb-2'>
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
                        onClick={()=>handleChangeSpanLabel(r.label, 0)}
                        >Choose</span>
                    </div>

                ))}
            </div>
        </div>
    : null}

                </div>
                

                {entitas.map((r, i) => (
                    <div key={i} className="mb-2">
                        <div 
                            className="flex items-center justify-between text-sm p-2 cursor-pointer bg-gray-200 rounded-md hover:bg-gray-300"
                            onClick={() => toggleDropdown('r', i)}
                        >
                            <span>{bhs === 'ind' ? r.lang.ind : r.lang.en}</span>
                            {r.isLabel ? filterTag(r.label) : null}
                            {r.sub.length >= 1 && (
                                <span className="ml-2">
                                    {openDropdown[`r-${i}`] ? (
                                        <ChevronDownIcon className="w-5 h-5" />
                                    ) : (
                                        <ChevronRightIcon className="w-5 h-5" />
                                    )}
                                </span>
                            )}
                        </div>
                        
                        {openDropdown[`r-${i}`] && r.sub.length >= 1 && (
                            <div className="ml-4 mt-2" key={`r-${i}`}>
                                {r.sub.map((itsub, j) => (
                                    <div className="flex flex-col mb-2" key={j}>
                                        <div 
                                            className="flex items-center justify-between text-sm p-2 cursor-pointer bg-red-100 rounded-md hover:bg-red-200"
                                            onClick={() => toggleDropdown('sub', j)}
                                        >
                                            {/* <span>{itsub?.nameSub}</span> */}
                                            <span>{bhs === 'ind' ? itsub?.lang.ind : itsub?.lang.en}</span>

                                            {itsub?.isLabel ? filterTag(itsub?.label) : null}

                                            {itsub?.sub2.length >= 1 ? 
                                                <span className="ml-2">
                                                    {openDropdown[`sub-${j}`] ? (
                                                        <ChevronDownIcon className="w-5 h-5" />
                                                    ) : (
                                                        <ChevronRightIcon className="w-5 h-5" />
                                                    )}
                                                </span>
                                            
                                            : null}
                                        </div>
                                        
                                        {openDropdown[`sub-${j}`] && itsub.sub2.length >= 1 && (
                                            <div className="ml-4 mt-2">
                                                {itsub.sub2.map((itsub2, k) => (
                                                    <div key={itsub2?.nameSub2} className="flex flex-col text-sm mb-2">
                                                        <div 
                                                            className="flex items-center justify-between p-2 cursor-pointer rounded-md bg-blue-100 hover:bg-blue-200"
                                                            onClick={() => toggleDropdown('sub2', k)}
                                                        >
                                                            {/* <span>{itsub2?.nameSub2}</span> */}
                                                            <span>{bhs === 'ind' ? itsub2?.lang.ind : itsub2?.lang.en}</span>

                                                            {itsub2?.isLabel ? filterTag(itsub2?.label) : null}

                                                            {itsub2?.sub3?.length >=1 ?
                                                            
                                                                <span className="ml-2">
                                                                    {openDropdown[`sub2-${k}`] ? (
                                                                        <ChevronDownIcon className="w-5 h-5" />
                                                                    ) : (
                                                                        <ChevronRightIcon className="w-5 h-5" />
                                                                    )}
                                                                </span> 
                                                                : null
                                                            }
                                                            
                                                        </div>
                                                        
                                                        {openDropdown[`sub2-${k}`] && itsub2?.sub3?.length >= 1 && (
                                                            <div className="ml-4 mt-2">
                                                                {itsub2.sub3.map((itsub3, l) => (
                                                                    <div key={itsub3?.nameSub3} className="p-2 cursor-pointer flex items-center justify-between bg-gray-100 hover:bg-gray-200">
                                                                        {/* {itsub3?.nameSub3} */}
                                                                        <span>{bhs === 'ind' ? itsub3?.lang.ind : itsub3?.lang.en}</span>

                                                                        {itsub3?.isLabel ? filterTag(itsub3?.nameSub3) : null}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

            </div>
        </div>
    );
};

export default EntitasSpan;
