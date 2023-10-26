import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const signUpRoute = express.Router()

signUpRoute.post('/', async (req: Request, res: Response) => {
    const { fullName, username, password } = req.body

    try {
        const user = await prisma.user.create({
            data: {
                fullName,
                username,
                password
            },
        })

        res.json({ user })
    } catch (error) {
        res.status(500).send({ error: 'An error occurred during sign-up.' })
    }
})

export { signUpRoute }