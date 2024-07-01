const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const capitalizeFirstLetters = require('../functions/capitalizeFirstLetters');
const { JWT_SECRET } = require('../env');

const prisma = new PrismaClient();

// Expresión regular para validar el formato de email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// Registro de usuario
const registerUser = async (req, res) => {
    
    const { nombre, apellido, dni, domicilio, email, area, telefono, password, isObraSocial, obraSocialId, numeroAfiliado, plan } = req.body;

    //* Validar campos obligatorios
    if (!nombre || !apellido || !dni || !domicilio || !email || !area || !telefono || !password) {
        return res.status(400).json({ ok: false, error: 'Todos los campos son obligatorios' });
    }

    //*Validar que el nombre tenga menos de 18 caracteres
    if (nombre.length > 18) {
        return res.status(400).json({ ok: false, error: 'El nombre no puede superar los 18 caracteres' });
    }

    //*Validar que el nombre tenga menos de 18 caracteres
    if (apellido.length > 18) {
        return res.status(400).json({ ok: false, error: 'El apellido no puede superar los 18 caracteres' });
    }

    //* Verificar el formato del email
    if (!emailRegex.test(email)) {
        return res.status(400).json({ ok: false, error: 'Formato de email inválido' });
    }

    //* Validar la contraseña (ejemplo: longitud mínima de 6 caracteres, una letra mayúscula y almenos una letra minúscula)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ ok: false, error: 'La contraseña debe tener al menos 6 caracteres, una letra mayúscula y una letra minúscula' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    try {

        //* Verificar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({
            where: { dni },
        });

        if (existingUser) {
            return res.status(400).json({ ok: false, error: 'Usuario ya registrado' });
        }

        //* Crear el nuevo usuario
        const newUser = await prisma.user.create({
            data: {
                dni, 
                email,
                password: hashedPassword,
                nombre: capitalizeFirstLetters(nombre),
                apellido: capitalizeFirstLetters(apellido),
                domicilio: capitalizeFirstLetters(domicilio),
                telefono: `${area}-${telefono}`
            },
        });

        //* Si el usuario tiene obra social, crear el registro en la tabla HealthInsurance
        if (isObraSocial === 'true') {
            await prisma.healthInsurance.create({
                data: {
                    obraSocialId: obraSocialId,
                    plan: plan,
                    numeroAfiliado: numeroAfiliado,
                    user: {
                        connect: { id: newUser.id },
                    },
                },
            });
        }

        //* Generar el token JWT
        const token = jwt.sign({ userId: newUser.dni, email: newUser.email }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ ok: true,  token });
        
    } catch (error) {

        // Manejo específico de errores de Prisma
        if (error.code === 'P2002') {
            return res.status(400).json({ ok: false, error: 'El DNI ya está registrado' });
        }

        res.status(400).json({ ok: false, error: error.message });
    }
};



// Login de usuario
const loginUser = async (req, res) => {
    const { dni, password } = req.body;

    const user = await prisma.user.findUnique({ where: { dni } });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: '1h',
    });

    res.json({ token });
};



module.exports = { registerUser, loginUser };
