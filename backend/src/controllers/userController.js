import bycript from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma.js'

const saltRounds = 10

export const register = async (req, res) => {
    try {
        const { name, email, password, avatar } = req.body

        const existingUser = await prisma.user.findUnique({ where: { email } })

        if (existingUser) {
            return res.status(400).json({ error: "Email já cadastrado" })
        }

        const hashedPassword = await bycript.hash(password, saltRounds)

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword, avatar }
        })

        const { password: _, ...userWithoutPassword } = user

        res.status(201).json(userWithoutPassword)

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao efetuar o cadastro, tente novamente!",
            error: error.message
        })
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            return res.status(401).json({ error: "Email ou senha inválidos" })
        }

        const passwordMatch = await bycript.compare(password, user.password)

        if (!passwordMatch) {
            return res.status(401).json({ error: "Email ou senha inválidos" })
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        )

        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email },
        })
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao efetuar o login, tente novamente!",
            error: error.message
        })
    }
}