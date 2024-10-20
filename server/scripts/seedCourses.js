import mongoose from 'mongoose';
import { Courses } from '../models/Courses';
import dotenv from 'dotenv';

dotenv.config();

// Sample course data
const courseData = [
  {
    title: "JavaScript for Beginners",
    description: "Learn the basics of JavaScript, the programming language of the web.",
    image: "",
    price: 49.99,
    duration: 10,
    category: "Programming",
    createdBy: "John Doe"
  },
  {
    title: "Mastering React",
    description: "A comprehensive guide to building interactive user interfaces using React.",
    image: "",
    price: 99.99,
    duration: 20,
    category: "Web Development",
    createdBy: "Jane Smith"
  },
  {
    title: "Data Science with Python",
    description: "Learn how to analyze and visualize data using Python and popular libraries like Pandas and Matplotlib.",
    image: "",
    price: 149.99,
    duration: 30,
    category: "Data Science",
    createdBy: "Alice Johnson"
  },
  {
    title: "UI/UX Design Fundamentals",
    description: "Explore the principles of user experience and user interface design.",
    image: "",
    price: 59.99,
    duration: 15,
    category: "Design",
    createdBy: "Emily Brown"
  },
  {
    title: "Full Stack Web Development",
    description: "Become a full stack web developer by learning both front-end and back-end technologies.",
    image: "",
    price: 199.99,
    duration: 40,
    category: "Web Development",
    createdBy: "Chris Lee"
  }
];

// Function to connect to MongoDB and insert courses
async function createSampleCourses() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    await Courses.insertMany(courseData);
    console.log("Sample courses have been created successfully.");
    process.exit(); // Exit the process after seeding
  } catch (error) {
    console.error("Error creating sample courses:", error);
    process.exit(1); // Exit the process with an error code
  }
}

createSampleCourses();
