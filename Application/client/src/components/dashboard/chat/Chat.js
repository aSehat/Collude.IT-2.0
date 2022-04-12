import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';

import Message from './Message';
import SideDrawer from './SideDrawer';
import MyChats from './MyChats';
import ChatBox from './ChatBox';

const Chat = ({ auth: { user } }) => {
	const [selectedChat, setSelectedChat] = useState({});
	const [fetchAgain, setFetchAgain] = useState(false);

	return (
		<div>
			{user && <SideDrawer setSelectedChat={setSelectedChat} />}
			<Box display='flex' width='100%'>
				{user && (
					<MyChats
						selectedChat={selectedChat}
						setSelectedChat={setSelectedChat}
						fetchAgain={fetchAgain}
						loggedUser={user}
					/>
				)}
				{user && (
					<ChatBox
						selectedChat={selectedChat}
						setSelectedChat={setSelectedChat}
					/>
				)}
			</Box>
		</div>
	);
};

Chat.prototype = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(Chat);
