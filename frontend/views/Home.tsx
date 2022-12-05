import React from 'react';
import { Stack, Typography } from '@mui/material';

const HomeView: React.FC<{}> = () => {
  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={2} sx={{ height: '100%' }}>
      <Typography variant="h4">ToDo List Example</Typography>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ height: '100%' }}>
        <Typography variant="body1" align="center">
          This is an example application that uses a React App embedded in a Google Sheet to create a ToDo list. Go to the tasks page to continue.
        </Typography>
      </Stack>
    </Stack >
  )
}

export default HomeView;