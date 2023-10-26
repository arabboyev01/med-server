import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const userInfoRoute = express.Router()

userInfoRoute.post('/', async (req: Request, res: Response) => {
    const { username, location, calls } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: {
                username
            },
        })

        res.json({ user, location, calls })
    } catch (error) {
        res.status(500).send({ error: 'An error occurred during sign-up.' })
    }
})

export { userInfoRoute }