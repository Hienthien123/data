export interface UserModel {
    _id: string;
    username: string;
    email: string;
    profile:{
        name: string;
        avatar: string;
        bio: string;
    }
    roles: string[];
    isEnable: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  