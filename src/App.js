import React, { useState } from 'react';

import './App.scss';

import Spells from './containers/Spells/Spells';
import SideBar from './containers/SideBar/SideBar';

const App = () => {

  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const toggleSidebar = () => {setIsSidebarOpened(!isSidebarOpened);}

  const [language, setLanguage] = useState('Русский');
  const changeLanguage = event => setLanguage(event.target.value);

  const [searchFilterValue, setSearchFilterValue] = useState('fi');
  const [componentsFilterValue, setComponentsFilterValue] = useState('');

  const onSearchChange = event => setSearchFilterValue(event.target.value);
  const clearSearchField = () => setSearchFilterValue('');

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
      />
      <Spells
        isSidebarOpened={isSidebarOpened}
        searchFilterValue={searchFilterValue}
        componentsFilterValue={componentsFilterValue}
        language={language}
      />
    </main>
  );
}

export default App;
