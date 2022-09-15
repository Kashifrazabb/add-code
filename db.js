import mongoose from "mongoose"
import { config } from "dotenv"

config()

mongoose.connect(process.env.MURI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('connected', _ => console.log("Database is synced"))
mongoose.connection.on('error', _ => console.log("Database error"))

const { Schema, model } = mongoose

const codeSchema = Schema({
    code: { type: String, required: true }
})


export const codeModel = model('codeModel', codeSchema)