import { model, Schema } from "mongoose";

const borrowingSchema= new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    bookId:{
        type:Schema.Types.ObjectId,
        ref:'Book',
        required:true
    },
    borrowDate: {
        type: Date,
        default: Date.now
      },
      returnDate: {
        type: Date,
        required: true
      },
      status: {
        type: String,
        enum: ['active', 'returned'],
        default: 'active'
      }
});
const Borrowing=model('Borrowing',borrowingSchema)
export default Borrowing;
