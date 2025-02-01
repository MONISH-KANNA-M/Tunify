require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const auth = require('./middleware/auth');
const User = require('./models/User');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Auth Routes
app.post('/api/register', upload.single('profilePicture'), async (req, res) => {
  try {
    const { username, email, password, fullName, bio } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      fullName,
      bio,
      profilePicture: req.file ? `/uploads/${req.file.filename}` : null
    });

    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ user: userResponse, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ user: userResponse, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Protected Routes
app.get('/api/profile', auth, async (req, res) => {
  try {
    const user = req.user;
    const userResponse = user.toObject();
    delete userResponse.password;
    res.json(userResponse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/profile', auth, upload.single('profilePicture'), async (req, res) => {
  try {
    const updates = req.body;
    
    if (req.file) {
      updates.profilePicture = `/uploads/${req.file.filename}`;
    }

    // Don't allow password update through this route
    delete updates.password;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true }
    );

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json(userResponse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Favorites Routes
app.post('/api/favorites', auth, async (req, res) => {
  try {
    const { songId, title, artist, albumArt, audioUrl } = req.body;
    
    const user = req.user;
    
    // Check if song is already in favorites
    if (user.favorites.some(fav => fav.songId === songId)) {
      return res.status(400).json({ error: 'Song already in favorites' });
    }

    user.favorites.push({ songId, title, artist, albumArt, audioUrl });
    await user.save();

    res.json(user.favorites);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/favorites/:songId', auth, async (req, res) => {
  try {
    const user = req.user;
    user.favorites = user.favorites.filter(fav => fav.songId !== req.params.songId);
    await user.save();
    res.json(user.favorites);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/favorites', auth, async (req, res) => {
  try {
    const user = req.user;
    res.json(user.favorites);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
