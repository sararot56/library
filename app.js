import express from "express";
import cors from "cors";                  // מאפשר גישה מכל קליינט חיצוני
import morgan from "morgan";              // הדפסת נתונים על בקשות במצב פיתוח
import helmet from "helmet";              // אבטחת כותרות HTTP
import rateLimit from "express-rate-limit"; // הגבלת קצב בקשות למניעת עומסים/מתקפות




import addCurrentDate from './middlewares/dateMiddleware.js';
import timeBlocker from './middlewares/timeBlocker.js';
import errorHandler from './middlewares/errorHandler.js';
import apiRouter from './routes/index.route.js'
import listEndpoints from 'express-list-endpoints';


const app=express();
const port=5000;

app.use(express.json());
//בשביל העלאת קבצים
app.use(express.urlencoded({ extended: true }));


app.use(cors());
app.use(express.static('public'));
// 2. Morgan: מדפיס לטרמינל את נתוני הבקשה (כגון מתודת HTTP, נתיב, קוד תגובה וזמן עיבוד) במצב פיתוח
app.use(morgan('dev'));
// 3. Helmet: מגן על האפליקציה על ידי הגדרת כותרות HTTP שונות כנגד חולשות אבטחה נפוצות
app.use(helmet());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 דקות
    max: 100,                 // מקסימום 100 בקשות לכל IP בחלון הזמן
    message: "יותר מדי בקשות מכתובת IP זו, נסה שוב מאוחר יותר."
});
app.use(limiter);


app.use(addCurrentDate);
app.use(timeBlocker({
    inactiveDays: [5, 6] // יום שישי ושבת
}));
app.use('/api',apiRouter);
app.all('/',(req,res)=>{
    res.send("hello to my library");
});

app.use((req, res, next) => {
    const error = new Error(`הניתוב המבוקש לא נמצא: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
});
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(listEndpoints(app));
});