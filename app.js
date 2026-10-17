import express from "express";
import addCurrentDate from './middlewares/dateMiddleware.js';
import timeBlocker from './middlewares/timeBlocker.js';
import apiRouter from './routes/index.route.js'
import listEndpoints from 'express-list-endpoints';


const app=express();
const port=5000;
app.use(express.json());
app.use(addCurrentDate);
app.use(timeBlocker({
    inactiveDays: [5, 6] // יום שישי ושבת
}));
app.use('/api',apiRouter);
app.all('/',(req,res)=>{
    res.send("hello to my library");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(listEndpoints(app));
});