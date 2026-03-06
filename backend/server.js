const Application = require("./models/Application");
const connectDB = require("./db");
const express = require("express");
const cors = require("cors");

connectDB();

console.log("Step 1: Packages loaded");

const app = express();

console.log("Step 2: Express app created");

app.use(cors());
app.use(express.json());

console.log("Step 3: Middleware configured");

app.get("/", (req, res) => {
  console.log("Step 4: Root API called");
  res.send("Backend server is running");
});


// POST API → Save form submission
app.post("/api/applications", async (req, res) => {

  console.log("Step 6: Form submission API called");

  const { name, email, phone, message } = req.body;

  console.log("Step 7: Data received from frontend");

  console.log({
    name,
    email,
    phone,
    message
  });

  try {

    const newApplication = new Application({
      name,
      email,
      phone,
      message
    });

    await newApplication.save();

    console.log("Step 8: Data saved to MongoDB");

    res.status(200).json({
      success: true,
      message: "Application saved successfully"
    });

  } catch (error) {

    console.error("Database Error:", error);

    res.status(500).json({
      success: false,
      message: "Error saving data to database"
    });

  }

});


// GET API → Fetch all applications (Admin dashboard)
app.get("/api/applications", async (req, res) => {

  console.log("Step 9: Fetching applications from MongoDB");

  try {

    const applications = await Application.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: applications
    });

  } catch (error) {

    console.error("Error fetching applications:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching data"
    });

  }

});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Step 5: Server running on port ${PORT}`);
});