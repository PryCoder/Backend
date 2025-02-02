import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
    path: "./.env"
});



import connectDB from "./db/index.js";

connectDB()
.then((() => {
    app.listen(process.env.PORT || 8000, () => {console.log(`Server started t0 ${process.env.PORT}`)
})
}))
.catch((err) => {
    console.log("MONGODB connection failed",err);
})