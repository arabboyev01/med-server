import express, { Request, Response } from 'express'
import { signUpRoute } from './routes/create-user'
import { loginRoute } from './routes/login-user'
import { userInfoRoute } from './routes/user-info'

const app = express()
const port = 8080
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express.js with TypeScript!')
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

app.use('/api/sign-up', signUpRoute)
app.use('/login', loginRoute)
app.use('/api/user-info', userInfoRoute)