import React, { useState } from 'react';
import { Grid, IconButton, InputBase, Paper } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { addTask } from '../taskList/taskListSlice';
import { useDispatch } from 'react-redux';

export function Menu() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('')

  return (
    <Grid component="form" className="Menu">
      <InputBase
        className="Input"
        placeholder="Add new task"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <IconButton 
        className="button" 
        aria-label="search"
        onClick={() => dispatch(addTask(title))}
      >
        <AddCircleOutlineIcon />
      </IconButton>
    </Grid>
  );
}