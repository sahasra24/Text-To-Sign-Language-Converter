const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoute');
const fs = require('fs');
const path = require('path');

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://Ajay-kumar:Ajaykumar$13@cluster0.ofmxz.mongodb.net/Text2Sign');

const defaultSchema = new mongoose.Schema({
  key: String,
  image: String,
  likes: Number
});

var imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img: {
        data: Buffer,
        contentType: String
    }
});

const Image = mongoose.model('Image', imageSchema);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())

app.use("/auth", authRoute);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "../public/uploads")
        // return cb(null, "uploads")
    },
    filename: function(req, file, cb){
        return cb(null, file.originalname)
    }
})

const upload = multer({storage})

// Function to insert data at a specific position in a file
// function insertData(filePath, dataToInsert, callback) {
//     fs.readFile(filePath, 'utf8', (err, fileData) => {
//         position = fileData.length - 2;
//         if (err) {
//             return callback(err);
//         }
//         const newData = fileData.slice(0, position) + dataToInsert+',' + fileData.slice(position);
//         fs.writeFile(filePath, newData, 'utf8', callback);
//     });
// }

app.post('/api/upload',  upload.single("myFile"), (req, res) => {
  var obj = {
      name: req.body.name,
      desc: req.body.desc,
      img: {
          data: fs.readFileSync('../public/uploads/' + req.file.filename),
          contentType: 'image/png'
      }
  }
  Image.create(obj).then((err, item) => {
      if (err) {
          console.log(err);
      }
      else {
          // item.save();
          // res.redirect('/');
          console.log('success!');
      }
  });
  res.send({success:true});
})

// app.get('/api/updateDict/:missingWord', (req, res) => {
//     const kii = req.params.missingWord;
//     console.log(kii);
//     const newData = {
//       [kii]  : kii+'.png',
//     };
//     const jsonData = JSON.stringify(newData);
//     var d = jsonData.slice(1, jsonData.length - 1)
//     insertData(filePath, d, (err) => {
//         if (err) {
//             console.error('Error inserting data:', err);
//         } else {
//             console.log('Data inserted successfully.');
//         }
//     });
// })

app.get('/:community/:word/add', async (req, res) => {
  const Word = mongoose.model(req.params.community, defaultSchema);
  const kii = req.params.missingWord;
  const newWord = new Word({
    key: req.params.word,
    image: req.params.word + '-' + req.params.community + '.png',
    likes: 0
  })
  await newWord.save();
  res.send({success: true})
})

app.get('/:community/:word/checkWord', async (req, res) => {
  console.log(req.params.community);
  try {
      const Word = mongoose.model(req.params.community, defaultSchema);
      const docs = await Word.find({key: req.params.word}).exec()
      console.log(docs);
      res.send(docs)
  } catch(error){
    console.log('Error While fetching the dictionary!');
  }
})

app.get('/addLike/:community/:word', async (req, res) => {
  try {
    const Word = mongoose.model(req.params.community, defaultSchema);
    const docs = await Word.findOneAndUpdate({key: req.params.word}, {$inc: {likes: 1}}).exec()
  } catch (error) {

  }
})

app.get('/getWords/:word', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    let maxLikes = 0;
    let maxDocument = null;

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      if (collectionName !== 'users' && collectionName !== 'images') {
        // changing the model
        const Word = mongoose.model(collectionName, defaultSchema);
        const docs = await Word.find({ key: req.params.word }).exec();

        if (docs.length > 0 && maxDocument == null) {
          maxDocument = docs[0];
        }

        if (docs.length > 0 && docs[0].likes > maxLikes) {
          maxLikes = docs[0].likes;
          maxDocument = docs[0];
        }
      }
    }

    res.json(maxDocument); // Send the document with the highest likes back to the client
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(3001, () => {
    console.log('Server is running on port 3001');
})
