import mongoose from 'mongoose';

// connect to MongoDB
mongoose.connect('mongodb://localhost/gettingstarted', { useNewUrlParser: true });

const UserSchema = mongoose.Schema({
    email: String,
    password: String,
    fullname: String,
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    note: String
});

// use statics
UserSchema.statics.findByName = function(name) {
    return this.find({fullname: new RegExp(name, 'i') });
}

// use static()

UserSchema.static('findByEmail', function(email) {
    return this.findOne({email});
})

const UserModel = mongoose.model('User', UserSchema);

const insertUser = async (email, password, fullname, gender) => {
    const newUser = new UserModel({
        email, password, fullname, gender
    });
    return await newUser.save();
}


const staticMethod = async () => {
    try {
        await insertUser("email1", "123", "name 1", "male");
        await insertUser("email2", "123", "name 2", "male");
        await insertUser("email3", "123", "name 3", "female");

        console.log("findByName")
        console.log(await UserModel.findByName("name"));
        console.log("------------------------------------")
        console.log("findByEmail")
        console.log(await UserModel.findByEmail("email2"));
    } catch(err) {
        console.log(err);
    }
}

staticMethod();

