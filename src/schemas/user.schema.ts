import * as mongoose from 'mongoose';

var md5 = require('md5');

let validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 64
    },
    username: {type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        minLength: 4,
        maxLength: 32
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 16
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    avatar: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    }
});

UserSchema.methods.checkPassword = function(password) {
    return (md5(password) === this.password);
};

UserSchema.set('toJSON', {
    transform: function(doc, ret, opt) {
        delete ret['password']
        return ret
    }
})

UserSchema.pre('save', function(next) {
    this.password = md5(this.password);

    next();
});

UserSchema.post('save', function(error: any, doc: any, next: any) {
    console.log('errors:', error)
    if (error.code === 11000) {
        let errors = [];
        Object.keys(error.keyPattern).map((key) => {
            errors.push("Path " + key + "'s value already exists.")
        })
        next(errors);
    } else {
        next();
    }
});

export default UserSchema;