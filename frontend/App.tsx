import React from 'react';
import { Box, Container } from "@mui/material/index"
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { ScriptLinkProvider } from './hooks/useScriptLink';
import Navigation from './components/Navigation';
import HomeView from './views/Home';
import TasksView from './views/Tasks';

const App: React.FC<{}> = () => {
  return (
    <ScriptLinkProvider>
      <MemoryRouter initialEntries={["/home"]}>
        <Box sx={{ height: '100vh', display: 'flex', flexFlow: 'column nowrap' }}>
          <Container sx={{ flex: '1 1 auto', marginBottom: '8px' }}>
            <Routes>
              <Route path="home" element={<HomeView />} />
              <Route path="tasks" element={<TasksView />} />
            </Routes>
          </Container>
          <Navigation />
        </Box>
      </MemoryRouter>
    </ScriptLinkProvider>
  );
}

export default App;