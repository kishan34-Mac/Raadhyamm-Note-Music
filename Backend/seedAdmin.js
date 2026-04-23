import User from "./models/users.js";
import bcrypt from "bcryptjs";

const seedAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@raadhyam.com" });

    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // Hash the password - use environment variable in production
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || "ChangeMe@Production2024";
    const hashedPassword = await bcrypt.hash(defaultPassword, 12);

    // Create admin user
    const admin = await User.create({
      email: "admin@raadhyam.com",
      username: "raadhyam_admin",
      password: hashedPassword,
      role: "admin",
      name: "Admin",
      status: "Active"
    });

    console.log("Admin user created successfully:", admin.email);
  } catch (error) {
    console.error("Error seeding admin:", error);
    // Don't throw - allow server to continue even if seeding fails
  }
};

export default seedAdmin;
