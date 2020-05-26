import React from 'react';
import { IconButton } from '@rmwc/icon-button';
import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';

import '@material/icon-button/dist/mdc.icon-button.css';
import '@rmwc/icon/icon.css';
import '@material/ripple/dist/mdc.ripple.css';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import '@rmwc/select/select.css';
import '@material/select/dist/mdc.select.css';
import '@material/list/dist/mdc.list.css';
import '@material/menu/dist/mdc.menu.css';
import '@material/menu-surface/dist/mdc.menu-surface.css';

import './SideBar.scss';

const SideBar = ({ isSidebarOpened, toggleSidebar, onSearchChange, clearSearchField, searchFilterValue, language, changeLanguage }) => {

  const labelsLanguage = label => {
    if (language === 'Русский') {
      switch(label) {
        case "search":
          return "Введите название";
        case "language":
          return "Выберите язык";
        default:
          return '???';
      } 
    } else {
      switch(label) {
        case "search":
          return "Enter spell name";
        case "language":
          return "Choose language";
        default:
          return '???';
      }
    }
  }
  
  return (
    <nav className={`sidebar ${isSidebarOpened ? "" : "sidebar-hidden"}`}>
      <IconButton primary='white' ripple icon="menu" className='sidebar-button' onClick={toggleSidebar}/>
      <div className={`sidebar-filters ${isSidebarOpened ? "" : "sidebar-filters-hidden"}`}>
        <TextField
          icon="search"
          label={labelsLanguage("search")}
          className='sidebar-search'
          onChange={onSearchChange}
          value={searchFilterValue}
          trailingIcon={{
            icon: 'close',
            tabIndex: 0,
            onClick: () => clearSearchField()
          }}/>
        
        <Select
          className='sidebar-select'
          label={labelsLanguage("language")}
          enhanced
          value={language}
          onChange={changeLanguage}
          options={['Русский', 'English']}

        />
      </div>
    </nav>
  );
}

export default SideBar;
