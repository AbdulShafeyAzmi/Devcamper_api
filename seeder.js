const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//load env vars
dotenv.config({ path: "./config/config.env" });

// load models
const Bootcamp = require("./models/Bootcamps");
const Course = require("./models/Course");

//Connect to db
mongoose.connect(process.env.MONGO_URI);

//Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/data/bootcamp.json`, "utf-8")
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/data/course.json`, "utf-8")
);

// import into db
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    console.log("Data imported...".green.inverse);
  } catch (err) {
    console.error(err);
  }
};

// delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();

    console.log("Data destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
