import {useEffect, useState} from 'react'
import { apiCred } from '../../../../libs/connection'
import { toastSuccess } from '../../../../data/airis';

const ValidasiLabel = () => {
    const [rld, setRld] = useState(false)
    const  [vlab, setVlab] = useState([])
    const [val, setVal] = useState([])
    const getDatas  = async () => {
        apiCred.get('/airis/validator/perposed/label')
        .then((res) => {
            // console.log("res", res.data.data)
            setVlab(res.data.data.allEntitas)
            setVal(res.data.data.validator)
        })
        .catch((err) => {
            console.log("err", err)
        })
    }
    useEffect(() => {
        getDatas()
    }, [rld])
    const ElStatus = (elid, status) => {
        let data = {
            elid, status
        }
        apiCred.post('/airis/validator/perposed/label/status', data)
        .then((res) => {
            console.log("res", res)
            // setVlab(res.data.data)
            toastSuccess()
            setRld(!rld)

        })
        .catch((err) => {
            console.log("err", err)
        })
    }
    const filterValStatus = (elid) => {
        let n = val && val.find((it) => it.entitas_label_id === elid)
        if(n){
            return <span className={`text-xs text-white rounded-full px-3 capitalize py-1 ${n.status === 'approve' ? `bg-emerald-400` : `bg-red-400`}`}>{n.status}</span>
        }
    }

    return (
    <div className='wrapper w-full flex flex-col gap-4'>
        <h2 className='text-3xl font-bold text-slate-400'>
        Validate New Perposed Label Entity
            
        </h2>
        <div className='w-full'>
        <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left  text-gray-500">
        <thead className="text-xs text-white bg-gray-600 uppercase ">
            <tr>
          
                <th scope="col" className="px-6 py-3">
                    ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Label
                </th>
                <th scope="col" className="px-6 py-3">
                    My Statement
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {vlab && vlab.map((r, i) => (
            <tr key={i} className='px-4 py-4'>
        
                <td scope="row" className="px-6 py-4 ">
                    {r.id}
                </td>
                <td className="px-6 py-4">
                    {r.name}
                </td>
                <td className="px-6 py-4">
                    {r.label}
                </td>
         
                <td className="px-6 py-4">
                    {filterValStatus(r.id)}
                </td>
                <td className="px-6 py-4 space-x-2">
                    <button className='bg-emerald-400 px-2 py-1 rounded-full text-xs text-white' onClick={()=>ElStatus(r.id, 'approve')}>Approve</button>
                    <button className='bg-red-400 px-2 py-1 rounded-full text-xs text-white' onClick={()=>ElStatus(r.id, 'reject')}>Reject</button>
                </td>
            </tr>

            ))}
        </tbody>
    </table>
</div>
        </div>
    </div>
  )
}

export default ValidasiLabel