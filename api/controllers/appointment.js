const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Crear nueva cita
const createAppointment = async (req, res) => {
    const { date, userId, professionalId, status } = req.body;

    try {
        const newAppointment = await prisma.appointment.create({
            data: {
                date,
                userId,
                professionalId,
                status,
            },
        });
        res.json(newAppointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener citas de un usuario
const getAppointmentsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const appointments = await prisma.appointment.findMany({
            where: { userId: parseInt(userId) },
            include: { professional: true },
        });
        res.json(appointments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createAppointment, getAppointmentsByUser };
