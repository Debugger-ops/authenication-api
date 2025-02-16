import bcrypt from 'bcryptjs'; // You can also use bcrypt or argon2
import User from '@/models/User'; // Adjust path to your User model

interface AuthCredentials {
  email: string;
  password: string;
}

export default {
  validateCredentials: async ({ email, password }: AuthCredentials) => {
    try {
      // Find the user by email
      const user = await User.findOne({ email });

      // If no user is found
      if (!user) {
        console.error("User not found");
        return null;
      }

      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Return the user or session token here (don't return the plain user object for security reasons)
        return user; // or return a token/session
      } else {
        console.error("Incorrect password");
        return null;
      }
    } catch (error) {
      console.error("Error validating credentials:", error);
      return null;
    }
  },

  // Assuming createUser is implemented here, which would hash the password before storing the user
  createUser: async (userDetails: { email: string; password: string }) => {
    try {
      // Hash the user's password before saving
      const hashedPassword = await bcrypt.hash(userDetails.password, 10);

      // Create a new user and save to the database
      const newUser = new User({
        email: userDetails.email,
        password: hashedPassword,
      });

      await newUser.save();

      return newUser; // Return the new user or a session token
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  },
};
