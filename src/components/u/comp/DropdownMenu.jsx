import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'; // Import Heroicons

const DropdownMenu = ({ entitas, dtp, handleTagChange }) => {
    const [openDropdown, setOpenDropdown] = useState({});

    const toggleDropdown = (level, index) => {
        setOpenDropdown(prev => ({
            ...prev,
            [`${level}-${index}`]: !prev[`${level}-${index}`]
        }));
    };

    const filterTag = (tag) => {
        if(tag === dtp?.tag){
            return<span className='bg-red-500 text-xs px-2 py-1 text-white rounded-md'>Terpilih</span>
        }else{
            return<span onClick={()=>handleTagChange(dtp?.idx, tag)}>Pilih</span>
        }
    }
    return (
        <div className="flex flex-col p-4 shadow-xl">

            <div className='flex flex-col gap-2 bg-emerald-400 p-4 rounded-md mb-4 text-white'>
                {/* {dpt?.} */}
                <span>
                Nama Entitas: {dtp?.word} 

                </span>
                <span>
                tag : {dtp?.tag} 

                </span>
                <button className='bg-red-500 hover:bg-red-600 px-4 py-1 text-xs rounded-full'
                
                onClick={()=>handleTagChange(dtp?.idx, 'O')}
                >Set None</button>
            </div>
            {entitas.map((r, i) => (
                <div key={r.name} className="mb-2">
                    <div 
                        className="flex items-center justify-between p-2 cursor-pointer bg-gray-200 hover:bg-gray-300"
                        onClick={() => toggleDropdown('r', i)}
                    >
                        <span>{r.name}</span>
                        {r.isLabel ? filterTag(r.name) : null}
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
                        <div className="ml-4 mt-2">
                            {r.sub.map((itsub, j) => (
                                <div key={itsub?.nameSub} className="flex flex-col mb-2">
                                    <div 
                                        className="flex items-center justify-between p-2 cursor-pointer bg-red-100 hover:bg-red-200"
                                        onClick={() => toggleDropdown('sub', j)}
                                    >
                                        <span>{itsub?.nameSub}</span>
                                        {itsub?.isLabel ? filterTag(itsub?.nameSub) : null}

                                        {itsub?.sub2.length >1 ? 
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
                                                <div key={itsub2?.nameSub2} className="flex flex-col mb-2">
                                                    <div 
                                                        className="flex items-center justify-between p-2 cursor-pointer bg-blue-100 hover:bg-blue-200"
                                                        onClick={() => toggleDropdown('sub2', k)}
                                                    >
                                                        <span>{itsub2?.nameSub2}</span>
                                                        {itsub2?.isLabel ? filterTag(itsub2?.nameSub2) : null}

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
                                                                    {itsub3?.nameSub3}
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
    );
};

export default DropdownMenu;
