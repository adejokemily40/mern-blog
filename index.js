import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import loginRouter from "./Routes/user-routes.js";
import router from "./Routes/api.js"
import cors from "cors"
import bodyparser from "body-parser"

dotenv.config()

const app = express();

//MiddileWares
app.use(cors())
app.use(bodyparser.json())
app.use(express.json())
app.use('/user', router)
app.use('/register', loginRouter)


mongoose.connect(process.env.mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


console.log('Server is connected to MongoDB');


app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));

