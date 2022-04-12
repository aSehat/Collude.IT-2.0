import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Stack } from '@mui/material';

import { connect } from 'react-redux';

import ChatLoading from './ChatLoading';

import { useDispatch } from 'react-redux';
import { setChat } from '../../../actions/chat';

const MyChats = ({ selectedChat, chats, user }) => {
	const dispatch = useDispatch();

	const getSender = (users) => {
		return users[0]._id === user._id ? users[1].name : users[0].name;
	};

	return (
		<div>
			<div>My Chats</div>

			<div>
				{chats &&
					chats.map((chat) => (
						<Box
							onClick={() => {
								dispatch(setChat(chat));
								//Redirect the user to the chat page if they are not already on it
								if (window.location.pathname !== '/chat') {
									window.location.href = '/chat';
								}
							}}
							cursor='pointer'
							bgcolor={
								selectedChat === chat ? '#01303f' : '#E8E8E8'
							}
							color={selectedChat === chat ? 'white' : 'black'}
							px={3}
							py={2}
							borderRadius='lg'
							key={chat._id}
							className='chatItem'
						>
							<span>
								{!chat.isGroupChat
									? getSender(chat.users)
									: chat.chatName}
							</span>
						</Box>
					))}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

// export default MyChats;
export default connect(mapStateToProps)(MyChats);
