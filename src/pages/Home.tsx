import React, { ReactNode, useContext, useState, createContext } from "react";
import Container from "../components/container";
import { isMobile } from "react-device-detect";

type ContextType = {
  friendSearch: string;
  setFriendSearch: (value: string) => void;
  messageSearch: string;
  setMessageSearch: (value: string) => void;
  listOptions: boolean;
  setListOptions: (value: boolean) => void;
  newChat: boolean;
  setNewChat: (value: boolean) => void;
  userSearch: string;
  setUserSearch: (value: string) => void;
  id: number;
  setId: (value: number) => void;
  displayChat: boolean;
  setDisplayChat: (value: boolean) => void;
  current: currentType;
  setCurrent: (value: currentType) => void;
  prev: string;
  setPrev: (value: string) => void;
  profile: boolean;
  setProfile: (value: boolean) => void;
  show: boolean;
  setShow: (value: boolean) => void;
};

type currentType = {
  username: string;
  online: string;
  profilepic: string;
};
//@ts-ignore
const Context = createContext<ContextType>();

interface Props {
  children: ReactNode;
}

export const Provider = ({ children }: Props) => {
  const [friendSearch, setFriendSearch] = useState<string>("");
  const [messageSearch, setMessageSearch] = useState<string>("");
  const [listOptions, setListOptions] = useState<boolean>(false);
  const [newChat, setNewChat] = useState<boolean>(false);
  const [userSearch, setUserSearch] = useState<string>("");
  const [id, setId] = useState<number>(1);
  const [displayChat, setDisplayChat] = useState<boolean>(false);
  const [profile, setProfile] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [current, setCurrent] = useState<currentType>({
    username: "",
    profilepic: "",
    online: "",
  });
  const [prev, setPrev] = useState<string>("");

  return (
    <Context.Provider
      value={{
        friendSearch,
        setFriendSearch,
        messageSearch,
        setMessageSearch,
        listOptions,
        setListOptions,
        newChat,
        setNewChat,
        userSearch,
        setUserSearch,
        id,
        setId,
        displayChat,
        setDisplayChat,
        current,
        setCurrent,
        prev,
        setPrev,
        profile,
        setProfile,
        show,
        setShow,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useMyContext = () => useContext(Context);

const Home: React.FC = () => {
  if (isMobile) {
    return <div> This content is unavailable on mobile</div>;
  }

  return <Provider>{isMobile ? <div>Hey</div> : <Container />} </Provider>;
};

export default Home;
