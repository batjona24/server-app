import express from 'express';
import database from './database.js';
const app = express();
app.use(express.json());

app.post('/trip', async (request, response) => {
    const data_trip = request.body;
    await database.raw(`insert into trips (date , vacation, days, rating )
    values ('${data_trip.date}',' ${data_trip.vacation}',${data_trip.days},${data_trip.rating})`);
    const result = await database.raw(`select * from trips`);
    response.status(200);
    response.json(result);
});

app.get('/trip/:id', async (request, response) => {
    const id = request.params.id;
    const result = await database.raw(`select * from trips where id = ${id}`);
    if(result.length !== 0) {
      response.status(200);
      response.json(result);  
    }
    else {
        response.status(404);
        response.json(`The trip with id = ${id} NOT FOUND!`);
    }
    
});

app.get('/trip', async (request, response) => {
    const result = await database.raw(`select * from trips`);
    response.status(200);
    response.json(result);
});

app.put('/trip/:id', async (request, response) => {
    const id = request.params.id;
    const data_trip = request.body;
    await database.raw(`update trips set date ='${data_trip.date}', vacation = '${data_trip.vacation}', days = ${data_trip.days}, rating = ${data_trip.rating} where id=${id} `);
    const result = await database.raw(`select * from trips where id=${id}`);
    response.status(200)
    response.json(result)
   
});

app.delete('/trip/:id', async (request, response) => {
    const id = request.params.id;
    const result = await database.raw(`delete from trips where id=${id}`);
    if(result.length !== 0) {
        response.status(200);
        response.json(true);  
      }
    else {
          response.status(404);
          response.json(`The trip with id = ${id} NOT FOUND!`);
    }
});

app.all('/*', async (request, response) => {
    response.status(404);
    response.json({ error: 'This route does not exist' });
});

const hostname = 'localhost';
const port = 3000;

app.listen(port, hostname, () => {
    console.log(`Server listening on http://${hostname}:${port}`)
});