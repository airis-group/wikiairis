import React, { useState } from "react";

const TopNavMenu = () => {
      // State to handle the visibility of the submenu
  const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
  const userDetail = JSON.parse(localStorage.getItem("data") || "")

  const handleMouseEnter = () => {
    setIsSubmenuVisible(true);
  };

  const handleMouseLeave = () => {
    setIsSubmenuVisible(false);
  };

    const menu = [
        {
            title : 'Airis',
            level : "admin",
            path : "/adm/airis"
        },
        {
            title : 'Dataset',
            level : "user",
            path : "/u/dataset"
        },
        {
            title : 'Validator',
            level : "validator",
            path : "/u/validator"
        },
    ]
    
    
    
    let level = userDetail.role
    
    let menuUsr = menu && menu.filter(it => it.level === level)
  return (
    <div className="relative inline-block text-left z-50">
      {/* Main Menu Item */}
      <div
        onMouseEnter={handleMouseEnter}
      >
        {level}
      </div>

      {/* Submenu */}
      {isSubmenuVisible && (
        <div
        onMouseLeave={handleMouseLeave}

          className="absolute text-xs left-0 mt-2 bg-white shadow-lg rounded-lg w-48 transition-all duration-300 ease-in-out transform opacity-100 translate-y-0"
        >
            <div className="px-4 py-2 mt-3 text-slate-500">Group User</div>
          {menuUsr.map((r, i) => (
            <a
                key={i}
                href={r.path}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-200"
                >
                {r.title}
            </a>

          ))}
            <div className="px-4 py-2 mt-3 text-slate-500">System</div>

          <a
            href="#"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-200"
          >
            Account 
            <span className="text-[10px] font-extralight text-white bg-purple-500 px-4 py-1 rounded-2xl">Beta</span>
          </a>
        </div>
      )}
    </div>
  )
}

export default TopNavMenu