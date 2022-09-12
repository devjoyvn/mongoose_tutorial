import mongoose from 'mongoose';

// connect to MongoDB
mongoose.connect('mongodb://localhost/gettingstarted', { useNewUrlParser: true });

var childSchema = new mongoose.Schema({ name: 'string' });

var parentSchema = new mongoose.Schema({
    // Array of subdocuments
    children: [childSchema],
    // Single nested subdocuments. Caveat: single nested subdocs only work
    // in mongoose >= 4.2.0
    child: childSchema
});

var Parent = mongoose.model('Parent', parentSchema);

childSchema.pre('save', function (next) {
    if ('invalid' == this.name) {
        return next(new Error('#sadpanda'));
    }
    next();
});

var parent = new Parent({ children: [{ name: 'invalid' }] });
parent.save(function (err) {
    console.log(err.message) // #sadpanda
});


var parent = new Parent;

// create a comment
parent.children.push({ name: 'Liesl' });
var subdoc = parent.children[0];
console.log(subdoc) // { _id: '501d86090d371bab2c0341c5', name: 'Liesl' }
subdoc.isNew; // true

parent.save(function (err) {
  if (err) return handleError(err)
  console.log('Success!');
});


const getParentDoc = async () => {
    const doc = new Parent({
        children: [{ name: 'foo' }],
        child: { name: 'bar' }
      });
      console.log(doc)
      console.log(doc.child.parent() === doc); // true
      console.log(doc.children[0].ownerDocument() === doc); // true
}


getParentDoc();