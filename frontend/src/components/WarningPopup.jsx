import React from "react";

const WarningPopup = ({text,setWarningOpen,button,handleAction,id}) => {
  return (
    <div className="flex flex-col px-10 py-7 w-1/4 rounded-lg bg-white shadow-lg absolute z-50 top-64 left-[550px]">
      <h1 className="text-xl font-semibold mb-7">
        {text}
      </h1>
      <div className="flex gap-5 ">
        <button onClick={()=> setWarningOpen(false)} className="border w-full p-2 rounded-md border-black">Cancel</button>
        <button onClick={async()=> {
            await handleAction(id)
            setWarningOpen(false)
            }} className="bg-red-500 p-2 rounded-md text-white w-full">{button}</button>
      </div>
    </div>
  );
};

export default WarningPopup;
