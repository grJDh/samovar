import React, { useState } from 'react';

import './App.scss';

import Spells from './containers/Spells/Spells';
import SideBar from './containers/SideBar/SideBar';

const App = () => {

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

  // classes
  // levels
  // schools
  // sources
  // rituals

  return (
    <main className=''>
      <SideBar 
        toggleSidebar={toggleSidebar}
        isSidebarOpened={isSidebarOpened}
        changeLanguage={changeLanguage}
        language={language}
        onSearchChange={onSearchChange}
        searchFilterValue={searchFilterValue}
        clearSearchField={clearSearchField}
        setComponentValue={setComponentValue}
        setComponentsMode={setComponentsMode}
        componentsModeStrict={componentsModeStrict}
      />
      <Spells
        isSidebarOpened={isSidebarOpened}
        searchFilterValue={searchFilterValue}
        componentsFilterValue={componentsFilterValue}
        componentsModeStrict={componentsModeStrict}

        language={language}
      />
    </main>
  );
}

export default App;
