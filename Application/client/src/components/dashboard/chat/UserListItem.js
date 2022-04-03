import { Box } from '@mui/material'
import React from 'react'

const UserListItem = ({user}) => {
  return (
    <Box>
        <span>{user.name}</span>
        <span>{user.email}</span>
    </Box>
  )
}

export default UserListItem