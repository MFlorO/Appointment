"use client"
import { useEffect, useState } from "react";
import { getProfileData } from "@/lib/api";
import { UserData } from "@/interfaces";
import { DatosPersonales, Turno } from "./";

const Perfil = () => {

  const [userData, setuserData] = useState<UserData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProfileData();
      setuserData(response);
    }
    fetchData()
  }, [])

  return (
    <div className='flex flex-col w-full minH-[180px] h-full'>
      <DatosPersonales {...userData} />
      { userData?.appointmentsToday && <p className="w-full justify-center text-[#000] text-[20px] text-center font-medium">TENES TURNOS HOY</p> }
      { userData?.appointmentsToday && <Turno array={userData?.appointmentsToday}/> }
    </div>
  )
}

export default Perfil;