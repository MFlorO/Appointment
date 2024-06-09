"use client"
import { useRouter } from "next/navigation"

interface Props {
  text: string;
  bgColor: string;
  colorText: string;
  borderColor: string;
  redirect?: boolean; //Me define si el boton redirecciona a algun lado
  action ?: boolean; //Me define si el boton genera una acción
  onClick: string;
}

const ButtonStyle = ({ text, bgColor, colorText, borderColor, redirect = false, action = false, onClick }:Props) => {

  const router = useRouter()

  const onHandleClick = () => {

    if(action){
      action
    }

    if(redirect){
      router.push(onClick)
    }

  }

  return (
    <div 
    className={`w-full h-[55px] ${bgColor} ${colorText} border-2 ${borderColor} text-[1.2em] flex items-center justify-center font-light rounded-[90px] p-4 cursor-pointer`} 
    onClick={onHandleClick}
    as='button'
    >{text}</div>
  )
}

export default ButtonStyle