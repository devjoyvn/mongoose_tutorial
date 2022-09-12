import mongoose from 'mongoose';

// connect to MongoDB
mongoose.connect('mongodb://localhost/gettingstarted', { useNewUrlParser: true });

const UserSchema = mongoose.Schema({
    name: String
});

UserSchema.query.byName = function (name) {
    return this.where({ name: new RegExp(name, 'i') });
};

var UserModel = mongoose.model('User', UserSchema);

const insertUser = async (name) => {
    await new UserModel({name}).save();
}

const queryHelper = async () => {
    await insertUser("hga");
    await insertUser("hgi");
    await insertUser("rds");

    UserModel.find().byName('h').exec(function (err, users) {
        console.log("find:", users);
    });
    
    UserModel.findOne().byName('rds').exec(function (err, user) {
        console.log("findOne:", user);
    });
}

queryHelper();

