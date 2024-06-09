"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ButtonForm, InputStyles, StatusBar } from "@/components";
import { login } from "@/lib/api";
import { PADDING_MOBILE, PADDING_DESKTOP } from '@/constants'

export default function Register() {

  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      // Guardar el token en localStorage
      localStorage.setItem('token-appointment-app', data.token);

      // Redirigir a la página principal o a la que desees
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unknown error');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen h-max w-full items-center bg-white">

      <StatusBar title="Crear cuenta" menu={false} />

      <div className={`flex w-full h-full flex-col justify-center pt-[2%] sm:px-[${PADDING_MOBILE}] lg:px-[${PADDING_DESKTOP}]`}>

        <div className="w-full mt-14">
          <form className="flex flex-col w-full gap-6" action="#" method="POST">

            <div className='flex gap-4'>
              <InputStyles id='Nombre' name="Nombre" type='Nombre' placeholder='Escriba su Nombre' required />
              <InputStyles id='Apellido' name="Apellido" type='Apellido' placeholder='Escriba su Apellido' required  />
            </div>

            <div className='flex gap-4'>
              <InputStyles id='dni' name="dni" type='dni' placeholder='Escriba su DNI' required />
              <InputStyles id='direccion' name="direccion" type='direccion' placeholder='Escriba su Dirección' required />
            </div>

            <div className='flex flex-col justify-center gap-4'>
              <p className='text-[15px] font-normal text-[#808080]'>¿Tienes obra social?</p>
              <div className='flex align-center gap-4'>
                <div className='flex items-center gap-2'>
                  <label for="si" className='text-[15px] font-normal text-[#808080]'>Sí</label>
                  <input type='radio' name='si' />
                </div>
                <div className='flex items-center gap-2'>
                  <label for="No" className='text-[15px] font-normal text-[#808080]'>No</label>
                  <input type='radio' name='No' />
                </div>
              </div>
              {/* SI SE SELECCIONA SI */}
              <div className='flex flex-col align-center gap-4'>
                <InputStyles id='nombreos' name="nombreos" type='nombreos' placeholder='Escriba el nombre de su obra social' required />
                <InputStyles id='numeroafiliado' name="numeroafiliado" type='numeroafiliado' placeholder='Escriba el numero de afiliación' required />
                <InputStyles id='planos' name="planos" type='planos' placeholder='Escriba el plan' required />
              </div>
            </div>

            <InputStyles id='email' name="email" type='email' placeholder='Escriba su email' required />

            <InputStyles id='password' name="password" type='password' placeholder='Escriba su password' required />

            <ButtonForm text="Crear cuenta" colorText="text-[#fff]" bgColor="bg-[#80ADB9]" borderColor="border-[#80ADB9]" />
            
          </form>

          <p className="flex items-center justify-center text-[13px] font-light text-[#ACACAC] mt-[30px] gap-1">
            Ya tienes una cuenta?
            <a href="/" className="font-semibold leading-6 text-[#5D8793] hover:text-[#80ADB9]">Ingresa aquí.</a>
          </p>
          </div>
      </div>

    </div>
  );
}



//  <form onSubmit={handleSubmit} className="flex flex-col items-center justify-between ">
//    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//   <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//    <button type="submit">crear cuenta</button>
//   {error && <p style={{ color: 'red' }}>{error}</p>}  
//  </form> 