import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const userData = express.Router()

userData.get('/', async (req: Request, res: Response) => {

    try {
        const userData = await prisma.userData.findMany()
        const userIds = userData.map((entry) => entry.userId)
        
        const userDatabaseData = await prisma.user.findMany({
            where: {
                id: {
                    in: userIds,
                },
            },
        })
        
        const userDataWithUserDetails = userData.map((entry) => {
            const user = userDatabaseData.find((user) => user.id === entry.userId);
            if (user) {
                return {
                    ...entry,
                    user: user,
                };
            }
            return entry
        })

        res.json(userDataWithUserDetails)
    } catch (error) {
        res.status(500).send({ error: 'An error occurred during sign-up.' })
    }
})

export { userData }