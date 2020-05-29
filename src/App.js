import React, { useState, useEffect } from 'react';
import { createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';

import './App.scss';

import SpellList from './containers/SpellList/SpellList';
import SideBar from './containers/SideBar/SideBar';

import { schools, sources } from './spellsArray';

const App = () => {

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      secondary: {
        main: '#fff',
      },
      type: 'dark',
    },
  });

  const checkLocalStorage = (item, defualt) => localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : defualt;
  const placeToLocalStorage = (name, item) => localStorage.setItem(name, JSON.stringify(item));

  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const toggleSidebar = () => setIsSidebarOpened(!isSidebarOpened);

  const [language, setLanguage] = useState(checkLocalStorage('language', 'Русский'));
  const changeLanguage = event => {
    setLanguage(event.target.value);
    placeToLocalStorage('language', event.target.value);
  }

  const [searchFilterValue, setSearchFilterValue] = useState(checkLocalStorage('searchFilterValue', ''));
  const onSearchChange = event => {
    setSearchFilterValue(event.target.value);
    placeToLocalStorage('searchFilterValue', event.target.value);
  }
  const clearSearchField = () => {
    setSearchFilterValue('');
    placeToLocalStorage('searchFilterValue', '');
  }

  const [componentsFilterValue, setComponentsFilterValue] = useState(checkLocalStorage('componentsFilterValue', []));
  const [componentsModeStrict, setComponentsModeStrict] = useState(checkLocalStorage('componentsModeStrict', 0));
  const setComponentValue = component => {
    const indexOfComponent = componentsFilterValue.indexOf(component);
    if (indexOfComponent === -1) {
      setComponentsFilterValue([...componentsFilterValue, component]);
      placeToLocalStorage('componentsFilterValue', [...componentsFilterValue, component]);
    } else {
      setComponentsFilterValue(componentsFilterValue.filter((comp, i) => i !== indexOfComponent));
      placeToLocalStorage('componentsFilterValue', componentsFilterValue.filter((comp, i) => i !== indexOfComponent));
    }
  }
  const setComponentsMode = value => {
    setComponentsModeStrict(value);
    placeToLocalStorage('componentsModeStrict', value);
  }

  const [schoolsFilterValue, setSchoolsFilterValue] = useState(checkLocalStorage('schoolsFilterValue', []));
  const onSchoolsChange = school => {
    const indexOfSChool = schoolsFilterValue.indexOf(school);
    if (indexOfSChool === -1) {
      setSchoolsFilterValue([...schoolsFilterValue, school]);
      placeToLocalStorage('schoolsFilterValue', [...schoolsFilterValue, school]);
    } else {
      setSchoolsFilterValue(schoolsFilterValue.filter((schl, i) => i !== indexOfSChool));
      placeToLocalStorage('schoolsFilterValue', schoolsFilterValue.filter((schl, i) => i !== indexOfSChool));
    }
  }

  const [levelsFilterValue, setLevelsFilterValue]  = useState(checkLocalStorage('levelsFilterValue', [0, 9]));
  const onLevelsChange = (event, value) => {
    setLevelsFilterValue(value);
    placeToLocalStorage('levelsFilterValue', value);
  }

  const [sourcesFilterValue, setSourcesFilterValue] = useState(checkLocalStorage('sourcesFilterValue', ['PHB', 'XGTE', 'TOEE', 'SCAG']));
  const onSourcesChange = source => {
    const indexOfSource = sourcesFilterValue.indexOf(source);
    if (indexOfSource === -1) {
      setSourcesFilterValue([...sourcesFilterValue, source]);
      placeToLocalStorage('sourcesFilterValue', [...sourcesFilterValue, source]);
    } else {
      setSourcesFilterValue(sourcesFilterValue.filter((src, i) => i !== indexOfSource));
      placeToLocalStorage('sourcesFilterValue', sourcesFilterValue.filter((src, i) => i !== indexOfSource));
    }
  }

  const [numberOfSpells, setNumberOfSpells] = useState(checkLocalStorage('numberOfSpells', 0));
  const onNumberOfSpellsChange = value => {
    setNumberOfSpells(value);
    placeToLocalStorage('numberOfSpells', value);
  }

  const [sortValue, setSortValue] = useState(checkLocalStorage('sortValue', 0));
  const onSortChange = event => {
    setSortValue(event.target.value);
    placeToLocalStorage('sortValue', event.target.value);
  }

  // classes
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

          onLevelsChange={onLevelsChange}
          levelsFilterValue={levelsFilterValue}

          onSourcesChange={onSourcesChange}
          sourcesFilterValue={sourcesFilterValue}

          sortValue={sortValue}
          onSortChange={onSortChange}

          schools={schools}
          sources={sources}
          language={language}
          numberOfSpells={numberOfSpells}
        />
        <SpellList
          isSidebarOpened={isSidebarOpened}
          searchFilterValue={searchFilterValue}
          componentsFilterValue={componentsFilterValue}
          componentsModeStrict={componentsModeStrict}
          schoolsFilterValue={schoolsFilterValue}
          levelsFilterValue={levelsFilterValue}
          sourcesFilterValue={sourcesFilterValue}

          language={language}
          schools={schools}
          sources={sources}
          onNumberOfSpellsChange={onNumberOfSpellsChange}
          sortValue={sortValue}
        />
      </main>
    </ThemeProvider>
  );
}

export default App;
