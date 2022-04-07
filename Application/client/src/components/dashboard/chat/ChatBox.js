import { Box } from '@mui/material';
import React from 'react'

import SingleChat from './SingleChat';

const ChatBox = ({selectedChat, setSelectedChat}) => {
  return (
    <Box>
      <SingleChat selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
    </Box>
  )
}

export default ChatBox