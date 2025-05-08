import app from "./app";
import initServer from "./config/server/server.config";

const port = parseInt(process.env.PORT) || 5555;
initServer(port, app);