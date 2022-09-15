import express from "express"
import { config } from "dotenv"
import router from "./router.js"
import "./db.js"
import path from "path"

config()
const app = express()
const port = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(path.resolve(), "assets")))
app.set('view engine', 'ejs')
app.use(router)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'))
    app.get('*', (req, res) => res.sendFile('build/index.html'))
}

app.listen(port, _ => console.log(`App is listening at ${port}...`))