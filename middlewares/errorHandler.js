const errorHandler = (err, req, res, next) => {
    // קביעת סטטוס שגיאה כברירת מחדל ל-500 (אלא אם הוגדר אחרת)
    const statusCode = err.statusCode || 500;

    // מבנה אובייקט השגיאה המבוקש
    const errorResponse = {
        type: 'server error',
        message: err.message || 'Internal Server Error'
    };

    // הוספת מאפיין ה-stack אך ורק במצב פיתוח (development)
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }

    // שליחת התשובה ללקוח במבנה המבוקש
    res.status(statusCode).json({
        error: errorResponse
    });
};

export default errorHandler;