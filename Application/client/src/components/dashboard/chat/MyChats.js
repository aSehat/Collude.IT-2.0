import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Box, Stack } from '@mui/material';

import ChatLoading from './ChatLoading';

const MyChats = ({loggedUser}) => {

    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState();

    const fetchChats = async () => {
        try {
            const {data} = await axios.get(`/api/chat`);
            console.log(data);
            setChats(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getSender = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
    }

    useEffect(() => {
        //setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        console.log(loggedUser);
        fetchChats();
    }, []);
    
  return <>
  <Box>
      <Box
        pb={3}
        px={3}
        fontSize={{base: "28px", md: "30px"}}
        display="flex"
        width="100%"
      >
          My Chats
      </Box>
      {chats ? (
          <Stack>
              {chats.map((chat) => (
                  <Box
                    onClick={() => setSelectedChat(chat)}
                    cursor="pointer"
                    bgcolor={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                    color={selectedChat === chat ? "white" : "black"}
                    px={3}
                    py={2}
                    borderRadius="lg"
                    key={chat._id}
                    >
                        <span>{!chat.isGroupChat ?
                        getSender(loggedUser, chat.users)
                        : chat.chatName}</span>
                  </Box>
              ))}
          </Stack>
      ) : (
            <ChatLoading />
      )}
   </Box>
   </>
}

export default MyChats