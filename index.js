const express = require("express");
const app = express();
const { open } = require("sqlite");
const path = require("path");
const dbPath = path.join(__dirname, "goodreads.db");
const sqlite3 = require("sqlite3");
let db = null;

const connectNodeDB = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server is running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`error: ${e.message}`);
    process.exit(1);
  }
};
connectNodeDB();

app.get("/books/", async (request, response) => {
  const getQuery = `SELECT
         * 
        FROM 
            book 
        ORDER BY
            book_id;`;
  const readybooks = await db.all(getQuery);
  response.send(readybooks);
});
