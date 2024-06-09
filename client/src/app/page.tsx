import { ButtonStyle } from "@/components";
import { PADDING_MOBILE, PADDING_DESKTOP } from "@/constants";

export default function Home() {
  return (
    <div className={`flex flex-col w-full h-screen items-center justify-between bg-gradient-to-b from-[#80ADB9] to-[#5D8793]`}>  
      <div className={`flex flex-col h-full w-screen items-center justify-between py-[180px] sm:px-[${PADDING_MOBILE}] lg:px-[${PADDING_DESKTOP}]`}>
        <p className="antialiased font-semibold- text-white text-[3em]">BIENVENIDO</p>
        <div className="flex flex-col w-full items-center justify-center gap-8 bg-red">
          <div className="w-full">
            <ButtonStyle text="Ingresar" colorText="text-[#5D8793]" bgColor="bg-[#fff]" borderColor="border-[#fff]" redirect onClick='/auth/login' />
          </div>
          <div className="w-full">
            <ButtonStyle text="Crear cuenta" colorText="text-[#fff]" bgColor="bg-[#5D8793]" borderColor="border-[#fff]" redirect onClick='/auth/register' />
          </div>
        </div>
      </div>
      <div className="flex h-5 text-[10px]">Creado by Florencia Oldani</div>
    </div>
  );
}
