import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

import './App.scss';

import Spells from './containers/Spells/Spells';
import SideBar from './containers/SideBar/SideBar';

import { schools } from './spellsArray';

const App = () => {

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      secondary: red,
      type: 'dark',
    },
  });

  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const toggleSidebar = () => {setIsSidebarOpened(!isSidebarOpened);}

  const [language, setLanguage] = useState('Русский');
  const changeLanguage = event => setLanguage(event.target.value);

  const [searchFilterValue, setSearchFilterValue] = useState('');
  const onSearchChange = event => setSearchFilterValue(event.target.value);
  const clearSearchField = () => setSearchFilterValue('');

  const [componentsFilterValue, setComponentsFilterValue] = useState([]);
  const [componentsModeStrict, setComponentsModeStrict] = useState(0);
  const setComponentValue = component => {
    const indexOfComponent = componentsFilterValue.indexOf(component);
    if (indexOfComponent === -1) {
      setComponentsFilterValue([...componentsFilterValue, component])
    } else {
      setComponentsFilterValue(componentsFilterValue.filter((comp, i) => i !== indexOfComponent));
    }
  }
  const setComponentsMode = value => setComponentsModeStrict(value);

  const [schoolsFilterValue, setSchoolsFilterValue] = useState([]);
  const onSchoolsChange = school => {
    const indexOfSChool = schoolsFilterValue.indexOf(school);
    if (indexOfSChool === -1) {
      setSchoolsFilterValue([...schoolsFilterValue, school]);
    } else {
      setSchoolsFilterValue(schoolsFilterValue.filter((schl, i) => i !== indexOfSChool));
    }
  }

  console.log(schoolsFilterValue);

  // classes
  // levels
  // schools
  // sources
  // rituals

  return (
    <ThemeProvider theme={theme}>
      <main className=''>
        <SideBar 
          toggleSidebar={toggleSidebar}
          isSidebarOpened={isSidebarOpened}
          changeLanguage={changeLanguage}
          onSearchChange={onSearchChange}
          searchFilterValue={searchFilterValue}
          clearSearchField={clearSearchField}
          setComponentValue={setComponentValue}
          componentsFilterValue={componentsFilterValue}
          setComponentsMode={setComponentsMode}
          componentsModeStrict={componentsModeStrict}
          onSchoolsChange={onSchoolsChange}
          schoolsFilterValue={schoolsFilterValue}

          schools={schools}
          language={language}
        />
        <Spells
          isSidebarOpened={isSidebarOpened}
          searchFilterValue={searchFilterValue}
          componentsFilterValue={componentsFilterValue}
          componentsModeStrict={componentsModeStrict}
          schoolsFilterValue={schoolsFilterValue}

          language={language}
          schools={schools}
        />
      </main>
    </ThemeProvider>
  );
}

export default App;
