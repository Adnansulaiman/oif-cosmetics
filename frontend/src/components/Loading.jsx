const Loading = () => {
    return (
      <div className="absolute top-0 w-full h-full flex justify-center items-center bg-white">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-black animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  };
  
  export default Loading;
  