import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";
dotenv.config();
const API_SERVICE_URL = process.env.API_SERVICE_URL;
const app = express();
const port = process.env.PORT;
const RPC_ALLOW_LIST = [];
// Logging
app.use(morgan("dev"));
// // Authorization
// app.use('', (req, res, next) => {
//   if (req.headers.authorization) {
//       next();
//   } else {
//       res.sendStatus(403);
//   }
// });
// Proxy
app.use("*", createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/*`]: "",
    },
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
