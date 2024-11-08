import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'; // Import Heroicons
import EntitasLabel from './EntitasLabel';

const DropdownMenu = ({ entitas, nlab, wtp, handleSubmit, handleChangeLabel }) => {
    const [openDropdown, setOpenDropdown] = useState({});

    const toggleDropdown = (level, index) => {
        setOpenDropdown(prev => ({
            ...prev,
            [`${level}-${index}`]: !prev[`${level}-${index}`]
        }));
    };

    const bhs = localStorage.getItem('lang')

    const filterTag = (tag) => {
            return<span className='bg-red-500 text-xs px-2 py-1 text-white rounded-md' onClick={()=>handleChangeLabel(tag, 1)}>
                {/* {tag} */}
                choose</span>
    }
    return (
        <div className="flex flex-col p-4 shadow-xl">

            <div className='flex flex-col bg-emerald-600 text-sm p-4 rounded-md mb-4 text-white'>
                {/* {dpt?.} */}
                <span className='font-bold'>Old Label:</span>
                <span> {wtp} </span>
                <span className='font-bold mt-2'>New Label: <br /> {nlab?.newLabel || ''}</span>
                {nlab ? 
                
                <button className='bg-red-500 hover:bg-red-600 px-4 py-1 text-xs rounded-full mt-4'
                
                onClick={(e)=>handleSubmit(e)}
                >Save Changes ?</button>
                : null}
            </div>
            <div className='h-[75vh] overflow-x-auto no-scrollbar flex flex-col'>
                <button onClick={()=>handleChangeLabel('0', 1)}
                    className='bg-red-400 text-sm text-white mb-2 px-2 py-1 shadow-lg rounded-xl'
                    >Clear Label</button>
                <EntitasLabel handleChangeLabel={handleChangeLabel} />
                {entitas.map((r, i) => (
                    <div key={i} className="mb-2 mt-4">
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

                                                                        {itsub3?.isLabel ? filterTag(itsub3?.label) : null}
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

export default DropdownMenu;
