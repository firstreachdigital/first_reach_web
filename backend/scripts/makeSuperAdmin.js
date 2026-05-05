// Run once: node scripts/makeSuperAdmin.js <email>
// Example:  node scripts/makeSuperAdmin.js admin@firstreach.com

require("dotenv").config();
const mongoose = require("mongoose");
const User     = require("../models/User");

const email = process.argv[2];
if (!email) {
  console.error("Usage: node scripts/makeSuperAdmin.js <email>");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const user = await User.findOne({ email });
  if (!user) {
    console.error(`No user found with email: ${email}`);
    process.exit(1);
  }
  user.role = "superadmin";
  await user.save();
  console.log(`✅ ${user.name} (${user.email}) is now a superadmin`);
  process.exit(0);
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
