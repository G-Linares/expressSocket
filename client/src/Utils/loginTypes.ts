export interface UserType {
    username: string;
    password: string;
  }
  
  export interface GlobalContexttype {
    user: any;
    setUser: (user: any) => void;
  }