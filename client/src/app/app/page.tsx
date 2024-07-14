import { StatusBar, Perfil } from "@/components";
import { PADDING_MOBILE, PADDING_DESKTOP } from "@/constants";


export default function App() {
  return (
    <div className="flex flex-col min-h-screen h-max w-full items-center bg-white">
      <StatusBar title="Perfil de usuario" menu={true} />
      <div className={`flex w-full h-full flex-col justify-center my-10 px-[${PADDING_MOBILE}] md:px-[${PADDING_DESKTOP}]`}>
        <Perfil />
      </div>
    </div>
  );
}
