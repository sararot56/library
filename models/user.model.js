import {model ,Schema} from "mongoose";

const userSchema =new Schema({
    name:{
        type: String,
        required:true,//שדה חובה
        trim:true,//הורדת רווחים מיותרים
        minlength: [2, 'שם המשתמש חייב להכיל לפחות 2 תווים']
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        match: [
            /^(?:(?:-?0[2489]-?\d{7})|(?:-?0[57][0-9]-?\d{7})|(?:\+?972-?[2489]-?\d{7})|(?:\+?972-?[57][0-9]-?\d{7}))$/,
            'נא להזין מספר טלפון ישראלי תקין'
          ]
    },
    email: {
        type: String,
        required: true,
        unique:true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'נא להזין כתובת אימייל תקינה']
    },
    registrationDate: {
        type: Date,
        default: Date.now
      },
    password:{
        type: String,
        required:true,
        minlength: [4, 'הסיסמה חייבת להכיל לפחות 4 תווים']
    },
    borrowedBooks: {
      type:[{
          bookId: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: true
          },
          name: {
            type: String,
            required: true
          },
          returnDate:{
            type:Date,
            required: true
          }
        }
      ],
      validate: {
        validator: function(v) {
          return v.length <= 3;
        },
        message: 'משתמש יכול להשאיל עד 3 ספרים בלבד בו-זמנית'
      }
    }
    });

const User=model('User',userSchema);

export default User;