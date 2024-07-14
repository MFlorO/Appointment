import { StatusBar, LoginForm } from "@/components";
import { PADDING_DESKTOP, PADDING_MOBILE } from "@/constants";

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen h-max w-full items-center bg-white">
      <StatusBar title="Ingresar" menu={false} />
      <div className={`flex w-full h-full flex-col justify-center my-10 px-[${PADDING_MOBILE}] lg:px-[${PADDING_DESKTOP}]`}>
        <LoginForm />
      </div>
    </div>
  );
}
