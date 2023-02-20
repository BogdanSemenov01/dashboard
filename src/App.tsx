import React from 'react';
import styled from 'styled-components';
import ProjectsBoard from './components/ProjectsBoard';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import TasksBoards from './components/TasksBoards';
import ErrorBoundary from './components/common/ErrorBoundary';
import ModalProvider from './context/ModalContext/ModalContextProvider';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 70px;
`

function App() {
  return  (
    <BrowserRouter>
    <Provider store={store}>
      <AppWrapper>
        <ModalProvider>
          <Routes>
            <Route path='/' element={<ProjectsBoard />}/>
            <Route 
              path='/:id' 
              element={<ErrorBoundary><TasksBoards /></ErrorBoundary>} 
              />
          </Routes>
        </ModalProvider>
      </AppWrapper>
    </Provider>
    </BrowserRouter>
  );
}

export default App;
