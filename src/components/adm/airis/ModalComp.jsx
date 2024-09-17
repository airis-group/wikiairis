import React from "react";

const ModalComp = ({ isVisible, onClose, title, children }) => {
  if (!isVisible) return null;
  const handleClose = (e) => {
    if (e.target.id === "wraper") onClose();
  };
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center ease-in-out duration-500 ${isVisible ? `` : ``}`}
        onClick={(e) => handleClose(e)}
        id="wraper"
      >
        <div className="w-full  max-w-7xl py-4 px-4 rounded-md flex flex-col">
          <button
            className="mb-4 text-white place-self-end bg-red-400 px-4 py-1 rounded-md text-xs"
            onClick={() => onClose()}
          >
            Close ?
          </button>
          <div className="bg-white px-4 py-4 rounded-md">
            <div className="py-4 text-xl font-bold text-indigo-400">
              {title}
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalComp;