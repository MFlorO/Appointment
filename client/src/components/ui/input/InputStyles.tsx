
interface Props {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  onChange?: () => void;
}

const InputStyles = ({ id, name, type, placeholder, required = false, onChange }:Props) => {
  return (
    <input 
    id={id} 
    name={name} 
    type={type} 
    placeholder={placeholder}
    required={required}
    onChange={onChange}
    className="flex w-full h-[47px] rounded-[10px] bg-[#EFF0F2] border-[1px] border-[#E7E7E7] p-3 font-light text-[#808080] placeholder:text-[14px] hover:border-[#80ADB9] focus:border-[#80ADB9]" 
    />
  )
}

export default InputStyles