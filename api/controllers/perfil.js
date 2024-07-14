const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { format } = require('date-fns');
const { es } = require('date-fns/locale');


// Obtiene los datos del usuario
const getDataPerfil = async (req, res) => {
    
    const { dni }  = req.user; 

    try {

        const user = await prisma.user.findUnique({
            where: { dni: dni },
            include: { healthInsurance: true, appointments: {
                orderBy: {
                    fecha: 'asc'
                }
            } }
        });

        if (!user) return res.status(404).json({ ok: false, error: 'Usuario no encontrado' });

        if(!user.healthInsurance.obraSocialId) return res.status(404).json({ ok: false, error: 'El usuario no tiene obra social' });

        //Busco el nombre de la obra social en mi base de datos segun la obraSocialId que obtengo.
        const obraSocial = await prisma.obraSocial.findUnique({ where: { id:user.healthInsurance.obraSocialId  } });

        if(!obraSocial) return res.status(404).json({ ok: false, error: 'Obra social no encontrada' });

        user.healthInsurance.obraSocialName = obraSocial.nombre

        if(!user.appointments) return res.status(404).json({ ok: false, error: 'El usuario todavía no tiene turnos asignados' });

        //Obtener los turnos del día
        const timeZone = 'America/Argentina/Buenos_Aires';
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          timeZone: timeZone,
        });
        const today = formatter.format(now);
        const filteredAppointments = user.appointments.filter(appointment => {
          const appointmentDate = appointment.fecha.toISOString().split('T')[0];
          return appointmentDate === today;
        });

        const appointmentsTodayMap = await Promise.all(filteredAppointments.map( async filteredAppointment => {

            //busco los datos del profesional
            const professional = await prisma.professional.findUnique({ where: { dni:filteredAppointment.professionalDni  } });

            const fecha = format(new Date(filteredAppointment.fecha), "eeee dd 'de' MMMM", { locale: es }); // 'eeee' para obtener el nombre del día de la semana en español
            
            return {
                id: filteredAppointment.id,
                status: filteredAppointment.status,
                fecha,
                hora: filteredAppointment.hora,
                userDni: filteredAppointment.userDni,
                professional: {
                    dni: professional.dni,
                    nombre: professional.nombre,
                    apellido: professional.apellido,
                }
                
            }
        }))

        user.appointmentsToday = appointmentsTodayMap
        
        res.json({ ok: true, user });
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        res.status(500).json({ ok: false, error: 'Error interno del servidor' });
    }
};


module.exports = { getDataPerfil };