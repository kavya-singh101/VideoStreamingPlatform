import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true   
}))

app.use(express.json({limit: "30kb"}))

app.use(express.urlencoded({extended: true, limit: "30kb"})) 
app.use(express.static("public"))  

app.use(cookieParser())

// routes import
import userRouter from "./routers/user.routes.js"

// routes declaration
app.use("/api/v1/users", userRouter) // will redirect you to user.routes.js where it will be handled by the userRouter and the path will be /users/register 
// path -> http://localhost:9000/api/v1/users/register

export { app }