const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema= new Schema({
      username:{
        type:String,
        required: [true,"username required"],
      },
      age: {
        type: String,
        required: [true, "age required"],
      },
      feesOfMonth: {
        type: Array,
        default:[],
        required: [true, "Month required"],
      },
      batch: {
        type: String,
        required: [true, "batch required"],
      },
      
});

var User = mongoose.model('user', UserSchema);

module.exports = User;