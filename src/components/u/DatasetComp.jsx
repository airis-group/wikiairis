import axios from "axios";
import { useEffect, useState } from "react";
// import dataset from "/dataset.json"
const DatasetComp = () => {
 

    // useEffect(() => {
    //   const loadData = async () => {
    //     try {
    //       const response = await fetch('/dataset.json'); // Use the public URL path
    //       if (!response.ok) {
    //         throw new Error("Network response was not ok");
    //       }
    //       const dataset = await response.json();
    //       setDatas(dataset);
    //     } catch (error) {
    //       console.error("Error loading data:", error);
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };
  
    //   loadData();
    // }, []);
    let ds = [
        {"idx": 1, word: "Siapa", tag: "O", isInput: 1}
        ,{"idx": 2, word: "yang", tag: "O", isInput: 1}
        ,{"idx": 3, word: "menjadikan", tag: "O", isInput: 1}
        ,{"idx": 4, word: "setan", tag: "O", isInput: 1}
        ,{"idx": 5, word: "sebagai", tag: "O", isInput: 1}
        ,{"idx": 6, word: "temannya", tag: "O", isInput: 1}
        ,{"idx": 7, word: ",", tag: "O", isInput: 0}
        ,{"idx": 8, word: "(", tag: "O", isInput: 0}
        ,{"idx": 9, word: "ketahuilah", tag: "O", isInput: 1}
        ,{"idx": 10, word: "bahwa", tag: "O", isInput: 1}
        ,{"idx": 11, word: ")", tag: "O", isInput: 0}
        ,{"idx": 12, word: "dia", tag: "O", isInput: 1}
        ,{"idx": 13, word: "adalah", tag: "O", isInput: 1}
        ,{"idx": 14, word: "seburuk-buruk", tag: "O", isInput: 1}
        ,{"idx": 15, word: "teman", tag: "O", isInput: 1}
        ,{"idx": 16, word: ".", tag: "O", isInput: 0}
        ,{"idx": 17, word: "Allah", tag: "B-Allah", isInput: 1}
        ,{"idx": 18, word: "tidak", tag: "O", isInput: 1}
        ,{"idx": 19, word: "memberi", tag: "O", isInput: 1}
        ,{"idx": 20, word: "petunjuk", tag: "O", isInput: 1}
        ,{"idx": 21, word: "kepada", tag: "O", isInput: 1}
        ,{"idx": 22, word: "kaum", tag: "O", isInput: 1}
        ,{"idx": 23, word: "kafir", tag: "O", isInput: 1}
        ,{"idx": 24, word: ".", tag: "O", isInput: 0}
        ,{"idx": 25, word: "Padahal", tag: "O", isInput: 1}
        ,{"idx": 26, word: ",", tag: "O", isInput: 0}
        ,{"idx": 27, word: "dia", tag: "O", isInput: 1}
        ,{"idx": 28, word: "adalah", tag: "O", isInput: 1}
        ,{"idx": 29, word: "penentang", tag: "O", isInput: 1}
        ,{"idx": 30, word: "yang", tag: "O", isInput: 1}
        ,{"idx": 31, word: "paling", tag: "O", isInput: 1}
        ,{"idx": 32, word: "keras", tag: "O", isInput: 1}
        ,{"idx": 33, word: ".", tag: "O", isInput: 0}
        ,{"idx": 34, word: "Janganlah", tag: "O", isInput: 1}
        ,{"idx": 35, word: "kamu", tag: "O", isInput: 1}
        ,{"idx": 36, word: "menukar", tag: "O", isInput: 1}
        ,{"idx": 37, word: "ayat-ayat-Ku", tag: "O", isInput: 1}
        ,{"idx": 38, word: "dengan", tag: "O", isInput: 1}
        ,{"idx": 39, word: "harga", tag: "O", isInput: 1}
        ,{"idx": 40, word: "yang", tag: "O", isInput: 1}
        ,{"idx": 41, word: "murah", tag: "O", isInput: 1}
        ,{"idx": 42, word: ".", tag: "O", isInput: 0}
        ,{"idx": 43, word: "”", tag: "O", isInput: 1}
        ,{"idx": 44, word: "Kemudian", tag: "O", isInput: 1}
        ,{"idx": 45, word: ",", tag: "O", isInput: 0}
        ,{"idx": 46, word: "biarkanlah", tag: "O", isInput: 1}
        ,{"idx": 47, word: "mereka", tag: "O", isInput: 1}
        ,{"idx": 48, word: "bermain-main", tag: "O", isInput: 1}
        ,{"idx": 49, word: "dalam", tag: "O", isInput: 1}
        ,{"idx": 50, word: "kesesatannya", tag: "O", isInput: 1}
        ,{"idx": 51, word: ".", tag: "O", isInput: 0}
        ,{"idx": 52, word: "”", tag: "O", isInput: 1}
        ,{"idx": 53, word: "Dia", tag: "O", isInput: 1}
        ,{"idx": 54, word: "(", tag: "O", isInput: 0}
        ,{"idx": 55, word: "Musa", tag: "B-Messenger", isInput: 1}
        ,{"idx": 56, word: ")", tag: "O", isInput: 0}
        ,{"idx": 57, word: "menjawab", tag: "O", isInput: 1}
        ,{"idx": 58, word: ",", tag: "O", isInput: 0}
        ,{"idx": 59, word: "“", tag: "O", isInput: 1}
        ,{"idx": 60, word: "Apakah", tag: "O", isInput: 1}
        ,{"idx": 61, word: "kamu", tag: "O", isInput: 1}
        ,{"idx": 62, word: "meminta", tag: "O", isInput: 1}
        ,{"idx": 63, word: "sesuatu", tag: "O", isInput: 1}
        ,{"idx": 64, word: "yang", tag: "O", isInput: 1}
        ,{"idx": 65, word: "buruk", tag: "O", isInput: 1}
        ,{"idx": 66, word: "sebagai", tag: "O", isInput: 1}
        ,{"idx": 67, word: "ganti", tag: "O", isInput: 1}
        ,{"idx": 68, word: "dari", tag: "O", isInput: 1}
        ,{"idx": 69, word: "sesuatu", tag: "O", isInput: 1}
        ,{"idx": 70, word: "yang", tag: "O", isInput: 1}
        ,{"idx": 71, word: "baik", tag: "O", isInput: 1}
        ,{"idx": 72, word: "?", tag: "O", isInput: 1}
        ,{"idx": 73, word: "Pergilah", tag: "O", isInput: 1}
        ,{"idx": 74, word: "ke", tag: "O", isInput: 1}
        ,{"idx": 75, word: "suatu", tag: "O", isInput: 1}
        ,{"idx": 76, word: "kota", tag: "O", isInput: 1}
        ,{"idx": 77, word: ".", tag: "O", isInput: 0}

    ]
    const [datas, setDatas] = useState(ds)
    
    const [isLoading, setIsLoading] = useState(true);   

    const [dtp, setDtp] = useState('')
    const pilih = (id) => {
        let n = datas && datas.find((it) => it.idx == id)
        setDtp(n)
    }
  return (
    // <div>DatasetComp</div>
    <div className="w-full py-8">
        <div className="flex flex-row">
            <div className="w-full lg:w-9/12">
                <div className="flex flex-col">

                    {isLoading ? `Please Wait Loading the data` : null}
                    <button onClick={()=>setDtp('')}>Clear Option</button>
                    <div className="flex flex-wrap">
                        {datas && datas.map((r, i) => (
                            <div key={i}
                            className={`${r.tag != 'O' ? `bg-orange-300` : ``} px-2 text-sm flex `}
                            >
                            <div className="relative cursor-pointer"
                                                        onClick={()=>pilih(r.idx)}

                            >
                                {r.word} {r.tag == 'O' ? null : r.tag}
                                {r.isInput ? 
                                <div className={`h-50 min-w-72 bg-red-400 absolute p-2 rounded-md right-0 ${dtp.idx == r.idx ? `visible z-50` : `invisible`} `}> 
                                <select
                                className="w-full"
                                >
                                    <option
                                    value="O"
                                    >No data</option>
                                    <option option="I-Messenger">I-Allah</option>
                                    <option option="B-Messenger">B-Messenger</option>
                                    <option>adta</option>
                                    <option>adta</option>
                                
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
    </div>
  )
}

export default DatasetComp