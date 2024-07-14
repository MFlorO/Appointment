import { AppointmentStatus } from '@prisma/client';
const bcrypt = require('bcryptjs');
  

interface ObraSocial {
    id: number;
    nombre: string;          
}
  

interface SeedUser {
  email: string; 
  password: string;
  nombre: string;
  apellido: string;
  dni: string;
  domicilio: string;
  telefono: string;
  healthInsurance: SeedHealthInsurance | null;
  rol: 'user' | 'admin';
  appointments: SeedAppointment[];
}


interface SeedProfessional {
  dni: string;
  nombre: string;
  apellido: string;
  password: string;
  precioConsulta: number;
  schedules: SeedSchedule[];
  obraSociales: ObraSocial[];
  rol: 'professional';
  appointments: SeedAppointment[];
}


interface SeedHealthInsurance {
  plan: string;
  numeroAfiliado: string;
  obraSocialId: number;
}


interface SeedAppointment {
  fecha: Date;
  hora: string;
  status: AppointmentStatus;
  userDni: string;
  professionalDni: string;
}


interface SeedSchedule {
  fecha: string;
  horaInicio: string;
  horaFinal: string;
  professionalDni: string;
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface SeedData {
  users: SeedUser[];
  professionals: SeedProfessional[];
  obraSociales: ObraSocial[];
}


// Datos de semilla
export const initialData: SeedData = {
    users: [
      {
        email: 'fernando@hotmail.com',
        password: bcrypt.hashSync('123456', 10),
        nombre: 'Fernando',
        apellido: 'Castro',
        dni: '38411057',
        domicilio: 'Avenida Corrientes 5663',
        telefono: '351-152436007',
        rol: 'user',
        healthInsurance:{
          obraSocialId: 1,
          plan: "210",
          numeroAfiliado: "15612"
        },
        appointments: [
          {
            fecha: new Date('2024-09-15'),
            hora: '09:20',
            status: 'PENDING',
            professionalDni: '87654321',
            userDni: '38411057',
          },
          {
            fecha: new Date('2024-07-15'),
            hora: '14:20',
            status: 'ATTENDED',
            professionalDni: '98765432',
            userDni: '38411057',
          },
        ],
      },
      {
        email: 'test@hotmail.com',
        password: bcrypt.hashSync('Fo123456', 10),
        nombre: 'Fernando',
        apellido: 'Castro',
        dni: '38411077',
        domicilio: 'Avenida Corrientes 5663',
        telefono: '351-152436007',
        rol: 'user',
        healthInsurance:{
          obraSocialId: 2,
          plan: "210",
          numeroAfiliado: "15612"
        },
        appointments: [
          {
            fecha: new Date('2024-08-15'),
            hora: '09:20',
            status: 'PENDING',
            professionalDni: '98765432',
            userDni: '38411077',
          },
          {
            fecha: new Date('2024-07-14'),
            hora: '14:20',
            status: 'ATTENDED',
            professionalDni: '98765432',
            userDni: '38411077',
          },
          {
            fecha: new Date('2024-07-18'),
            hora: '14:20',
            status: 'ATTENDED',
            professionalDni: '98765432',
            userDni: '38411077',
          },
        ],
      },
    ],
    obraSociales: [
        { 
            id: 1,
            nombre: 'osde'
          }, 
          { 
            id: 2,
            nombre: 'omint'
          }, 
          { 
            id: 3,
            nombre: 'swissMedical'
          }, 
    ],
    professionals: [
      {
        nombre: 'Ana',
        apellido: 'Gómez',
        dni: '87654321',
        password: bcrypt.hashSync('123456', 10),
        precioConsulta: 1500,
        schedules: [
          { fecha: 'Lunes', horaInicio: '09:00', horaFinal: '10:00', professionalDni: '87654321' },
          { fecha: 'Miércoles', horaInicio: '15:00', horaFinal: '18:00', professionalDni: '87654321' },
        ],
        obraSociales: [
          { 
            id: 1,
            nombre: 'osde'
          }, 
          { 
            id: 2,
            nombre: 'omint'
          }, 
          { 
            id: 3,
            nombre: 'swissMedical'
          }, 
        ],
        rol: 'professional',
        appointments: [
          {
            fecha: new Date('2024-06-15'),
            hora: '09:20',
            status: 'PENDING',
            professionalDni: '87654321',
            userDni: '38411057',
          },
        ],
      },
      {
        nombre: 'Rocío',
        apellido: 'Oviedo',
        dni: '98765432',
        password: bcrypt.hashSync('123456', 10),
        precioConsulta: 1500,
        schedules: [
          { fecha: 'Lunes', horaInicio: '09:00', horaFinal: '10:00', professionalDni: '98765432' },
          { fecha: 'Miércoles', horaInicio: '15:00', horaFinal: '18:00', professionalDni: '98765432' },
        ],
        obraSociales: [
            { 
              id: 3,
              nombre: 'swissMedical'
            }, 
        ],
        rol: 'professional',
        appointments: [
          {
            fecha: new Date('2024-06-15'),
            hora: '14:20',
            status: 'ATTENDED',
            professionalDni: '98765432',
            userDni: '38411057',
          },
        ],
      },
    ],
  };