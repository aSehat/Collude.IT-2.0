import { Box } from '@mui/material';
import React from 'react';

import SingleChat from './SingleChat';

const ChatBox = ({ selectedChat }) => {
	return (
		<Box>
			<SingleChat selectedChat={selectedChat} />
		</Box>
	);
};

export default ChatBox;
