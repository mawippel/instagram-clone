const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require('dotenv').config();

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

if(!process.env.MONGO_USER || !process.env.MONGO_PASS){
	console.log('You have to create a .env file!')
}

mongoose.connect(
	`mongodb+srv://${process.env.MONGO_USER}:${
		process.env.MONGO_PASS
	}@instagramfeed-xp7ip.mongodb.net/test?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true
	}
);

app.use((req, res, next) => {
	req.io = io;
	next();
});
app.use(cors());

app.use(
	"/files",
	express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);
app.use(require("./routes"));
server.listen(3333);
