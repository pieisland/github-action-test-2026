const http = require("http");
const {Client} = require("pg");

/*
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
*/

const dbConfig = {
  host: "db",
  user: "postgres",
  password: "postgres",
  database: "postgres",
  port: 5432,
};

async function connectWithRetry() {
  while (true) {
    const client = new Client(dbConfig);

    try {
      await client.connect();
      console.log("DB connected");
      return client;
    } catch (err) {
      console.error("DB connection failed. Retrying in 3 seconds...");
      console.error(err.message);

      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
}

async function startServer() {
  await connectWithRetry();

  http.createServer((req, res) => {
    res.end("hello kubernetes");
  }).listen(3000);

  console.log("server running on port 3000");
}

startServer();
