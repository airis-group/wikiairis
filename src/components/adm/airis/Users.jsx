import { useEffect, useState } from 'react'
import { apiCred } from '../../../libs/connection'
import ModalComp from './ModalComp'
import Add from './users/Add'

const Users = () => {
  const [datas, setDatas] = useState([])
  const getDatas = async () => {
    await apiCred.get('/adm/users')
      .then((res) => {
        // console.log(res.data)
        setDatas(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getDatas()
  }, [])
  let userAiris = datas && datas.filter((it) => it.email != 'erna@erna.com')

  const [dtp, setDtp] = useState('')
  const [modal, setModal] = useState(false);
  const addNew = () => {
    setModal(true)
    setDtp('')
  }

  const edit = (id) => {
    let n = datas.find(it => it.id == id)
    setDtp(n)
    setModal(true)
  }
  return (
    <div className='flex flex-col gap-4'>

      <div className='flex flex-row items-center justify-between'>
        <span>Users Airis</span>
        <button
        onClick={()=>addNew()}
        >Add New</button>
      </div>



      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left  text-gray-500">
          <thead className="text-xs text-white bg-gray-600 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userAiris && userAiris.map((r, i) => (
              <tr key={i}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {r.id}
                </th>
                <td className="px-6 py-4">
                  {r.name}
                </td>
                <td className="px-6 py-4">
                  {r.email}
                </td>
                <td className="px-6 py-4">
                  {r.role}
                </td>
                <td>

                  <button
                  onClick={()=>edit(r.id)}
                  >E</button>
                  <button>D</button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>

      <ModalComp
        title="Modal User Add / Update"
        isVisible={modal}
        onClose={() => setModal(false)}
      >
        <Add dtp={dtp} />
      </ModalComp>

    </div>
  )
}

export default Users