import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';

import './App.scss';

import SpellList from './containers/SpellList/SpellList';
import SideBar from './containers/SideBar/SideBar';

import { schools, sources } from './spellsArray';

const App = () => {

  const checkLocalStorage = (item, defualt) => localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : defualt;
  const placeToLocalStorage = (name, item) => localStorage.setItem(name, JSON.stringify(item));

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      secondary: {
        main: '#fff',
      },
      type: 'dark',
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <main className=''>
        <SideBar 
          schools={schools}
          sources={sources}
        />

        <SpellList
          schools={schools}
          sources={sources}
        />
      </main>
    </ThemeProvider>
  );
}

export default App;
