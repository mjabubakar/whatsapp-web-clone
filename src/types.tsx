export type Friend = {
  username: string;
  profilepic: string;
  conversationId: number;
  lastmessage: string;
  count: number;
  online: string;
  lastmsgTime: string;
};

type User = {
  fullname: string;
  username: string;
  profilepic: string;
  bio: string;
  online: string;
};

export type Users = {
  allUsers: User[];
};

export type Friends = {
  friends: Friend[];
};

type Message = {
  time: string;
  sentBy: string;
  message: string;
};

export type Messages = {
  directMessages: Message[];
};

interface Data {
  bio: string;
  fullname: string;
  username: string;
  profilepic: string;
}

export interface userDetails {
  userDetails: Data;
}
