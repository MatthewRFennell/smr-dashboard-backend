const express = require("express")
const cors = require("cors")
const port = process.env.PORT || 3000
const mongo = require("mongodb")
const uri = process.env.MONGODB_URI
const client = new mongo.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express()
app.use(cors())

app.get("/sessions", (req, res) => {
	client.connect(err => {
		const collection = client.db("dashboard").collection("sessions")
		collection.find({}, (err, cursor) => {
			cursor.toArray((err, sessions) => {
				res.json(sessions)
			})
		})
	})
})

app.get("/sessions/:sessionId", (req, res) => {
	client.connect(err => {
		const collection = client.db("dashboard").collection("sessions")
		collection.findOne({"_id": mongo.ObjectID(req.params.sessionId)}, (err, session) => {
			res.json(session)
		})
	})
})

app.get("/sessions/:sessionId/cars", (req, res) => {
	client.connect(err => {
		const collection = client.db("dashboard").collection("sessions")
		collection.findOne({"_id": mongo.ObjectID(req.params.sessionId)}, (err, session) => {
			res.json(session.cars)
		})
	})
})

app.get("/sessions/:sessionId/cars/:carNumber", (req, res) => {
	client.connect(err => {
		const collection = client.db("dashboard").collection("sessions")
		collection.findOne({"_id": mongo.ObjectID(req.params.sessionId)}, (err, session) => {
			res.json(session.cars.filter((car) => {
				return car.number == req.params.carNumber
			}))
		})
	})
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
