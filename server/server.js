import express from "express"
import dotenv from "dotenv"
import path from "path";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js"

dotenv.config();

const app = express()

app.use(express.json());
const port = process.env.port || 5000

const __dirname = path.resolve();


app.use("/api/products",productRoutes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
	});
}


app.listen(port,  () => {
    connectDB();
    console.log("server started at http://localhost:"+ port);
})
