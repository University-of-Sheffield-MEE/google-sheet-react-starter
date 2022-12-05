import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, CardContent, CardActions, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Tooltip, Typography, List, ListItem, ListItemText, Input } from '@mui/material';
import { Task, useScriptLink } from '../hooks/useScriptLink';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { LoadingButton } from '@mui/lab';

const TaskItem: React.FC<{ title: string, done: boolean, loading?: boolean, onDone?: (t: string) => void }> = ({ title, done, loading=false, onDone }) => {
  return (
    <ListItem
      secondaryAction={
        !done ? <IconButton edge="end" aria-label="done" color="primary" disabled={loading} onClick={() => onDone && onDone(title)}>
          <CheckCircleOutlineRoundedIcon />
        </IconButton> : null
      }
    >
      <ListItemText primary={title} />
    </ListItem>
  )
}

const NewTask: React.FC<{ onAdd: (t: string) => void }> = ({ onAdd }) => {
  const [title, setTitle] = useState<string>('');
  const onAddTask = () => {
    onAdd(title);
    setTitle('');
  }
  return (
    <ListItem
    secondaryAction={
      <IconButton edge="end" aria-label="done" color="primary" disabled={title===''} onClick={onAddTask}>
        <AddCircleOutlineRoundedIcon />
      </IconButton>
    }
    >
      <TextField label="New Task" size="small" value={title} onChange={e => setTitle(e.target.value)} />
    </ListItem>
  );
}

const TaskList: React.FC<{
  tasks: Task[], onDone?: (t: string) => void, loading?: boolean, loadingNew?: boolean, onAdd?: (t: string) => void
}> = ({ tasks, loading=false, loadingNew=false, onDone, onAdd }) => {
  return (
    <List sx={{ minWidth: '300px' }}>
      {tasks.map(t => <TaskItem key={t.title} title={t.title} done={t.done} loading={loading} onDone={onDone} />)}
      {loadingNew ? <TaskItem title="Loading..." done={false} loading={true} /> : null}
      {onAdd ? <NewTask onAdd={onAdd} /> : null}
    </List>
  )
}

const TasksView: React.FC<{}> = () => {
  const { loading, tasks, addTask, taskDone } = useScriptLink();

  const todo = tasks.filter(t => !t.done);
  const done = tasks.filter(t => t.done);

  return (
    <>
      <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={2} sx={{ height: '100%' }}>
        <Typography variant="h4">Tasks</Typography>

        <Typography variant="h5">ToDo</Typography>
        <TaskList tasks={todo} onDone={taskDone} onAdd={addTask} loading={loading !== null} loadingNew={loading === 'addTask'}/>

        <Typography variant="h5">Done</Typography>
        <TaskList tasks={done} />
      </Stack>
    </>
  )
}

export default TasksView;