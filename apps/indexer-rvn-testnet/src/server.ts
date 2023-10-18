import compression from "compression";
import helmet from "helmet";
import app from "./app";
import { blocksJob } from "./jobs/blocks";

const PORT = process.env.PORT || 3050;

app.use(helmet()); // set well-known security-related HTTP headers
app.use(compression());

app.disable("x-powered-by");

const server = app.listen(PORT, () => {
  console.log("Starting ExpressJS server on Port 3000");
  blocksJob.start();
});

export default server;
