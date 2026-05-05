const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: [
    process.env.FRONTEND_URL || "http://localhost:5173",
    process.env.DASHBOARD_URL || "http://localhost:5174",
  ],
  credentials: true,
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/careers", require("./routes/careerRoutes"));
app.use("/api/enquiries", require("./routes/enquiryRoutes"));
app.use("/api/faqs", require("./routes/faqRoutes"));
app.use("/api/portfolio", require("./routes/portfolioRoutes"));
app.use("/api/stats",        require("./routes/statsRoutes"));
app.use("/api/testimonials", require("./routes/testimonialRoutes"));
app.use("/api/team",         require("./routes/teamRoutes"));
app.use("/api/users",        require("./routes/usersRoutes"));

app.get("/", (req, res) => res.json({ message: "API is running..." }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));