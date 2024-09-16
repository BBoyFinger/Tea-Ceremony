import mongoose, { Document, Schema, Model } from 'mongoose';

// Define an interface for the User document
interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
}

// Define the schema for the User model
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the User model
const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default UserModel;
