
export const SkeletonLoader = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex-shrink-0 bg-gray-200 rounded-lg shadow-lg mr-8 animate-pulse h-full">
        <div className="w-[275px] h-[275px] bg-gray-300 rounded-full m-8 p-8"></div>

        <div className="w-[129px] h-[32px] bg-gray-300 rounded-full my-4 mx-auto"></div>
        <div className="w-[129px] h-[32px] bg-gray-300 rounded-full my-4 mx-auto"></div>

        <div className="w-[80%] h-[24px] bg-gray-300 rounded-full my-4 mx-auto"></div>
        <div className="w-[60%] h-[21px] bg-gray-300 rounded-full my-2 mx-auto"></div>
    </div>

      <div className="flex-grow bg-gray-200 rounded-lg shadow-lg animate-pulse h-full">
        <div className="w-[183px] h-[32px] bg-gray-300 rounded-full mt-4 mb-20 mx-auto"></div>

        <div className="w-[80%] h-[30px] bg-gray-300 rounded-full my-3 mx-auto"></div>
        <div className="flex flex-row gap-5 px-[10%]">
          <div className="w-[50%] h-[30px] bg-gray-300 rounded-full my-3"></div>
          <div className="w-[50%] h-[30px] bg-gray-300 rounded-full my-3"></div>
        </div>
        <div className="flex flex-row gap-5 px-[10%]">
          <div className="w-[50%] h-[30px] bg-gray-300 rounded-full my-3"></div>
          <div className="w-[50%] h-[30px] bg-gray-300 rounded-full my-3"></div>
        </div>
        <div className="flex flex-row gap-5 px-[10%]">
          <div className="w-[50%] h-[30px] bg-gray-300 rounded-full my-3"></div>
          <div className="w-[50%] h-[30px] bg-gray-300 rounded-full my-3"></div>
        </div>        
        <div className="w-[80%] h-[30px] bg-gray-300 rounded-full my-3 mx-auto"></div>
        <div className="w-[250px] h-[32px] bg-gray-300 rounded-full mt-20 mb-0 mx-auto"></div>
        <div className="w-[250px] h-[32px] bg-gray-300 rounded-full mt-3 mb-2 mx-auto"></div>

      </div>
    </div>
  );
};

