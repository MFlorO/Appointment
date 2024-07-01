"use client"
import { Fragment, useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa"; 

interface Props {
  id: string;
  name: string;
  value: string | number;
  type: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean; 
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputStyles = ({ id, name, value, type, placeholder, disabled = false, required = false, onChange }:Props) => {

  const [showPassword, setShowPassword] = useState(false)

  const bg = disabled ? '#b4b4b4' : '#C0C0C0'

  return (
    <div className={`relative flex items-center w-full h-[47px] rounded-[10px] bg-[${bg}] border-[1px] border-[#E7E7E7] hover:border-[#80ADB9] focus-within:border-[#80ADB9]`}>
      <input 
        id={id} 
        name={name} 
        value={value}
        type={type === 'password' ? showPassword ? 'text' : 'password' : type } 
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
        className="w-full h-full p-3 font-light text-[#808080] bg-transparent border-none placeholder:text-[14px] focus:outline-none" 
      />
      { (name === 'password') && 
        <Fragment>
          {
            showPassword
            ? <FaRegEyeSlash className="absolute right-3 text-[#808080] cursor-pointer hover:text-[#80ADB9]" onClick={() => setShowPassword(false)} />
            : <FaRegEye className="absolute right-3 text-[#808080] cursor-pointer hover:text-[#80ADB9]" onClick={() => setShowPassword(true)}/>
          }
        </Fragment>
      }
    </div>
  )
}

export default InputStyles