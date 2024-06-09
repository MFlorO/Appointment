import { StatusBar } from "@/components";

export default function Login() {
  return (
    <div className="flex flex-col w-screen items-center">
      <StatusBar title="Ingresar" menu={false} />
    </div>
  );
}
