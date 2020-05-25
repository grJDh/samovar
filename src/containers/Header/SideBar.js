import React, { useState } from 'react';
import { Transition } from 'react-transition-group';

import './SideBar.scss';

const SideBar = ({ isSidebarOpened, toggleSidebar }) => {

  return (
    <nav className={`${isSidebarOpened ? "" : "sidebar-hidden"}`}>
      <button onClick={toggleSidebar}>!!!</button>
    </nav>
  );
}

export default SideBar;
