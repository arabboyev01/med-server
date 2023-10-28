import express, { Request, Response } from 'express'
import { signUpRoute } from './routes/create-user'
import { loginRoute } from './routes/login-user'
import { userInfoRoute } from './routes/user-info'
import { userData } from './routes/user-data'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 8080
app.use(express.json())
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express.js with TypeScript!')
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

app.use('/api/sign-up', signUpRoute)
app.use('/api/login', loginRoute)
app.use('/api/user-info', userInfoRoute)
app.use('/api/user-data', userData)