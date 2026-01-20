import localFont from "next/font/local";
import Link from "next/link";

const Junicode = localFont({
  src: "../../../public/junicode-bold-webfont.ttf",
});

export const Title = () => {
  return (
    <>
      <div className="hidden sm:block border bg-white w-full md:h-[120px] p-0 overflow-hidden relative rounded-3xl shadow flex align-middle ">
        <div className="z-0 w-full h-full absolute bg-[url(/shibuya.jpg)] bg-center mask-l-from-10% mask-l-to-70%"></div>
        <div className=" z-10 cursor-pointer p-6 py-4 md:p-6 flex flex-col justify-center">
          <p
            className={`my-2 underline text-[#0b5394] text-4xl ${Junicode.className} font-bold`}
          >
            <Link href="/"> Jobhunter </Link>
          </p>
        </div>
      </div>
      <div className="sm:hidden bg-white w-full md:h-[120px] p-0 overflow-hidden relative shadow flex align-middle ">
        <div className="z-0 w-full h-full absolute bg-[url(/shibuya.jpg)] bg-center mask-l-from-10% mask-l-to-70%"></div>
        <div className=" z-10 cursor-pointer p-6 py-4 md:p-6 flex flex-col justify-center">
          <p
            className={`my-2 underline text-[#0b5394] text-4xl ${Junicode.className} font-bold`}
          >
            <Link href="/"> Jobhunter </Link>
          </p>
        </div>
      </div>
    </>
  );
};
