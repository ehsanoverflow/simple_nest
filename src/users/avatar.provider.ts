import { Connection } from 'mongoose';
import AvatarSchema from "../schemas/avatar.schema";

export const avatarProviders = [
    {
        provide: 'AVATAR_MODEL',
        useFactory: (connection: Connection) => connection.model('Avatar', AvatarSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
