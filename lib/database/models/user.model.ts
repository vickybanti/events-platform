import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
   _id:{type:String},
    clerkId : {type:String, required:true, unique:true},
    email: {type: String, required:true, unique:true},
    username:{type: String, required:true, unique:true},
    firstname:{type: String, required:true},
    lastname:{type: String, required:true},
    photo:{type: String, required:true},

})
const User = models.User || model('User', UserSchema);

export default User