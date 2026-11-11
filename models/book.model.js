import {model ,Schema} from "mongoose";

const bookSchema =new Schema({
    name:{
        type: String,
        required:true,//שדה חובה
        unique:true,
        trim:true,//הורדת רווחים מיותרים
        minlength: [2, 'שם הספר חייב להכיל לפחות 2 תווים'],
        maxlength: [20, 'שם הספר יכול להכיל עד 20 תווים בלבד']
    },
    price:{
        type: Number,
        required:true
    },
    categories:{
        type:[String],
        required: true,
        validate: {
            validator: function(v) {
              const allowedCategories = ['סיפורת', 'עיון', 'ילדים', 'קודש', 'היסטוריה'];
              // בדיקה שכל קטגוריה שנשלחה במערך קיימת ברשימת הערכים המותרים
              return v.every(cat => allowedCategories.includes(cat));
            },
          }
    },
    author:{
        name:{
            type: String,
            required:true,//שדה חובה
            trim:true//הורדת רווחים מיותרים
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'נא להזין כתובת אימייל תקינה']
        }
    }  
});

const Book=model('Book',bookSchema);

export default Book;