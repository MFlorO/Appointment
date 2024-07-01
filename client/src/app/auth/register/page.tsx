import { RegisterForm, StatusBar } from "@/components";
import { PADDING_DESKTOP, PADDING_MOBILE } from "@/constants";

export default function Register() {
  return (
    <div className="flex flex-col min-h-screen h-max w-full items-center bg-white">
      <StatusBar title="Crear cuenta" menu={false} />
      <div className={`flex w-full h-full flex-col justify-center px-[${PADDING_MOBILE}] lg:px-[${PADDING_DESKTOP}]`}>
        <div className="w-full my-10">
          <RegisterForm />
          <p className="flex items-center justify-center text-[13px] font-light text-[#ACACAC] mt-[30px] gap-1">
            Ya tienes una cuenta?
            <a href="/" className="font-semibold leading-6 text-[#5D8793] hover:text-[#80ADB9]">Ingresa aquí.</a>
          </p>
          </div>
      </div>
    </div>
  );
}

