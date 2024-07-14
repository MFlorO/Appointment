import Image from "next/image";
import { Appointments, AppointmentsToday } from "@/interfaces";
import { MdCalendarMonth } from "react-icons/md";
import { HiClock } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";

interface Props {
  array: Appointments[] | AppointmentsToday[]
}

const Turno = ({ array }:Props) => {
  return (
    <div className='flex flex-col w-full h-full'>
      {
        array?.map((item:any, index:number) => (
          <div className='flex flex-col w-full minH-[180px] h-full shadow-lg rounded-[10px] p-[20px] gap-4' key={index}>
              <div className="flex flex-row w-full items-center">
                <Image src='/no-foto.jpg' alt='imagen cuando no hay foto' width={40} height={40} className=' rounded-[90px]' />
                <p className="text-[#000]">Od. {item?.professional?.nombre} {item?.professional?.apellido}</p>
              </div>
            
              <div className='flex w-full h-[50px] bg-[#80ADB9] shadow-lg justify-center items-center rounded-[10px] p-[10px] gap-2'>
                { item?.fecha &&
                  <div className="flex flex-row items-center gap-1">
                    <MdCalendarMonth color='#fff'/>
                    <p className="text-[#fff] text-[13px] font-[300]">{item?.fecha}</p>
                  </div>
                }
                { item?.hora &&
                  <div className="flex flex-row items-center gap-1">
                    <HiClock color='#fff'/>
                    <p className="text-[#fff] text-[13px] font-[300]">{item?.hora}hs</p>
                  </div>
                }
                <div className="flex flex-row items-center gap-1">
                  <IoLocationSharp color='#fff'/>
                  <p className="text-[#fff] text-[13px] font-[300]">Colon 2505</p>
                </div>
              </div>

              <div className='flex w-full justify-center items-center gap-2'>
                <button className="w-[120px] h-[28px] text-[#80ADB9] text-[14px] rounded-[10px] border-[#80ADB9] border-solid border-2 cursor-pointer">Cancelar</button>
                <button className="w-[120px] h-[28px] text-[#fff] text-[14px] rounded-[10px] bg-[#80ADB9] cursor-pointer">Reprogramar</button>
              </div>
          </div>
        ))
      }
    </div>
  )
}

export default Turno;