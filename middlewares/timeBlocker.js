const timeBlocker = (inactiveConfig) => {
    return (req, res, next) => {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = ראשון, ..., 5 = שישי, 6 = שבת
        const hour = now.getHours();
        const minute = now.getMinutes();
        const currentMinutes = hour * 60 + minute;

        // בדיקה האם היום הנוכל נמצא במערך הימים המושבתים
        // נניח שיום שישי מסומן ב-5 ויום שבת ב-6
        const isFriday = dayOfWeek === 5;
        const isSaturday = dayOfWeek === 6;

        // חסימה מיום שישי בשעה 12:00 (720 דקות) ועד מוצאי שבת בשעה 22:00 (1320 דקות)
        const isFridayBlocked = isFriday && currentMinutes >= 12 * 60;
        const isSaturdayBlocked = isSaturday && currentMinutes <= 22 * 60;

        if (isFridayBlocked || isSaturdayBlocked) {
            return res.status(403).json({
                success: false,
                message: "שבת היום",
                currentDate: req.currentDate // שימוש בתאריך הקיים מהבקשה
            });
        }

        next();
    };
};

export default timeBlocker;