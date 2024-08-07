import { initialData } from "./seed";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main (){

    try {
        
        //* 1. Borrar registros previos en las tablas
        await prisma.appointment.deleteMany();
        await prisma.healthInsurance.deleteMany();
        await prisma.schedule.deleteMany();
        await prisma.obraSocial.deleteMany();
        await prisma.user.deleteMany();
        await prisma.professional.deleteMany();
    
    
    
        //* 2. Crear las Obras sociales

        await prisma.obraSocial.createMany({
            data: [
              { id: 1, nombre: 'osde' },
              { id: 2, nombre: 'swiss medical' },
              { id: 3, nombre: 'prevencion salud' },
              { id: 4, nombre: 'omint' },
              { id: 5, nombre: 'apross' },
            ],
        });

        console.log("Esquema obra social creado con éxito");
    
    
       //* 3. Crear los profesionales. Agregandole los turnos desde el esquema Appoiment.
       

       initialData.professionals.forEach( async (professional) => {

            const { obraSociales, schedules, appointments:appoimentNotUse, ...rest } = professional;

            // Obtener las obras sociales existentes por ID de la obra social
            const existingObraSociales = await prisma.obraSocial.findMany({
                where: {
                    id: {
                        in: obraSociales.map(os => os.id),
                    },
                },
            });
            
            await prisma.professional.create({
                data: {
                    ...rest,
                    obraSociales: {
                      connect: existingObraSociales.map(os => ({ id: os.id })),
                    },
                    schedules: {
                        create: schedules.map(schedule => ({
                          fecha: schedule.fecha,
                          horaInicio: schedule.horaInicio,
                          horaFinal: schedule.horaFinal,
                        })),
                    }
                }
            })

       })

       console.log("Esquema professionals creado con éxito");

            
        //* 4. Crear los usuarios

        initialData.users.forEach( async (user) => {

            const { healthInsurance, appointments, dni, ...rest } = user;

            // Crear usuario
            const createdUser = await prisma.user.create({
                data: {
                    dni,
                    ...rest,
                }
            });

            console.log(`Usuario creado: ${createdUser.dni}`); 

            // Crear health insurance si existe
            if (healthInsurance) {
                const existingObraSocial = await prisma.obraSocial.findUnique({
                    where: { id: healthInsurance.obraSocialId }
                });

                if (!existingObraSocial) {
                    console.error(`ObraSocial con ID ${healthInsurance.obraSocialId} no existe.`);
                    return;
                }

                await prisma.healthInsurance.create({
                    data: {
                        obraSocialId: healthInsurance.obraSocialId,
                        plan: healthInsurance.plan,
                        numeroAfiliado: healthInsurance.numeroAfiliado,
                        userDni: dni,
                    }
                });
                console.log(`Esquema healthInsurance creado con éxito para el user: ${dni}`);
            }

            
            // Crear citas del usuario
            if (appointments) {
                appointments.forEach(async (appointment) => {
                    const professionalExists = await prisma.professional.findUnique({
                        where: { dni: appointment.professionalDni }
                    });

                    if (!professionalExists) {
                        console.error(`Profesional con DNI ${appointment.professionalDni} no existe.`);
                        return;
                    }

                    await prisma.appointment.create({
                        data: {
                            ...appointment,
                            userDni: dni,
                        }
                    });

                    console.log(`Esquema appointment creado con éxito para el user: ${dni}`);
                });
            }
        })


        console.log('Esquema user creado con éxito ');

        console.log('Datos sembrados correctamente');

  } catch (error) {
    console.error('Error al sembrar datos:', error);
  } finally {
    await prisma.$disconnect();
  }

}


(() => {

    if (process.env.NODE_ENV === 'production') return
    main();

})(); 