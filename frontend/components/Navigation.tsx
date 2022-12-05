import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Badge, BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import { useScriptLink } from '../hooks/useScriptLink';

export const Navigation: React.FC<{}> = ({ }) => {
  const location = useLocation()
  const { tasks } = useScriptLink();
  const numTasks = tasks.filter(t => !t.done).length;

  const index = ['/home', '/tasks'].findIndex(path => location.pathname.startsWith(path));

  return (
    <Paper elevation={1}>
      <BottomNavigation
        showLabels
        value={index}
      >
        <BottomNavigationAction component={Link} to="/home" label="Home" icon={<HomeRoundedIcon />} />
        <BottomNavigationAction component={Link} to="/tasks" label="Tasks" icon={<Badge badgeContent={numTasks}><AssignmentRoundedIcon /></Badge>} />
      </BottomNavigation>
    </Paper>
  );
}

export default Navigation;