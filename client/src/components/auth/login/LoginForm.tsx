"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ButtonForm, InputStyles } from "@/components";
import { login } from "@/lib/api";
import { FormDataLogin } from "@/interfaces/form";
import { validateForm } from "@/functions";


const LoginForm = () => {

  const router = useRouter();
  const [formData, setFormData] = useState<FormDataLogin>({
    dni: '',
    password: '',
  });
  const [error, setError] = useState<null | string>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {

    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    })

    //*Manejo de errores en tiempo real.
    const resultErrors = validateForm(name, value);
    setError(resultErrors);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { dni, password } = formData;

    //*Manejo de errores una vez mandado el form.
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const error = validateForm(key as keyof FormDataLogin, formData[key as keyof FormDataLogin]);
        if (error) {
          setError(error);
          return;
        }
      }
    }
    
    try {
      
      const response = await login(dni, password);
      console.log('response-handleSubmit: ', response)

      // Guardar el token en localStorage
      localStorage.setItem('token-appointment-app', response.token);

      //setear el formulario
      setFormData({
        dni: '',
        password: '',
      })

      // Redirigir a la página principal o a la que desees
      router.push('/app');

    } catch (error) {
      console.log('error-onSubmit-register: ',error)
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unknown error');
        setTimeout(() => setError(null), 5000);
      }
    }
  };

  return (
    <form className="flex flex-col w-full gap-6" onSubmit={handleSubmit}>
      <InputStyles id='dni' name="dni" value={formData.dni} type='text' placeholder='DNI. Sin puntos ni guiones. Ej: 38400521' required onChange={handleInputChange}/>
      <InputStyles id='password' name="password" value={formData.password} type='password' placeholder='Password' required onChange={handleInputChange} />

      {/* MENSAJES DE ERROR */}
      { error && <div className={`font-regular relative block w-full rounded-lg bg-pink-500 p-4 text-base leading-5 text-white opacity-100`}>{error}</div>}

      {/* BOTON SUBMIT */}
      <ButtonForm text="Ingresar" colorText="text-[#fff]" bgColor="bg-[#80ADB9]" borderColor="border-[#80ADB9]" />
    </form>
  )
}

export default LoginForm;