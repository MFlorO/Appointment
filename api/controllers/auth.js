const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../env');

const prisma = new PrismaClient();



// Registro de usuario
const registerUser = async (req, res) => {
    
    const { email, password, firstName, lastName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
            },
        });
        res.json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



// Login de usuario
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

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
