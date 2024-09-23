import React from 'react'

const ChangeLanguage = () => {
    const handleChange = (e) => {
        // alert(e.target.value)
        localStorage.setItem("lang", e.target.value);
    }
    const lang = localStorage.getItem("lang");
    // console.log("lang", lang)
  return (
    <select className='text-xs'
    onChange={(e)=>handleChange(e)}
    defaultValue={lang}
    >
        <option>Language</option>
        <option value='ind'>ID</option>
        <option value='eng'>EN</option>
    </select>
  )
}

export default ChangeLanguage