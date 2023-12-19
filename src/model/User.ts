import { timeStamp } from "console";
import mongoose,{Schema} from "mongoose";

const mongoUri: string | undefined| null= process.env.MONGODB_URI;

if (!mongoUri) {
    console.log('MONGODB_URI not found in environment variables');
} else {
    
    if (typeof mongoUri === 'string') {
        mongoose.connect(mongoUri);
    } else {
        console.log('MONGODB_URI is not a valid string');
    }
}

mongoose.Promise= global.Promise

const userSchema = new Schema({
    name:String,
    email:String,
    password:String
},
{
    timestamps:true
}
);

const User = mongoose.models.User || mongoose.model('User',userSchema)

export default User