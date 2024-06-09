
interface Props {
  text: string;
  bgColor: string;
  colorText: string;
  borderColor: string;
}

const ButtonForm = ({ text, bgColor, colorText, borderColor }:Props) => {

  const onHandleClick = () => {

  }

  return (
    <div 
    className={`w-full h-[40px] ${bgColor} ${colorText} border-2 ${borderColor} flex items-center justify-center rounded-[10px] p-4 cursor-pointer mt-[15px]`} 
    onClick={onHandleClick}
    type="submit"
    as='button'
    >{text}</div>
  )
}

export default ButtonForm