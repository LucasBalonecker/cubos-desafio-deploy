const app = require("./servidor");

require("dotenv").config({
  path: ".src/.env",
});

const port = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
  console.log("Servidor em pé na porta ${process.env.PORT}");
});
