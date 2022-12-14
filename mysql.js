const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const { pgClient } = require("pg");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*const pgclient = new Client({
  host: "34.155.142.137",
  user: "postgres",
  port: "5432",
  password: "dsczaim2022",
  database: "movies",
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});*/

const client = mysql.createConnection({
  host: "85.10.205.173",
  user: "dsczaim",
  port: "3306",
  password: "dsczaim2022",
  database: "dsczaimdb",
  connectionString: process.env.DATABASE_URL,
  multipleStatements: true,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

app.get("/AllMovies", (request, result) => {
  client.query("SELECT * FROM imdb_movie_data;", (error, data) => {
    console.log(error);
    if (!error) {
      client.end();
      return result.json(data.rows);
    } else {
      client.end();
      return result.json("Veri yok!");
    }
    client.end();
  });
});

app.get("/Movie/:title", (request, result) => {
  const title = request.params.title;

  client.query(
    "SELECT * FROM movies WHERE title='" + title + "'",
    (error, data) => {
      if (!error) {
        return result.json(data.rows);
      } else {
        return result.json("Veri yok!");
      }
      client.end();
    }
  );
});

app.get("/Movie/Rating/:rating", async (request, result) => {
  const rating = request.params.rating;

  client.query(
    "SELECT * FROM movies WHERE rating >=" + rating,
    (error, data) => {
      if (!error) {
        return result.json(data.rows);
      } else {
        return result.json(error);
      }

      client.end();
    }
  );
});

app.get("/Movie/Year/:year", async (request, result) => {
  const year = request.params.year;

  client.query("SELECT * FROM movies WHERE year >=" + year, (error, data) => {
    if (!error) {
      return result.json(data.rows);
    } else {
      return result.json(error);
    }

    client.end();
  });
});

app.post("/AddMovie", (request, result) => {
  const title = request.body.title;
  const genre = request.body.genre;
  const description = request.body.description;
  const director = request.body.director;
  const actors = request.body.actors;
  const year = request.body.year;
  const runtime_minutes = request.body.runtime_minutes;
  const rating = request.body.rating;
  const votes = request.body.votes;
  const revenue_millions = request.body.revenue_millions;
  const metascore = request.body.metascore;
  console.log(
    title,
    genre,
    description,
    director,
    actors,
    year,
    runtime_minutes,
    rating,
    votes,
    revenue_millions,
    metascore
  );
  client.query(
    `INSERT INTO movies (title,genre,description,director,actors,year,runtime_minutes,rating,votes,revenue_millions,metascore) VALUES ('${title}','${genre}','${description}','${director}','${actors}',${year},${runtime_minutes},${rating},${votes},${revenue_millions},${metascore})`,

    (error, data) => {
      var x = `INSERT INTO movies (title,genre,description,director,actors,year,runtime_minutes,rating,votes,revenue_millions,metascore) VALUES ('${title}','${genre}','${description}','${director}','${actors}',${year},${runtime_minutes},${rating},${votes},${revenue_millions},${metascore})`;
      console.log(x);
      if (!error) {
        return result.json({ status: 1 });
      } else {
        return result.json({ status: 0 });
      }

      client.end();
    }
  );
});

app.listen(process.env.PORT || 8000, () =>
  console.log(`server running on PORT ${PORT}`)
);
