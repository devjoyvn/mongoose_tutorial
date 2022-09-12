import mongoose from 'mongoose';

var MyModel = mongoose.model('Test', new Schema({ name: String }));
// Will just hang until mongoose successfully connects
MyModel.findOne(function(error, result) { /* ... */ });

setTimeout(function() {
  mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});
}, 60000);
