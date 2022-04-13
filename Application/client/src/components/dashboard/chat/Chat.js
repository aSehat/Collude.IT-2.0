import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';

import Message from './Message';
import SideDrawer from './SideDrawer';
import MyChats from './MyChats';
// import ChatBox from './ChatBox';
import SingleChat from './SingleChat';

const Chat = ({ auth: { user }, chat: { chats, chat } }) => {
	// const [selectedChat, setSelectedChat] = useState({});
	// const [fetchAgain, setFetchAgain] = useState(false);

	return (
		<div className='page'>{user && <SingleChat selectedChat={chat} />}</div>
	);
};

Chat.prototype = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	chat: state.chat,
});

export default connect(mapStateToProps)(Chat);
