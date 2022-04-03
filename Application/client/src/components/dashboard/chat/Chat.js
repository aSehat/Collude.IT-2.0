import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Box from '@mui/material/Box';

import Message from './Message';
import SideDrawer from './SideDrawer';
import MyChats from './MyChats';
import ChatBox from './ChatBox';

const Chat = ({auth: {user} }) => {
  
  return (
    <div>
        {user && <SideDrawer />}
        <Box
        display="flex"
        width="100%"
        >
          {user && <MyChats loggedUser={user}/>}
          {user && <ChatBox />}
        </Box>
    </div>
  )
}

Chat.prototype = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
})


export default connect(mapStateToProps)(Chat);