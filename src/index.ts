import { db } from "./database/db";
import { App } from "./app";

const port = process.env.APP_PORT || 8000;
const app = new App().server;

app.listen(port, async () => {
  console.log(`App rodando na porta ${port}`);
});
