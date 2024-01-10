const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

//import Roues
const authRoutes = require("./routes/auth");
const contact_formRoutes = require("./routes/contact_form");

// setup app
const app = express();

// using middleware
app.use(express.json());
app.use(cors());

//configuring database
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6"
  )
  .then(() => console.log("Database Connected"))
  .catch((err) =>
    console.log("ErrorOccured while Connecing Database" + err.message)
  );

//server check route
app.get("/", (req, res) =>
  res.json({ success: true, message: "Server is Running Fine " })
);

//External Routes
app.use("/auth", authRoutes);
app.use("contactForm", contact_formRoutes);

// starting app
const PORT = 8000;
app.listen(PORT, () => console.log(`Server is Running on PORT : ${PORT}`));
