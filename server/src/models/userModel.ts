import mongoose, { Document, Schema, Model } from 'mongoose';

// Define an interface for the User document
interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
  pictureImg: string;
  role: string;
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
    pictureImg: {
      type: String,
      default: "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
    },
    role: String
  },
  
  {
    timestamps: true,
  }
);

// Create and export the User model
const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default UserModel;
