import React from "react";

const ProfileInput = ({label,type,name,value}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="" className="text-base font-semibold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="border border-black p-2 rounded-lg"
      />
    </div>
  );
};

export default ProfileInput;
