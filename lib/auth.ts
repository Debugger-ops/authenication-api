import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';

interface AuthCredentials {
  email: string;
  password: string;
}

export default {
  validateCredentials: async ({ email, password }: AuthCredentials) => {
    try {
      await dbConnect(); // Ensure DB connection before querying

      const user = await User.findOne({ email });

      if (!user) {
        console.error("User not found");
        return null;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      return isPasswordValid ? user : null;
    } catch (error) {
      console.error("Error validating credentials:", error);
      return null;
    }
  },

  createUser: async ({ email, password }: AuthCredentials) => {
    try {
      await dbConnect(); // Ensure DB connection before creating user

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({ email, password: hashedPassword });

      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  },
};
