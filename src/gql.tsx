import { gql } from "@apollo/client";

export const REGSITER = gql`
  mutation createUser($userInput: UserInputData!) {
    createUser(userInput: $userInput) {
      fullname
      message
      username
      bio
    }
  }
`;

export const START_CONVERSATION = gql`
  mutation startConversation($username: String!) {
    startConversation(username: $username)
  }
`;

export const USERS = gql`
  query allUsers {
    allUsers {
      fullname
      username
      profilepic
      bio
      online
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const LATEST_MESSAGE = gql`
  subscription directMessageSent($id: ID!) {
    directMessageSent(id: $id) {
      time
      sentBy
      message
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendDirectMessage($id: ID!, $message: String!) {
    sendDirectMessage(id: $id, message: $message) {
      time
      message
      sentBy
    }
  }
`;

export const SET_COUNT = gql`
  mutation setcount($id: ID!) {
    setCount(id: $id)
  }
`;

export const GET_FRIENDS = gql`
  query friends {
    friends {
      username
      lastmessage
      profilepic
      conversationId
      count
      lastmsgTime
      online
    }
  }
`;

export const MESSAGES = gql`
  query directMessages($id: ID!) {
    directMessages(id: $id) {
      time
      sentBy
      message
    }
  }
`;

export const FRIENDS_UPDATE = gql`
  subscription directMessages {
    directMessages {
      time
      sentBy
      message
    }
  }
`;

export const DETAILS = gql`
  query userDetails {
    userDetails {
      bio
      fullname
      username
      profilepic
    }
  }
`;
