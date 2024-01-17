import { Document } from 'mongoose';

export interface Avatar extends Document {
    readonly user_id: string;
    readonly file_name: string;
    readonly base64: string;
}