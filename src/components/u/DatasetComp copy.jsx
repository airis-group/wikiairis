import axios from "axios";
import { useEffect, useState } from "react";
// import dataset from "/dataset.json"
const DatasetComp = () => {


    // useEffect(() => {
    //     const loadData = async () => {
    //         try {
    //             const response = await fetch('/dataset.json'); // Use the public URL path
    //             if (!response.ok) {
    //                 throw new Error("Network response was not ok");
    //             }
    //             const dataset = await response.json();
    //             setDatas(dataset);
    //         } catch (error) {
    //             console.error("Error loading data:", error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     loadData();
    // }, []);
    let ds = [
        { "idx": 1, word: "Siapa", tag: "O", isInput: 1 }
        , { "idx": 2, word: "yang", tag: "O", isInput: 1 }
        , { "idx": 3, word: "menjadikan", tag: "O", isInput: 1 }
        , { "idx": 4, word: "setan", tag: "O", isInput: 1 }
       

    ]
    const [datas, setDatas] = useState(ds)
    // const [datas, setDatas] = useState("")

    const [isLoading, setIsLoading] = useState(true);

    const [dtp, setDtp] = useState('')
    const pilih = (id) => {
        let n = datas && datas.find((it) => it.idx == id)
        setDtp(n)
    }
    // console.log("dtp", dtp)

    const handleTagChange = (idx, newTag) => {
        setDatas(prevDatas =>
            prevDatas.map(item =>
                item.idx === idx ? { ...item, tag: newTag } : item
            )
        );
    };

    return (
        // <div>DatasetComp</div>
        <div className="w-full py-8">
            <div className="flex flex-row">
                <div className="w-full lg:w-9/12">
                    <div className="flex flex-col">

                        {isLoading ? `Please Wait Loading the data` : null}
                        <button onClick={() => setDtp('')}>Clear Option</button>
                        <div className="flex flex-wrap"
                        // onClick={() => setDtp('')}
                        >
                            {datas && datas.map((r, i) => (
                                <div key={i}
                                    className={`${r.tag != 'O' ? `bg-orange-300 mr-2` : ``} px-2 text-sm flex `}
                                >
                                    <div className="relative cursor-pointer"
                                        onClick={() => pilih(r.idx)}

                                    >
                                        {r.word} {r.tag == 'O' ? null : r.tag}
                                        {r.isInput ?
                                            // <div className={`h-50 min-w-72 bg-red-400 absolute p-2 rounded-md right-0 ${dtp.idx == r.idx ? `visible z-50` : `invisible`} `}>
                                            //     <select
                                            //         className="w-full top-0"
                                            //     >
                                            //         <option
                                            //             value="O"
                                            //         >Set Null</option>
                                            //         <option option="I-Messenger">I-Allah</option>
                                            //         <option option="B-Messenger">B-Messenger</option>


                                            //     </select>

                                            // </div>

                                            <div className={`h-50 min-w-72 bg-red-400 absolute p-2 rounded-md ${dtp.idx == r.idx ? `visible z-50` : `invisible`} `}
    style={{
        top: '30%',
        button: "0",
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }}>

        <span className="z-50" onClick={() => setDtp('')}>{dtp?.word}</span>
    <select
        className="w-full"
        onChange={(e) => handleTagChange(r.idx, e.target.value)}
    >
        <option value="O">Set Null</option>
        <option value="I-Messenger">I-Allah</option>
        <option value="B-Messenger">B-Messenger</option>
    </select>
</div>

                                            : null}
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-3/12">
                    kanan</div>

            </div>



            <div className="flex flex-col">
                {entitas.map((r, i) => (
                    <div key={r.name}>
                        <div className="flex items-center justify-between">
                            <span>{r.name}</span>
                            {r.isLabel ? 
                                <span>Pilih</span>
                            : null}

                        </div>
                        
                        {r.sub.length >=1 ? 
                        
                            <div>
                                {/* Sub 2 */}
                                {r.sub.map((itsub) => (
                                    <div key={itsub?.nameSub} className=" flex flex-col">
                                        <div className="flex items-center justify-between bg-red-100">
                                            <span>
                                        {itsub?.nameSub}

                                            </span>
                                            {itsub?.IsLabel ?   <span>Pilih Sub</span> : null}
                                           

                                        </div>

                                        {itsub.sub2.length >= 1 ? 
                                            <div>
                                                {itsub.sub2.map((itsub2) => (
                                                    <div key={itsub2?.nameSub2}>
                                                        <div className="flex items-center justify-between">
                                                            <span>{itsub2?.nameSub2}</span>
                                                            {itsub2?.isLabel ? 
                                                            <span>Pilih 2</span>
                                                            : null}
                                                        </div>
                                                        
                                                        
                                                        {itsub2?.sub3?.length >=1 ? 
                                                            <div>
                                                                {itsub2?.sub3?.map((itsub3) => (
                                                                    <div key={itsub3?.nameSub3}>
                                                                        <div className="flex items-center justify-between">
                                                                            <span>Sub 3 {itsub3?.nameSub3}</span>
                                                                            {itsub3?.isLabel ? 
                                                                            <span>Pilih</span>
                                                                            : null}
                                                                        </div>
                                                                        
                                                                        
                                                                        
                                                                        </div>

                                                                ))}
                                                            </div>
                                                        
                                                        : null}
                                                    
                                                    </div>
                                                ))}

                                            </div> : null
                                        }
                                    
                                    
                                    </div>

                                ))}
                            </div>
                        
                        : null}
                    </div>

                ))}
            </div>
        </div>
    )
}

export default DatasetComp