import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './index.css';
import Camaleao from './Camaleao';
import Store from './Store';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000',
    },
  },
});

ReactDOM.render(
  <HashRouter>
    <Store>
      <MuiThemeProvider theme={theme}>
        <Camaleao />
      </MuiThemeProvider>
    </Store>
  </HashRouter>,
  document.getElementById('camaleao')
);
