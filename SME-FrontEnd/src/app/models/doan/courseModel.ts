export interface CourseModel {
    _id: string;
    title: string;
    description: string;
    price: number;
    categories: string[];
    tags: string[];
    image?: string;
    chapters: any[]; 
    reviews: any[]; 
    payments: any[];
    isDelete: boolean;
    author_id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  