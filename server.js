import express from 'express';

const app = express();
const port = 8080;

app.use(express.static('client', {extensions: ['html']}));

app.listen(port, () => {
    console.log(`Server has started and running on https://127.0.0.1:${port}`);
});