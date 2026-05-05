const Blog        = require("../models/Blog");
const JobPosting  = require("../models/JobPosting");
const JobApplication = require("../models/JobApplication");
const Enquiry     = require("../models/Enquiry");
const Portfolio   = require("../models/Portfolio");

// Returns last N months labels e.g. ["Jan", "Feb", ...]
function lastNMonths(n) {
  const months = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      label: d.toLocaleString("en-US", { month: "short" }),
      year:  d.getFullYear(),
      month: d.getMonth(), // 0-indexed
    });
  }
  return months;
}

async function monthlyCounts(Model, filter = {}) {
  const months = lastNMonths(6);
  const start  = new Date(months[0].year, months[0].month, 1);

  const docs = await Model.find({
    ...filter,
    createdAt: { $gte: start },
  }).select("createdAt");

  return months.map(({ label, year, month }) => ({
    label,
    count: docs.filter((d) => {
      const dd = new Date(d.createdAt);
      return dd.getFullYear() === year && dd.getMonth() === month;
    }).length,
  }));
}

exports.getStats = async (req, res) => {
  try {
    const [blogs, jobs, applications, enquiries, portfolio] = await Promise.all([
      Blog.countDocuments(),
      JobPosting.countDocuments(),
      JobApplication.countDocuments(),
      Enquiry.countDocuments(),
      Portfolio.countDocuments({ isActive: true }),
    ]);

    const newEnquiries    = await Enquiry.countDocuments({ status: "New" });
    const newApplications = await JobApplication.countDocuments({ status: "New" });

    res.json({ blogs, jobs, applications, enquiries, portfolio, newEnquiries, newApplications });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getChartData = async (req, res) => {
  try {
    const [blogsM, appsM, enquiriesM, portfolioM] = await Promise.all([
      monthlyCounts(Blog),
      monthlyCounts(JobApplication),
      monthlyCounts(Enquiry),
      monthlyCounts(Portfolio),
    ]);

    // Merge into one array per month
    const months = lastNMonths(6);
    const data = months.map(({ label }, i) => ({
      month:        label,
      Blogs:        blogsM[i].count,
      Applications: appsM[i].count,
      Enquiries:    enquiriesM[i].count,
      Portfolio:    portfolioM[i].count,
    }));

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
