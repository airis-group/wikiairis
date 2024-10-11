import React from 'react'
import Swal from 'sweetalert2'
import { apiCred } from '../../../libs/connection'

const PernyataanValidator = ({assign}) => {
    const selesai = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, do it!"
          }).then((result) => {
            if (result.isConfirmed) {

                apiCred.get(`/airis/validator/assignment/done?id=${assign.id}`)
                .then((res) => {
                    // setDatas(res.data.data)
                })
                .catch((err) => {
                    console.log("err", err)
                })


              Swal.fire({
                title: "Success!",
                text: "Your file has been saved.",
                icon: "success"
              });

              window.location.reload()

            }
          });
    }
  return (
    <div>
        <button 
        onClick={()=>selesai(1)}
                            className='bg-red-600 text-white px-4 py-2 text-xs rounded-lg mt-4'
                            >Saya sudah selesai pada surah ini</button>

    </div>
  )
}

export default PernyataanValidator