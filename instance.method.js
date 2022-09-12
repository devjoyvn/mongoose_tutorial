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


UserSchema.methods.findUserSimilarGender =  (callback) => {
    return this.model('User').find({gender: this.gender}, callback);
}

const UserModel = mongoose.model('User', UserSchema);

const insertUser = async (email, password, fullname, gender) => {
    const newUser = new UserModel({
        email, password, fullname, gender
    });
    return await newUser.save();
}


const instanceMethod = async () => {
    try {
        let user = await insertUser("email1", "123", "name 1", "male");
        await insertUser("email2", "123", "name 2", "male");
        await insertUser("email3", "123", "name 3", "female");

        console.log(await user.findUserSimilarGender());
    } catch(err) {
        console.log(err);
    }
}

instanceMethod();