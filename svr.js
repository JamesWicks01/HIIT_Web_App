import express from "express";

const app = express();
const port = 8080;

app.use(express.static("client"));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
