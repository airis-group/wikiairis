import React from 'react'

const InfoStore = () => {
  return (
    <div className="bg-red-600 p-4 rounded-md text-sm text-white">
    <h1>Catatan : </h1>
    <ul>
        <li>1. Sistem akan melakukan updated data entitas pada dataset secara otomatis saat anda mengganti Page Data</li>
        <li>2. Anda dapat melihat data / Log perubahan sebelum update dataset pada bagian List Perubahan pada kolom bawah ini</li>
    </ul>
</div>
  )
}

export default InfoStore