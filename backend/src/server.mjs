import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';
import bodyParser from 'body-parser';
import multer from 'multer'; 
import path from 'path'; 
import { fileURLToPath } from 'url';
import csv from 'csv-parser';  
import fs from 'fs';
import { Parser } from 'json2csv';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authenticateToken from './authMiddleware.js';
import portfinder from 'portfinder';

dotenv.config();
const objectId = ObjectId.createFromTime(Math.floor(Date.now() / 1000));
const port = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let collection;
let usersCollection;
let recommendedCollegesCollection;
let neetCollection;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db('college_predictor');
    usersCollection = db.collection('User');
    collection = db.collection('Colleges');
    recommendedCollegesCollection = db.collection('Recommended');
    neetCollection = db.collection('NeetPredictor');

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
connectToDB();

app.post('/api/register', async (req, res) => {
  try {
    const newUser = req.body;
    const user = await usersCollection.insertOne(newUser);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password, type } = req.body;
  try {
    const user = await usersCollection.findOne({ email, password, type });
    if (user) {
      // Create a JWT token
      const token = jwt.sign(
        { userId: user._id, userType: user.type },
        process.env.JWT_SECRET || 'yourSecretKey', // Use environment variable
        { expiresIn: '1h' } // Token expiration time
      );

      // Send the token and user data to the frontend
      res.json({ success: true, token, user });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
});

app.get('/api/user',async (req, res) => { 
  try {
    const user = await usersCollection.findOne({ _id: new objectId(req.user.userId) });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user' });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../build'))); // Adjust path if needed

// Handle any unmatched routes by sending the index.html file from the frontend build
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
const uploadsDir = path.join(__dirname, 'uploads');

async function insertCsvDataToDb(filePath, collection) {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Convert specific fields to integers (if present)
        if (data.min_rank) data.min_rank = parseInt(data.min_rank, 10);
        if (data.max_rank) data.max_rank = parseInt(data.max_rank, 10);
        if (data.cutoff) data.cutoff = parseInt(data.cutoff, 10);
        if (data.percentile) data.percentile = parseFloat(data.percentile); // Convert percentile to float

        results.push(data);
      })
      .on('end', async () => {
        try {
          await collection.deleteMany({});
          await collection.insertMany(results);
          fs.unlinkSync(filePath); // Delete the file after processing
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (error) => reject(error));
  });
}


// Route for uploading MHT CET dataset CSV
app.post('/upload-mhtcet', upload.single('csvFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    await insertCsvDataToDb(req.file.path, collection); // Insert data into MHT CET collection
    res.status(200).json({ message: 'MHT CET dataset updated successfully' });
  } catch (error) {
    console.error('Error updating MHT CET dataset:', error);
    res.status(500).json({ error: 'Failed to update MHT CET dataset' });
  }
});

// Route for uploading NEET dataset CSV
app.post('/upload-neet', upload.single('csvFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  try {
    await insertCsvDataToDb(req.file.path, neetCollection); // Insert data into NEET collection
    res.status(200).json({ message: 'NEET dataset updated successfully' });
  } catch (error) {
    console.error('Error updating NEET dataset:', error);
    res.status(500).json({ error: 'Failed to update NEET dataset' });
  }
});

app.get('/download-mhtcet', async (req, res) => {
  try {
    const data = await collection.find({}).toArray();
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment('mhtcet_dataset.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error downloading MHT CET dataset:', error);
    res.status(500).json({ error: 'Failed to download MHT CET dataset' });
  }
});

// Route to download NEET dataset
app.get('/download-neet', async (req, res) => {
  try {
    const data = await neetCollection.find({}).toArray();
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment('neet_dataset.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error downloading NEET dataset:', error);
    res.status(500).json({ error: 'Failed to download NEET dataset' });
  }
});

app.get('/api/filters', async (req, res) => {
  try {
    const { city, course, branch, categorie} = req.query;
    let query = {};

    if (city) {
      query['District'] = city;  
    }

    if (course) {
      query['Course Name'] = course;  
    }

    if (branch) {
      query['Branch Name'] = branch;  
    }

    if (categorie) {
      query['Category'] = categorie;  
    }

    const college_name = await collection.distinct('College Name', query);
    const branches = await collection.distinct('Branch Name', query);
    const categories = await collection.distinct('Category', query);
    const courses = await collection.distinct('Course Name', query);
    const gender = await collection.distinct('Gender', query);
    const cityData = await collection.distinct('District', query);
    const links = await collection.distinct('Website URL', query);

    res.json({ college_name, branches, categories, gender, courses, city: cityData, links });
  } catch (error) {
    console.error('Error occurred while fetching filters', error);
    res.status(500).json({ error: 'An error occurred while fetching filters' });
  }
});


app.get('/api/Neetfilters', async (req, res) => {
  try {
    const institutes = await neetCollection.distinct('Allotted Institute');
    const categories = await neetCollection.distinct('Alloted Category');
    const courses = await neetCollection.distinct('Course');
    const quotas = await neetCollection.distinct('max_quota');
    res.json({ institutes, categories, courses, quotas });
  } catch (error) {
    console.error('Error occurred while fetching filters from neetcoll', error);
    res.status(500).json({ error: 'An error occurred while fetching filters' });
  }
});

app.post('/api/predict', async (req, res) => {
  const { percentile, city, Branch_Name, Category, Course_Name, gender } = req.body;

  const query = {};

  if (city && city.trim() !== '' && city !== '-- select an option --') {
    query['District'] = city.trim(); 
  }

  if (percentile && percentile.trim() !== '') {
    const percentileNumber = parseFloat(percentile);
    if (!isNaN(percentileNumber)) {
      // Calculate the minimum percentile for the range
      const minPercentile = percentileNumber - 5 < 0 ? 0 : percentileNumber - 5;
      query['percentile'] = { $gte: minPercentile, $lte: 100 }; // Adjust the range here
    } else {
      return res.status(400).json({ error: 'Invalid percentile value' });
    }
  }

  if (Branch_Name && Branch_Name.trim() !== '' && Branch_Name !== '-- select an option --') {
    query['Branch Name'] = Branch_Name.trim();
  }

  if (gender && gender.trim() !== '' && gender !== '-- select an option --') {
    query['Gender'] = gender.trim();
  }

  if (Category && Category.trim() !== '' && Category !== '-- select an option --') {
    query['Category'] = Category.trim();
  }
  if (Course_Name && Course_Name.trim() !== '' && Course_Name !== '-- select an option --') {
    query['Course Name'] = Course_Name.trim();
  }

  try {
    const colleges = await collection.find(query).sort({ percentile: -1 }).toArray();
    const uniqueColleges = Array.from(new Map(colleges.map(college => [college['College Name'], college])).values());
    res.json(uniqueColleges);
  } catch (error) {
    console.error('Error occurred while fetching colleges', error);
    res.status(500).json({ error: 'An error occurred while fetching colleges' });
  }
});

app.post('/api/Neetpredict', async (req, res) => {
  const { maxRank, institute, category, course, quota } = req.body;  // Include quota
  const query = {};

  if (institute && institute.trim() !== '') {
    query['Allotted Institute'] = institute.trim();
  }
  if (maxRank && maxRank.trim() !== '') {
    const rankNumber = parseFloat(maxRank);
    if (!isNaN(rankNumber)) {
      query['max_rank'] = { $gte: rankNumber };
    } else {
      return res.status(400).json({ error: 'Invalid rank value' });
    }
  }if (course && course.trim() !== '') {
    query['Course'] = course.trim();
  }
  if (category && category.trim() !== '') {
    query['Alloted Category'] = category.trim();
  }
  if (quota && quota.trim() !== '') {
    query['max_quota'] = quota.trim();  
  }

  try {
    const colleges = await neetCollection.find(query).sort({ max_rank: 1 }).limit(50).toArray();
    res.json(colleges);
  } catch (error) {
    console.error('Error occurred while fetching colleges from neetcoll', error);
    res.status(500).json({ error: 'An error occurred while fetching colleges' });
  }
});

app.get('/api/recommended', async (req, res) => {
  try {
    const db = client.db('college_predictor');
    const recommendedCollection = db.collection('Recommended'); 
    const recommendedColleges = await recommendedCollection.find(
      {}, 
      {
        projection: { 
          _id: 1, 
          Name: 1,
          'Unique ID': 1,
          City: 1, 
          Branch: 1 
        }
      }
    ).toArray();

    // Add a default value for missing Branch fields
    const collegesWithBranch = recommendedColleges.map(college => ({
      ...college,
      Branch: college.Branch || 'Unknown Branch'
    }));

    res.json(collegesWithBranch);
  } catch (error) {
    console.error('Error occurred while fetching recommended colleges', error);
    res.status(500).json({ error: 'An error occurred while fetching recommended colleges' });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const students = await usersCollection.find({ type: 'student' }).toArray();
    res.json(students);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
app.delete('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/college-users', async (req, res) => {
  try {
    const collegeUsers = await usersCollection.find({ type: "college" }).toArray();
    const collegeUserDetails = await Promise.all(collegeUsers.map(async (user) => {
      const courses = await coursesCollection.find({ college: user.college }).toArray();
      return { user, courses };
    }));
    res.status(200).json(collegeUserDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching college users and courses', error });
  }
});

app.get('/api/student-users', async (req, res) => {
  try {
    const studentUsers = await usersCollection.find({ type: "student" }).toArray();
    const studentUserDetails = await Promise.all(studentUsers.map(async (user) => {
      const purchases = await boughtCoursesCollection.find({ 'user._id': user._id }).toArray();
      return { user, purchases };
    }));
    res.status(200).json(studentUserDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student users and purchases', error });
  }
});

app.get('/config', (req, res) => {
  res.json({ apiUrl: `http://localhost:${port}` });
});


portfinder.getPortPromise()
  .then((port) => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
// changes pushed