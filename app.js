const http = require("http");
const {Client} = require("pg");

const client = new Client({
	host: "db", 
	user: "postgres", 
	password: "postgres", 
	database: "postgres",
	port: 5432,
});

client.connect()
	.then(() => console.log("DB connected"))
	.catch(err => console.error("Db connection error", err));

http.createServer((req, res) => {
	res.end("hello docker compose db");

}).listen(3000);

console.log("server running");
	
