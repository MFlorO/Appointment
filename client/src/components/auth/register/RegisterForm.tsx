"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ButtonForm, InputStyles } from "@/components";
import { getObrasSociales, register } from "@/lib/api";
import { FormDataRegister } from "@/interfaces/form";
import { validateForm } from "@/functions";



const RegisterForm = () => {

  const router = useRouter();
  const [formData, setFormData] = useState<FormDataRegister>({
    nombre: '',
    apellido: '',
    dni: '',
    domicilio: '',
    email: '',
    area: '',
    telefono: '',
    password: '',
    obraSocialId: 0,
    numeroAfiliado: '',
    plan: '',
  });
  const [error, setError] = useState<null | string>(null);
  const [isObraSocial, setIsObraSocial] = useState<string>('false')
  const [selectedObraSocial, setSelectedObraSocial] = useState<any[]>([])

  //* Hago la carga inicial de las obras sociales
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await getObrasSociales();
        setSelectedObraSocial(response);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error');
        }
        setTimeout(() => setError(null), 5000);
      }
    }
    fetchData();

  }, [])


  
  const handleRadioChange = (event:React.ChangeEvent<HTMLInputElement>) => setIsObraSocial(event.target.value);

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

    const { nombre, apellido, dni, domicilio, email, area, telefono, password, obraSocialId, numeroAfiliado, plan } = formData;

    //*Manejo de errores una vez mandado el form.
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const error = validateForm(key as keyof FormDataRegister, formData[key as keyof FormDataRegister]);
        if (error) {
          setError(error);
          return;
        }
      }
    }
    
    try {
      
      const response = await register(nombre, apellido, dni, domicilio, email, area, telefono, password, isObraSocial, obraSocialId, numeroAfiliado, plan);

      // Guardar el token en localStorage
      // localStorage.setItem('token-appointment-app', response.token);

      //setear el formulario
      setFormData({
        nombre: '',
        apellido: '',
        dni: '',
        domicilio: '',
        email: '',
        area: '',
        telefono: '',
        password: '',
        obraSocialId: 0,
        numeroAfiliado: '',
        plan: ''
      })

      // Redirigir a la página principal o a la que desees
      router.push('/');
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

    <div className='flex gap-4'>
      <InputStyles id='nombre' name="nombre" value={formData.nombre} type='text' placeholder='Nombre' required onChange={handleInputChange} />
      <InputStyles id='apellido' name="apellido" value={formData.apellido} type='text' placeholder='Apellido' required  onChange={handleInputChange}/>
    </div>

    <div className='flex gap-4'>
      <InputStyles id='domicilio' name="domicilio" value={formData.domicilio} type='text' placeholder='Dirección' required onChange={handleInputChange} />
    </div>

    <div className='flex gap-4'>
      <InputStyles id='dni' name="dni" value={formData.dni} type='text' placeholder='DNI. Sin puntos ni guiones. Ej: 38400521' required onChange={handleInputChange}/>
      <InputStyles id='email' name="email" value={formData.email} type='email' placeholder='Email' required onChange={handleInputChange} />
    </div>

    <div className='flex gap-4'>
      <InputStyles id='area' name="area" value={formData.area} type='text' placeholder='Prefijo de área. Ej: 351' required onChange={handleInputChange} />
      <InputStyles id='telefono' name="telefono" value={formData.telefono} type='text' placeholder='Teléfono CON el 15. Ej: 152...' required onChange={handleInputChange}/>
    </div>

    <div className='flex flex-col justify-center gap-4'>
      <p className='text-[15px] font-normal text-[#808080]'>¿Tienes obra social?</p>
      <div className='flex align-center gap-4'>
        <div className='flex items-center gap-2'>
          <label htmlFor="si" className='text-[15px] font-normal text-[#808080]'>Sí</label>
          <input type='radio' name='obraSocial' value='true' onChange={handleRadioChange} />
        </div>
        <div className='flex items-center gap-2'>
          <label htmlFor="No" className='text-[15px] font-normal text-[#808080]'>No</label>
          <input type='radio' name='obraSocial' value='false' onChange={handleRadioChange} />
        </div>
      </div>

      {/* SI SE SELECCIONA SI */}
      { 
        isObraSocial === 'true' &&
        <div className='flex flex-row align-center gap-4 animate__animated animate__fadeIn animate__faster px-[10px]'>
          <select
            id='obraSocialId' 
            name='obraSocialId'
            value={formData.obraSocialId}
            onChange={handleInputChange}
            className='w-full h-[47px] p-3 font-light text-[#808080] rounded-[10px] bg-[#EFF0F2] border-[1px] border-[#E7E7E7] hover:border-[#80ADB9] focus-within:border-[#80ADB9]'
          >
            <option value={0}>Selecciona una obra social</option>
            {selectedObraSocial?.map((obraSocial:any) => (
              <option key={obraSocial.id} value={obraSocial.id}>{obraSocial.nombre}</option>
            ))}

          </select>
          <InputStyles id='numeroAfiliado' name="numeroAfiliado" value={formData.numeroAfiliado} type='text' placeholder='Número de afiliación' required 
          onChange={handleInputChange} disabled={formData?.obraSocialId === 0 ? true : false}
          />
          <InputStyles id='plan' name="plan" value={formData.plan} type='text' placeholder='Plan de Obra Social' required 
          onChange={handleInputChange} disabled={formData?.obraSocialId === 0 ? true : false}
          />
        </div>
      }
      
    </div>

    <InputStyles id='password' name="password" value={formData.password} type='password' placeholder='Password' required onChange={handleInputChange} />

    {/* MENSAJES DE ERROR */}
    { error && <div className={`font-regular relative block w-full rounded-lg bg-pink-500 p-4 text-base leading-5 text-white opacity-100`}>{error}</div>}

    {/* BOTON SUBMIT */}
    <ButtonForm text="Crear cuenta" colorText="text-[#fff]" bgColor="bg-[#80ADB9]" borderColor="border-[#80ADB9]" />
    
  </form>
  )
}

export default RegisterForm;