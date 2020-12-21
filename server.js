const express = require("express")
const cors = require("cors")
const port = process.env.PORT || 3000
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://matthew:Yq3gdiOOCgVRY411@smr-dashboard.wbqeq.mongodb.net/smr-dashboard?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express()
app.use(cors())

app.get("/sessions", (req, res) => {
	client.connect(err => {
		const collection = client.db("dashboard").collection("sessions")
		collection.find({name: "VEC 2020 Race 4"}, (err, cursor) => {
			cursor.toArray((err, cars) => {
				res.send(cars)
				client.close()
			})
		})
	})
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
