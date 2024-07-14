import Image from "next/image";
import Link from "next/link";
import { LoadingBar } from "@/components/ui";
import { HealthInsurance } from "@/interfaces";

interface Props {
  nombre?: string | undefined
  apellido?: string | undefined
  dni?: string | undefined
  healthInsurance?: HealthInsurance | undefined
}

const DatosPersonales = ({ nombre, apellido, dni, healthInsurance }:Props) => {
  return (
    <div className='flex flex-col w-full minH-[180px] h-full shadow-lg rounded-[10px]'>
      <div className="flex flex-row w-full p-[20px]">
        <div className="flex w-[122px] items-center">
          <Image src='/no-foto.jpg' alt='imagen cuando no hay foto' width={122} height={122} className=' rounded-[10px]' />
        </div>
        <div className="flex flex-col h-full justify-between gap-1">
          {
            (nombre || apellido) 
            ? <p className='text-[#80ADB9] text-[20px] font-[500] mb-1'>{nombre} {apellido}</p>
            : <LoadingBar />
          }
          <div className="flex flex-col justify-center gap-1"> 
            {
              dni
              ? <p className='text-black text-[12px]'>Dni. {dni}</p>
              : <LoadingBar />
            }
            <div className='flex flex-col gap-1'>
              {
                healthInsurance?.obraSocialName 
                ? <p className='text-black text-[12px]'>{healthInsurance?.obraSocialName}</p>
                : <LoadingBar />
              }
              {
                healthInsurance?.plan 
                ? <p className='text-black text-[12px]'>Plan. {healthInsurance?.plan}</p>
                : <LoadingBar />
              }
            </div>
              {
                healthInsurance?.numeroAfiliado 
                ? <p className='text-black text-[12px]'>Nro Afiliado: {healthInsurance?.numeroAfiliado}</p>
                : <LoadingBar />
              }
          </div>
          <Link href='' className='text-[#80ADB9] text-[12px] underline justify-self-end mt-1'>cambiar contraseña</Link>
        </div>
      </div>

      <div className="flex w-full pb-[20px] pr-[15px] justify-end">
        <Link href='' className='text-[#80ADB9] text-[12px] font-[600]'>Ver más</Link>
      </div>
    </div>
  )
}

export default DatosPersonales