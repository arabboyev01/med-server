import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const loginRoute = express.Router()
const prisma = new PrismaClient()

loginRoute.post('/', async (req: Request, res: Response) => {
    const { username, password } = req.body

    try {
        const singleUser = await prisma.user.findUnique({ where: { username } })

        if (!singleUser) {
            throw new Error
        }


        if (singleUser.password !== password) {
            throw new Error
        }

        res.json({ singleUser })
    } catch (error) {
        res.status(500).send({ error: 'An error occurred during login.' })
    }
})

export { loginRoute }