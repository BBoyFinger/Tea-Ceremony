export interface IBlog {
  _id: string;
  title: string;
  content: string;
  images: {
    url: string;
    title: string;
  }[];
}
