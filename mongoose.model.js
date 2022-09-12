
import mongoose from 'mongoose';

// connect to MongoDB
mongoose.connect('mongodb://localhost/gettingstarted', {useNewUrlParser: true});

/**
 * Setup:
 *      + Bước 1: Chạy terminal tại root folder
 *      + Bước 2: npm i
 * 
 * Mỗi lần chạy lệnh `.\node_modules\.bin\babel-node .\mongoose.model.js` chỉ được chạy cho một trong các trường hợp:
 *      + @createUser
 *      + @findUser
 *      + @updateUser
 *      + @deleteUser
 * 
 * @Comment các method còn lại khi chạy một trong 4 method trên
 *      Ví dụ chạy @findUser thì comment các @createUser @updateUser @deleteUser
 * 
 * Với các trường @findUser @updateUser @deleteUser điều kiện tiên quyết là phải chạy @createUser trước. Nếu không
 * các method này sẽ không có kết quả như mong đợi.
 */ 

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

const UserModel = mongoose.model('User', UserSchema);

// create
const createUser = () => {
    const newUser = new UserModel({
        email: "nthanhhai2909@gmail.com",
        password: '123456',
        fullname: 'Deft Blog',
        gender: "male"
    });

    try {
        newUser.save();
    } catch(err) {
        console.log(err);
    }
}

createUser();

// find user
const findUser = async () => {
    try {
        const userFind = await UserModel.findOne({email: "nthanhhai2909@gmail.com"});
        console.log("Find user:" + userFind);
    } catch(err) {
        console.log(err);
    }
}

findUser();


// update user

const updateUser = async () => {
    try {
        await UserModel.updateOne({email: "nthanhhai2909@gmail.com"}, {password: "abczyz"});
        const userFind = await UserModel.findOne({email: "nthanhhai2909@gmail.com"});
        console.log("Update user: " + userFind);
    } catch(err) {
        console.log(err);
    }
}

updateUser();


// delete user

const deleteUser = async () => {
    try {
        await UserModel.deleteOne({email: "nthanhhai2909@gmail.com"});
        const userFind = await UserModel.findOne({email: "nthanhhai2909@gmail.com"});
        console.log("Delete user: " + userFind);
    } catch(err) {
        console.log(err);
    }
}

deleteUser();





