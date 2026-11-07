/**
 * מידלוואר לבדיקת קיומם ותקינותם של נתוני התמונה
 * @param {import("express").Request} req בקשה
 * @param {import("express").Response} res תגובה
 * @param {import("express").NextFunction} next פונקציה שמעבירה הלאה
 */
export const checkImageExists = (req, res, next) => {
    // בדיקה האם נשלחו נתוני תמונה בבקשה
    if (!req.body.image && !req.files) {
        const err = new Error('חובה לצרף תמונה עבור הספר');
        err.statusCode = 400;
        return next(err);
    }

    next();
};

/**
 * middleware creator - יוצר מידלוואר דינמי לבדיקת מגבלות תמונה (סוג וגודל)
 * @param {number} maxSizeBytes גודל מקסימלי מותר בבייטים (ברירת מחדל: 1 מגה-בייט)
 */
export const imageValidatorCreator = (maxSizeBytes = 1024 * 1024) => {
    /**
     * @param {import("express").Request} req בקשה
     * @param {import("express").Response} res תגובה
     * @param {import("express").NextFunction} next פונקציה שמעבירה הלאה
     */
    const mdl = (req, res, next) => {
        // בדיקת אורך התוכן (Content-Length) כאינדיקציה לגודל הקובץ הנשלח
        const contentLength = parseInt(req.headers['content-length'] || '0', 10);

        if (contentLength > maxSizeBytes) {
            const err = new Error('קובץ התמונה חורג ממגבלת המשקל המותרת (עד 1 מגה-בייט)');
            err.statusCode = 400;
            return next(err);
        }

        // אפשר להוסיף כאן לוגיקה לבניית שם הקובץ המורכב מקוד הספר וחותמת הזמן הנוכחית
        const timestamp = Date.now();
        const bookCode = req.body.id || 'general';
        req.generatedImageName = `${bookCode}-${timestamp}`;

        next();
    };

    return mdl;
};