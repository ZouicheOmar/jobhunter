export const TopInfo = () => {
  return <>
    <div className="flex justify-start flex-wrap gap-2">
      <div
        className="p-2 text-xs border rounded shadow flex flex-col gap-[2px] w-1/3" >
        <p className="text-sm font-normal">Stats</p>
        <div className="flex w-full items-center">
          <span className="p-[2px] w-1/2"> Total   </span>
          <span className="p-[2px] w-1/2"> 110 </span>
        </div>
        <div className=" flex w-full items-center ">
          <span className="p-[2px] w-1/2"> Today  </span>
          <div className="p-[2px] w-1/2  flex items-center relative ">
            <span className="w-1/2 z-10"> 5/30  </span>
            <span className="z-10 w-1/2 text-end"> 15% </span>
            <div className="absolute top-0 left-0 h-full rounded-xs w-[15%] bg-red-400 opacity-50 z-0"></div>
          </div>
        </div>
        <div className="flex w-full items-center">
          <span className="p-[2px] w-1/2"> CDI  </span>
          <div className="p-[2px] w-1/2 flex items-center relative">
            <span className="z-10 w-1/2"> 50  </span>
            <span className="z-10 w-1/2 text-end"> 45% </span>
            <div className="absolute top-0 left-0 h-full rounded-xs w-[45%] bg-gray-400 opacity-50 z-0"></div>
          </div>
        </div>
        <div className="flex w-full items-center ">
          <span className="p-[2px] w-1/2"> Internship </span>
          <div className="p-[2px] w-1/2  flex items-center relative ">
            <span className="w-1/2 z-10"> 60  </span>
            <span className="z-10 w-1/2 text-end"> 55% </span>
            <div className="absolute top-0 left-0 h-full rounded-xs w-[55%] bg-gray-400 opacity-50 z-0"></div>
          </div>
        </div>
      </div>
      <div
        className="p-2 text-xs border rounded shadow flex flex-col gap-[2px] w-1/4 h-fit" >
        <p className="text-sm font-normal">Cities</p>
        <div className=" flex w-full items-center ">
          <span className="p-[2px] w-1/2"> Paris  </span>
          <div className="p-[2px] w-1/2  flex items-center relative ">
            <span className="w-1/2 z-10"> 5  </span>
            <span className="z-10 w-1/2 text-end"> 15% </span>
            <div className="absolute top-0 left-0 h-full rounded-xs w-[15%] bg-gray-400 opacity-50 z-0"></div>
          </div>
        </div>
        <div className="flex w-full items-center">
          <span className="p-[2px] w-1/2"> Toulouse  </span>
          <div className="p-[2px] w-1/2 flex items-center relative">
            <span className="z-10 w-1/2"> 50  </span>
            <span className="z-10 w-1/2 text-end"> 45% </span>
            <div className="absolute top-0 left-0 h-full rounded-xs w-[45%] bg-gray-400 opacity-50 z-0"></div>
          </div>
        </div>
        <div className="flex w-full items-center ">
          <span className="p-[2px] w-1/2"> Marseille </span>
          <div className="p-[2px] w-1/2  flex items-center relative ">
            <span className="w-1/2 z-10"> 60  </span>
            <span className="z-10 w-1/2 text-end"> 55% </span>
            <div className="absolute top-0 left-0 h-full rounded-xs w-[55%] bg-gray-400 opacity-50 z-0"></div>
          </div>
        </div>
      </div>
      <div
        className="p-2 text-xs border rounded shadow flex flex-col gap-[2px] w-1/4 h-fit" >
        <p className="text-sm font-normal">Techs</p>
        <div className="flex w-full items-center">
          <span className="p-[2px] w-1/2"> Java  </span>
          <div className="p-[2px] w-1/2 flex items-center relative">
            <span className="z-10 w-1/2"> 50  </span>
            <span className="z-10 w-1/2 text-end"> 45% </span>
            <div className="absolute top-0 left-0 h-full rounded-xs w-[45%] bg-gray-400 opacity-50 z-0"></div>
          </div>
        </div>
        <div className="flex w-full items-center ">
          <span className="p-[2px] w-1/2"> Python </span>
          <div className="p-[2px] w-1/2  flex items-center relative ">
            <span className="w-1/2 z-10"> 60  </span>
            <span className="z-10 w-1/2 text-end"> 55% </span>
            <div className="absolute top-0 left-0 h-full rounded-xs w-[55%] bg-gray-400 opacity-50 z-0"></div>
          </div>
        </div>
        <div className=" flex w-full items-center ">
          <span className="p-[2px] w-1/2"> React  </span>
          <div className="p-[2px] w-1/2  flex items-center relative ">
            <span className="w-1/2 z-10"> 5  </span>
            <span className="z-10 w-1/2 text-end"> 15% </span>
            <div className="absolute top-0 left-0 h-full rounded-xs w-[15%] bg-gray-400 opacity-50 z-0"></div>
          </div>
        </div>
      </div>
    </div>
  </>

}
