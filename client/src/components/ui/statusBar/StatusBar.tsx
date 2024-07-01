"use client"
import { useRouter } from "next/navigation";
import { HEIGHT_STATUS_BAR, PADDING_DESKTOP, PADDING_MOBILE } from "@/constants";
import { IoIosArrowBack } from "react-icons/io";
import { IoMenu } from "react-icons/io5";


interface Props {
  bgColor?: string;
  title: string;
  arrow?: boolean;
  menu?: boolean;
}


const StatusBar = ({ bgColor = "bg-[#80ADB9]", title, arrow=true, menu=true }:Props) => {

  const router = useRouter()

  return (
    <div className={`flex w-full h-[${HEIGHT_STATUS_BAR}] items-center justify-center ${bgColor} px-[${PADDING_MOBILE}] md:px-[${PADDING_DESKTOP}]`}>
      <div className={`absolute left-[${PADDING_MOBILE}] md:left-[${PADDING_DESKTOP}]`}>
        { arrow && <IoIosArrowBack color='white' cursor='pointer' onClick={() => router.back()} /> }
      </div> 
      <p className="text-[16px] font-normal">{title}</p>
      <div className={`absolute right-[${PADDING_MOBILE}] md:right-[${PADDING_DESKTOP}]`}>
        { menu && <IoMenu color="white" /> }
      </div>
    </div>
  )
}

export default StatusBar