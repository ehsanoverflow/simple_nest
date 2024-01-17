import { Document } from 'mongoose';

export interface User extends Document {
    readonly full_name: string;
    readonly username: string;
    password: string;
    readonly email: string;
    avatar: string;
}