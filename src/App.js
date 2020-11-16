import React from 'react';
import { Container, Grid} from "@material-ui/core";
import { Menu } from './menu/Menu';
import { TaskList } from './taskList/TaskList';
import './App.css';

function App() {
  return (
    <Container maxWidth="sm">
      <Menu />
      <Grid container> 
        <TaskList />
      </Grid>
    </Container>
  );
}

export default App;
