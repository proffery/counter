import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppWithReduxCounter } from './AppWithReduxCounter';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { GlobalStyle } from './Global.styled';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <AppWithReduxCounter />
    <GlobalStyle />
  </Provider>
);
