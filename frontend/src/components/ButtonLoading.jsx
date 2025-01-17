import React from "react";

const ButtonLoading = ({color='black',size='4'}) => {
  return (
    <div className="flex justify-center items-center">
      <div className={`w-${size} h-${size} border-4 border-t-black border-gray-400 rounded-full animate-spin`}></div>
    </div>
  );
};

export default ButtonLoading;
