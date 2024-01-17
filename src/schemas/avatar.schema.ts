import mongoose, {Schema} from "mongoose";


const AvatarSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    file_name: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    base64: {
        type: String,
        required: true,
        length: 64
    },
});

export default AvatarSchema;