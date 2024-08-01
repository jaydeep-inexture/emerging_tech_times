import {TabContext, TabList, TabPanel} from '@mui/lab';
import {Box, Tab} from '@mui/material';
import {useState} from 'react';

import {useIsMobile} from '@/hooks/useIsMobile';
import NewsData from './NewsData';

const News = () => {
  const [tabValue, setTabValue] = useState('1');
  const {isMobile} = useIsMobile();

  return (
    <>
      {isMobile ? (
        <>
          <NewsData title={'Latest News'} />
        </>
      ) : (
        <>
          <Box sx={{width: '100%', typography: 'body1', paddingY: '20px'}}>
            <TabContext value={tabValue}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <TabList
                  onChange={(event, newValue) => setTabValue(newValue)}
                  aria-label='lab API tabs example'
                  sx={{
                    display: 'flex',
                    width: '100%',
                    backgroundColor: '#0F172A',
                    '& .MuiTab-root': {
                      color: 'white',
                      fontWeight: 600,
                    },
                    '& .Mui-selected': {
                      color: 'white',
                      borderBottom: '4px solid white', // Change to your desired border color
                    },
                    '& .css-heg063-MuiTabs-flexContainer': {
                      justifyContent: 'space-around',
                    },
                  }}
                >
                  <Tab label='Latest News' value='1' />
                  <Tab label='Most Readed News' value='2' />
                  <Tab label='Trending News' value='3' />
                  <Tab label='Politics' value='4' />
                  <TabList label='Other' value='5' />
                </TabList>
              </Box>
              <TabPanel value='1'>
                <NewsData title={'Latest News'} />
              </TabPanel>
              <TabPanel value='2'>
                <NewsData title={'Most Readed News'} />
              </TabPanel>
              <TabPanel value='3'>
                <NewsData title={'Trending News'} />
              </TabPanel>
              <TabPanel value='4'>
                <NewsData title={'Politics'} />
              </TabPanel>
              <TabPanel value='5'>
                <NewsData title={'Other News'} />
              </TabPanel>
            </TabContext>
          </Box>
        </>
      )}
    </>
  );
};

export default News;
