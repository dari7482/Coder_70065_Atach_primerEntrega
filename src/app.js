const express = require("express")
const path = require("path")
const productPath = require("./routes/productsRoutes")
const routCart = require("./routes/carritoRouter.js")

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", productPath)

app.use("/", routCart)


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


