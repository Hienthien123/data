export interface PaymentModel {
    _id: string;
    user_id:{
        _id: string;
        username: string;
    };
    course_id:{
        _id: string;
        title: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  