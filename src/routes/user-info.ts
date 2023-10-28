import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const userInfoRoute = express.Router()

userInfoRoute.post('/', async (req: Request, res: Response) => {
    const { username, location, calls } = req.body
    console.log(username, location, calls)
    const stringLocation = JSON.stringify(location)

    try {
    
        const user = await prisma.user.findUnique({
            where: {
                username
            },
        });
        
        if (!user) {
            throw new Error("User not found");
        }
        
        await prisma.userData.create({
            data: {
                location: stringLocation,
                calls,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        })

        res.json(user)
    } catch (error) {
        res.status(500).send({ error: 'An error occurred during sign-up.' })
    }
})

export { userInfoRoute }