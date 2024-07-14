export interface HealthInsurance {
    id: number,
    numeroAfiliado: string,
    obraSocialId: number,
    obraSocialName: string,
    plan: string, 
    userDni: string,
}


export interface Appointments {
    id: number,
    fecha: string,
    hora: number,
    professionalDni: string,
    status: string,
    userDni: string
}

export interface AppointmentsToday {
    id: number,
    fecha: string,
    hora: number,
    professional: {
        dni: string,
        nombre: string, 
        apellido: string
    },
    status: string,
    userDni: string
}


export interface UserData {
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    area: string, 
    telefono: string,
    dni: string,
    domicilio: string,
    rol: string,
    healthInsurance: HealthInsurance,
    appointments: Appointments[],
    appointmentsToday: Appointments[]
}

