import React from 'react';
import styled from 'styled-components';
import ProjectsBoard from './components/ProjectsBoard';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import TasksBoards from './components/TasksBoards';
const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 70px;
`

function App() {
  return  (
    <BrowserRouter>
      <AppWrapper>
        <Routes>
          <Route path='/' element={<ProjectsBoard />}/>
          <Route path='/:id' element={<TasksBoards />}/>
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
