const { PrismaClient } = require('@prisma/client');
const capitalizeFirstLetters = require('../functions/capitalizeFirstLetters');
const prisma = new PrismaClient();


// Traerme las obras sociales
const getObraSociales = async (req, res) => {
    
    const { id } = req.body;

    try {

        const obrasociales = await prisma.obraSocial.findMany({
            where: { id: id }
        });

        const obraSocialesCapitalizadas = obrasociales.map(item => {
            return { ...item, nombre: capitalizeFirstLetters(item.nombre) };
        });
        
        res.status(200).json(obraSocialesCapitalizadas);

    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};





module.exports = { getObraSociales }