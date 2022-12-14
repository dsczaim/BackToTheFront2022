const PORT = process.env.PORT || 8000;
const express = require("express");
const mysql = require("mysql");
const { Client } = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*const clients = mysql.createConnection({
    host:"host",
    database:"imdbmovie",
    port: 3306,
    user:"username",
    password:"1234"
})*/

const client = new Client({
  host: "34.155.142.137", //veritabanı etkinlikten 1 hafta sonra kapatılmış olacaktır. 
// verilen sql scripti ile kendi veritabanınızda tabloyu oluşturup host bilgilerini sağlayabilirsiniz
  user: "postgres",
  port: "5432",
  password: "dsczaim2022",
  database: "movies",
});

client.connect();

app.get("/Movies", (request, result) => {
  client.query("SELECT * FROM movies", (error, data) => {
    console.log(error);
    if (!error) {
      return result.json(data.rows);
      //return client.end();
    } else {
      return result.json("Veri bulunamadı!");
      //return client.end();
    }
  });
});
app.get("/Movie/:movieName", (request, result) => {
  const movieName = request.params.movieName;

  client.query(
    `SELECT * FROM movies WHERE title='${movieName}'`,
    (error, data) => {
      console.log(error);
      if (!error) {
        return result.json(data.rows);
      } else {
        return result.json("Veri bulunamadı!");
        // return client.end();
      }
    }
  );
});

//http://localhost:8000/Movies/Year/2017 şeklinde çalışır. Postman'de ne params ne body kısmına gerek var!
app.get("/Movies/Year/:Year", (request, result) => {
  const Year = request.params.Year;
  client.query(`SELECT * FROM movies WHERE year> ${Year}`, (error, data) => {
    console.log(error);
    if (!error) {
      result.json(data.rows);
      //return client.end();
    } else {
      result.json("Veri bulunamadı!");
      // return client.end();
    }
  });
});

//Postman'de Params sekmesinde veriler doldurulmalı.
//http://localhost:8000/Movies/Year?Year=2018 şeklinde çalışır.
app.get("/Movies/Year", (request, result) => {
  const Year = request.query.Year;
  client.query(`SELECT * FROM movies WHERE year> ${Year}`, (error, data) => {
    console.log(error);
    if (!error) {
      result.json(data.rows);
      //return client.end();
    } else {
      result.json("Veri bulunamadı!");
      // return client.end();
    }
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

  client.query(
    `INSERT INTO  movies (title,genre,description,director,actors,year,runtime_minutes,rating,votes,revenue_millions,metascore) VALUES('${title}', '${genre}','${description}','${director}','${actors}',${year},${runtime_minutes},'${rating}',${votes},'${revenue_millions}', ${metascore} )`,
    (error, data) => {
      console.log(error);
      if (!error) {
        result.json("Veri kaydı başarılı");
        //return client.end();
      } else {
        result.json("Veri kaydı başarısız!");
        // return client.end();
      }
    }
  );
});

app.post("/UpdateMovie", (request, result) => {
  const rank = request.body.rank;
  const title = request.body.title;

  client.query(
    `UPDATE movies SET title='${title}' WHERE rank=${rank}`,
    (error, data) => {
      console.log(error);
      if (!error) {
        result.json("Veri güncelleme başarılı");
        //return client.end();
      } else {
        result.json("Veri güncelleme başarısız!");
        // return client.end();
      }
    }
  );
});

app.put("/UpdateMovie", (request, result) => {
  const rank = request.body.rank;
  const title = request.body.title;

  client.query(
    `UPDATE movies SET title='${title}' WHERE rank=${rank}`,
    (error, data) => {
      console.log(error);
      if (!error) {
        result.json("Veri güncelleme başarılı");
        //return client.end();
      } else {
        result.json("Veri güncelleme başarısız!");
        // return client.end();
      }
    }
  );
});

//Postman'de Post seçilir ve ne body ne params kısmında bir şey yazmadan çalışır.
// http://localhost:8000/DeleteMovie/1006
app.post("/DeleteMovie/:rank", (request, result) => {
  const rank = request.params.rank;

  client.query(`DELETE FROM movies WHERE rank=${rank}`, (error, data) => {
    console.log(error);
    if (!error) {
      result.json("Veri silme başarılı");
      //return client.end();
    } else {
      result.json("Veri silme başarısız!");
      // return client.end();
    }
  });
});

//Postman'de Post seçilir ve body kısmında rank doldurularak çalışır.
// http://localhost:8000/DeleteMovie
app.post("/DeleteMovie", (request, result) => {
  const rank = request.body.rank;
  console.log(rank);

  client.query(`DELETE FROM movies WHERE rank=${rank}`, (error, data) => {
    console.log(error);
    if (!error) {
      result.json("Veri silme başarılı");
      //return client.end();
    } else {
      result.json("Veri silme başarısız!");
      // return client.end();
    }
  });
});

//Postman'de Delete seçilir ve body kısmında rank doldurularak çalışır.
// http://localhost:8000/DeleteMovie
app.delete("/DeleteMovie", (request, result) => {
  const rank = request.body.rank;
  console.log(rank);

  client.query(`DELETE FROM movies WHERE rank=${rank}`, (error, data) => {
    console.log(error);
    if (!error) {
      result.json("Veri silme başarılı");
      //return client.end();
    } else {
      result.json("Veri silme başarısız!");
      // return client.end();
    }
  });
});

//Postman'de Post seçilir ve ne body ne params kısmında bir şey yazmadan çalışır.
//http://localhost:8000/DeleteMovie/1010
app.delete("/DeleteMovie/:rank", (request, result) => {
  const rank = request.params.rank;
  console.log(rank);

  client.query(`DELETE FROM movies WHERE rank=${rank}`, (error, data) => {
    console.log(error);
    if (!error) {
      result.json("Veri silme başarılı");
      //return client.end();
    } else {
      result.json("Veri silme başarısız!");
      // return client.end();
    }
  });
});

//Postman'de Delete seçilir ve params kısmında rank doldurularak çalışır.
//http://localhost:8000/DeleteMovieAsQuery?Rank=1009
//Dikkat edilmesi gereken kısım /DeleteMovie dersek body ile çalışan api ile çakışır!
app.delete("/DeleteMovieAsQuery", (request, result) => {
  const Rank = request.query.Rank;
  console.log(Rank);

  client.query(`DELETE FROM movies WHERE rank=${Rank}`, (error, data) => {
    console.log(error);
    if (!error) {
      result.json("Veri silme başarılı");
      //return client.end();
    } else {
      result.json("Veri silme başarısız!");
      // return client.end();
    }
  });
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`server running on ${PORT}`);
});
