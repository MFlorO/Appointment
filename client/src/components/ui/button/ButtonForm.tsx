
  interface Props {
    text: string;
    bgColor: string;
    colorText: string;
    borderColor: string;
  }

  const ButtonForm = ({ text, bgColor, colorText, borderColor }:Props) => {
    return (
      <button className={`w-full h-[50px] ${bgColor} ${colorText} border-2 ${borderColor} flex items-center justify-center rounded-[10px] p-4 cursor-pointer mt-[15px] 
      transition-opacity duration-300 delay-150 hover:opacity-90
      `} 
      type="submit"
      >{text}</button>
    )
  }

  export default ButtonForm