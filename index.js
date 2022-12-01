import express from 'express';

const app = express();
app.use(express.json());

app.post('/set', async (request, response) => {
    const body = request.body;
    const file = await fsp.writeFile("data.json", body);
    response.status(200);
    response.json(file);
});

app.get('/get', async (request, response) => {
    const content = await fsp.readFile("./data.json","utf-8"); 
    response.status(200);
    response.json(content);
});

app.delete('/remove', async (request, response) => {
    await fsp.unlink("data.json");
    response.status(200);
    response.json(true);
});

app.all('/*', async (request, response) => {
    response.status(404);
    response.json({ error: 'I can only give you authors, this route does not exist' });
});

const hostname = 'localhost';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server listening on http://${hostname}:${port}`)
});