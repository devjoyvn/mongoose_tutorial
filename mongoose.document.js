
import mongoose from 'mongoose';

// connect to MongoDB
mongoose.connect('mongodb://localhost/gettingstarted', { useNewUrlParser: true });

/**
 * Setup:
 *      + Bước 1: Chạy terminal tại root folder
 *      + Bước 2: npm i
 * 
 * Lệnh thực thi: 
 *      + MacOS: ./node_modules/.bin/babel-node mongoose.document.js
 *      + Windows: .\node_modules\.bin\babel-node mongoose.document.js
 * 
 * Mỗi lần chỉ được chạy cho một trong các trường hợp:
 *      + @getDocumentByFindOne
 *      + @updateDocument
 *      + @validate
 *      + @overwriting
 * 
 * @Comment các method còn lại khi chạy một trong 4 method trên
 *      Ví dụ chạy @getDocumentByFindOne thì comment các @updateDocument @validate @overwriting
 * 
 */


const MyModel = mongoose.model('MyModel', new mongoose.Schema({ name: String, age: Number }));

const doc = new MyModel();

console.log("Document is instanceof MyNodel: ", doc instanceof MyModel);
console.log("Document is instanceof MyNodel: ", doc instanceof mongoose.Model);
console.log("Document is instanceof MyNodel: ", doc instanceof mongoose.Document);



const getDocumentByFindOne = async () => {
    await new MyModel().save()
    const docFind = await MyModel.findOne();
    console.log(docFind)
    console.log("Document is instanceof MyNodel: ", docFind instanceof MyModel);
    console.log("Document is instanceof MyNodel: ", docFind instanceof mongoose.Model);
    console.log("Document is instanceof MyNodel: ", docFind instanceof mongoose.Document);
};

getDocumentByFindOne();


const updateDocument = async () => {
    try {
        // Tạo và save new record xuống database
        await new MyModel({name: "HGA", age: 24}).save()
        // Tìm new record vừa được lưu xuống database 
        const docFind = await MyModel.findOne({name: "HGA"});

        // update age = 30
        docFind.age = 30;

        // update dữ liệu xuống database
        await docFind.save();

        // Kiểm tra dữ liệu
        console.log(await MyModel.findOne({name: "HGA"}));
    } catch(err) {
        console.log(err);
    }

};

updateDocument();


const validate = async () => {
    const schema = new mongoose.Schema({ name: String, age: { type: Number, min: 0 } });
    const Person = mongoose.model('Person', schema);
    try {
        let p = new Person({ name: 'foo', age: 'bar' });
        // Cast to Number failed for value "bar" at path "age"
        await p.validate();
    } catch (err) {
        console.log("err: ", err);
    }

    try {
        let p2 = new Person({ name: 'foo', age: -1 });
        // Path `age` (-1) is less than minimum allowed value (0).
        await p2.validate();
    } catch (err) {
        console.log("err: ", err);
    }
}

validate();


const overwriting = async() => {
    const schema = new mongoose.Schema({ name: String, age: { type: Number, min: 0 } });
    const Person = mongoose.model('Person', schema);
    
    // Create new Person
    await new Person({name: "Deft", age: 18}).save();

    const doc = await Person.findOne({name: "Deft" });
    console.log("Origin: ", doc);

    // overwrite data 
    doc.overwrite({name: "haha"});
    let overwrite = await doc.save();

    console.log("overwrite", overwrite);
}

overwriting();