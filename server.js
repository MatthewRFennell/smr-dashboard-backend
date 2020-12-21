const express = require("express")
const cors = require("cors")
const port = process.env.PORT || 3000

const app = express()

app.use(cors())

app.get("/cars", (req, res) => {
	res.json({ name: "#92 SpeedyMite Racing" })
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
