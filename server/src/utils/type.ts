export interface IUser {
  name?: string;
  email: string;
  password?: string;
  pictureImg: string;
  role: string;
  status: string;
}

export interface Account{
  status: {
    Active: "Active",
    Inactive: "Inactive"
  }
}