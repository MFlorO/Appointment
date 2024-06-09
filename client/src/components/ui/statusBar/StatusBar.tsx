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
    <div className={`flex w-full h-[${HEIGHT_STATUS_BAR}] items-center justify-between ${bgColor} sm:px-[${PADDING_MOBILE}] lg:px-[${PADDING_DESKTOP}]`}>
      <div>
        { arrow && <IoIosArrowBack color='white' cursor='pointer' onClick={() => router.back()} /> }
      </div> 
      <p className="text-[16px] font-normal">{title}</p>
      <div>
        { menu && <IoMenu color="white" /> }
      </div>
    </div>
  )
}

export default StatusBar