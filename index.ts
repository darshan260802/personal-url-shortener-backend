import express, { Express, Request, Response } from "express";
import linkRoutes from './Routes/link.routes';
import dotenv from "dotenv";
import cors from "cors";

// Env
dotenv.config();

const port = process.env.PORT ?? 7001;
const app: Express = express();


// Enabled CORS Globally
app.use(cors());

// Parse Body Form Request
app.use(express.json());

// Default Get Route
app.get("/", (request: Request, response: Response) => {
  response.send("<h1>WELCOME TO API</h1>");
});

// Routes for Link
app.use('/link', linkRoutes);

app.listen(port, () => {
  console.log("App is listening on port: %d", port);
});
