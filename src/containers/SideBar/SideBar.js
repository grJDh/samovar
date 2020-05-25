import React from 'react';

import './SideBar.scss';

const SideBar = ({ isSidebarOpened, toggleSidebar, onSearchChange }) => {

  return (
    <nav className={`sidebar ${isSidebarOpened ? "" : "sidebar-hidden"}`}>
      <button className='sidebar-button' onClick={toggleSidebar}><span class="material-icons sidebar-burger">menu</span></button>
      <div className={`sidebar-filters ${isSidebarOpened ? "" : "sidebar-filters-hidden"}`}>
        <input className='sidebar-search' type='text' onChange={onSearchChange}/>
      </div>
    </nav>
  );
}

export default SideBar;
