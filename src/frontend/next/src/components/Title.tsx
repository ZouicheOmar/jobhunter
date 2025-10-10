import { useActionsStore } from "@/stores/useActions"

export const Title = () => {
  const goFirstPage = useActionsStore((state) => state.goFirstPage)

  return (
    < div className="border h-[120px] p-0 overflow-hidden relative rounded shadow-md flex align-middle " >
      <div className="z-0 w-full h-full absolute bg-[url(/shibuya.jpg)] bg-center mask-l-from-10% mask-l-to-70%">
      </div>
      <div
        onClick={() => goFirstPage()}
        className=" z-10 cursor-pointer p-6 flex flex-col justify-center">
        <p className="align-middle underline text-[#0b5394] text-4xl font-[Junicode] font-bold "> Jobhunter </p>
      </div>
    </div >
  )

