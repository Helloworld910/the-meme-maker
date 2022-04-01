import express from "express"

var app = express()

var server = app.listen(3000)

app.use(express.static("public"))


console.log("Server running in port 3000")
