import { Document, model, models, Schema } from "mongoose";

export interface IEvent extends Document {
    _id: string;
    title: string;
    description? : string;
    location:  string;
    createdAt :  Date;
    imageUrl:  string;
    startDate: Date ;
    endDateTime: Date; 
    price? : string;
    isFree: Boolean;
    url? :  string;
    category:  {_id: string, name: string};
    organizer:  {_id:string, firstname: string, lastname:string } ;

}
const EventSchema = new Schema({
    title: {type:String, required:true},
    description: {type:String},
    location: {type:String},
    createdAt : {type:String, default:Date.now},
    imageUrl: {type:String, required:true},
    startDate:{type:Date, default:Date.now},
    endDateTime:{type:Date, default:Date.now },
    price :{type:String},
    isFree:{type:Boolean},
    url: {type:String},
    category: {type:Schema.Types.ObjectId, ref:'Category'},
    organizer: {type:Schema.Types.ObjectId, ref:'User'
    }
})

const Event = models.Event || model('Event', EventSchema);

export default Event;