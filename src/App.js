import React, { useState } from 'react';

import './App.scss';

import Spells from './containers/Spells/Spells';
import SideBar from './containers/Header/SideBar';

const App = () => {

  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const toggleSidebar = () => {setIsSidebarOpened(!isSidebarOpened); console.log(isSidebarOpened)}

  const [searchFilterValue, setSearchFilterValue] = useState('fi');
  const [componentsFilterValue, setComponentsFilterValue] = useState('');

  const onSearchChange = event => setSearchFilterValue(event.target.value);

  return (
    <main className=''>
      <SideBar 
        toggleSidebar={toggleSidebar}
        isSidebarOpened={isSidebarOpened}
        onSearchChange={onSearchChange}
      />
      <Spells
        isSidebarOpened={isSidebarOpened}
        searchFilterValue={searchFilterValue}
        componentsFilterValue={componentsFilterValue}
      />
    </main>
  );
}

export default App;
