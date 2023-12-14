export interface ReviewModel {
    _id: string;
    user_id:{
        _id: string;
        username: string;
    };
    course_id:string;
    rating: number;
    review_text: string;
    keyword: string[];
    perc_contribution: number;
    topic_id?: {
        _id?: string;
        topic?: string;
    }
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  