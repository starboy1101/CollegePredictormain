import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 4000;

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let collection;
let recommendedCollegesCollection;
let neetCollection;
let users = {};
let otps = {};


async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db('college_predictor');
    collection = db.collection('Colleges');
    recommendedCollegesCollection = db.collection('Recommended');
    neetCollection = db.collection('NeetPredictor');

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

connectToDB();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password',
  },
});

app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999); 
  otps[email] = otp;

  transporter.sendMail({
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP is ${otp}`,
  }, (error, info) => {
      if (error) {
          return res.status(500).json({ message: 'Error sending OTP' });
      }
      res.json({ message: 'OTP sent' });
  });
});

app.post('/verify-otp', (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (otps[email] && otps[email] === parseInt(otp, 10)) {
      users[email] = newPassword;
      delete otps[email]; 
      res.json({ message: 'Password reset successful' });
  } else {
      res.status(400).json({ message: 'Invalid OTP' });
  }
});

app.get('/api/filters', async (req, res) => {
  try {
    const { city, course, branch } = req.query;
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

    const college_name = await collection.distinct('College Name', query);
    const branches = await collection.distinct('Branch Name', query);
    const categories = await collection.distinct('Category', query);
    const courses = await collection.distinct('Course Name', query);
    const cityData = await collection.distinct('District', query);
    const links = await collection.distinct('Website URL', query);

    res.json({ college_name, branches, categories, courses, city: cityData, links });
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
  const { percentile, city, Branch_Name, Category, Course_Name } = req.body;

  const query = {};

  if (city && city.trim() !== '' && city !== '-- select an option --') {
    query['District'] = city.trim(); 
  }

  if (percentile && percentile.trim() !== '') {
    const percentileNumber = parseFloat(percentile);
    if (!isNaN(percentileNumber)) {
      query['percentile'] = { $lte: percentileNumber };
    } else {
      return res.status(400).json({ error: 'Invalid percentile value' });
    }
  }

  if (Branch_Name && Branch_Name.trim() !== '' && Branch_Name !== '-- select an option --') {
    query['Branch Name'] = Branch_Name.trim();
  }

  if (Category && Category.trim() !== '' && Category !== '-- select an option --') {
    query['Category'] = Category.trim();
  }

  if (Course_Name && Course_Name.trim() !== '' && Course_Name !== '-- select an option --') {
    query['Course Name'] = Course_Name.trim();
  }
  try {
    const colleges = await collection.find(query).sort({ percentile: -1 }).limit(10).toArray();
    res.json(colleges);
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
    const colleges = await neetCollection.find(query).sort({ min_rank: 1 }).limit(10).toArray();
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


async function addUserRecord(req, res) {
  try {
    const db = client.db("college_predictor");
    const userCollection = db.collection("User");

    const { username, password, email, mobile } = req.body;

    if (!username || !password || !email) {
      return res.status(400).send("Required fields are missing");
    }

    const inputDoc = { username, password, email, mobile };

    await userCollection.insertOne(inputDoc);
    res.json({ operation: "success" });
  } catch (err) {
    console.error("Error in addUserRecord:", err);
    res.status(500).send("Error: " + err.message);
  }
}

async function loginByPost(req, res) {
  try {
    const db = client.db("college_predictor");
    const userCollection = db.collection("User");

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Required fields are missing");
    }

    const query = { email, password };
    const userRef = await userCollection.findOne(query);

    if (!userRef) {
      return res.status(401).send("Invalid email or password");
    }

    res.json(userRef);
  } catch (err) {
    console.error("Error in loginByPost:", err);
    res.status(500).send("Error: " + err.message);
  }
}

app.post('/addtodo', async (req, res) => {
  try {
    const db = client.db("mydb");
    const contactUsCollection = db.collection("contactus");

    const { name, email, description } = req.body;

    if (!name || !email || !description) {
      return res.status(400).send("Required fields are missing");
    }

    const contactData = { name, email, description };

    await contactUsCollection.insertOne(contactData);
    res.status(200).json({ operation: "success" });
  } catch (error) {
    console.error("Error in addtodo:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/addUser", addUserRecord);
app.post("/login-by-post", loginByPost);

app.listen(4000, () => {
  console.log("Server started on port 4000");
});