import { Router } from "express"
import crypto from "crypto"
import { codeModel } from "./db.js"

const router = Router()
var visible = false
var pcode = ""
var msg = ""

router.get("/main", (req, res) => {
    visible = false
    pcode = ""
    msg = ""
    res.render("index", { pid: req.query.pid, visible, pcode, msg })
})

router.post("/status", (req, res) => {
    visible = false
    pcode = ""
    msg = ""
    codeModel.findOneAndDelete({ code: req.body.code }, (err, user) => {
        if (!user) {
            msg = "⚠ Invalid Code"
            res.render("index", { pid: req.query.pid, visible, pcode, msg })
        }
        else {
            pcode =
                "pw-" +
                crypto
                    .createHash("sha256")
                    .update(req.query.pid + process.env.SECRET_KEY)
                    .digest("hex")
            visible = true
            res.render("index", { pid: req.query.pid, visible, pcode, msg })
        }
    })
})

const total = (res) => {
    codeModel.count({}, (err, count) => {
        res.render('dashboard', { count })
    })
}

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/dashboard", (req, res) => {
    const pass = req.body.pass
    if (pass === "hehe") {
        total(res)
    } else {
        res.redirect("/login")
    }
})

router.post("/add", (req, res) => {
    codeModel.create({ code: req.body.addField }).then(user => {
        total(res)
    })
})

router.post("/refresh", (req, res) => {
    total(res)
})

export default router