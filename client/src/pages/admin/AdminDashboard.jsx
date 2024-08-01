import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {styled} from '@mui/material/styles';

import Posts from '../../components/admin/Posts';
import Profile from '../../components/admin/Profile';
import UsersTable from '../../components/admin/UsersTable';
import PostForm from '../../components/admin/NewsForm';

const drawerWidth = 240;

const Main = styled('main')(({theme}) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: `${drawerWidth}px`,
  backgroundColor: '#f0f2f5',
}));

const Sidebar = styled(Box)(({theme}) => ({
  width: drawerWidth,
  flexShrink: 0,
  backgroundColor: '#0F172A',
  color: '#fff',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
}));

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  let content;

  switch (activeTab) {
    case 0:
      content = <Profile />;
      break;
    case 1:
      content = <Posts />;
      break;
    case 2:
      content = <PostForm />;
      break;
    case 3:
      content = <UsersTable />;
      break;
    default:
      content = <Profile />;
  }

  return (
    <Box sx={{display: 'flex'}}>
      <Sidebar>
        <Tabs
          orientation='vertical'
          value={activeTab}
          onChange={handleTabChange}
          textColor='inherit'
          indicatorColor='secondary'
          aria-label='Vertical tabs example'
          sx={{
            '& .MuiTab-root': {
              color: '#fff',
              '&.Mui-selected': {
                backgroundColor: '#1e293b',
              },
            },
          }}
        >
          <Tab label='Profile' />
          <Tab label='Posts' />
          <Tab label='Create Post' />
          <Tab label='Users' />
        </Tabs>
      </Sidebar>
      <Main>{content}</Main>
    </Box>
  );
};

export default AdminDashboard;
