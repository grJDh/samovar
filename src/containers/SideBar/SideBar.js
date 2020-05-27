import React from 'react';
import { IconButton } from '@rmwc/icon-button';
import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';
import { Checkbox } from '@rmwc/checkbox';
import { Radio } from '@rmwc/radio';
import { CollapsibleList } from '@rmwc/list';
import { SimpleListItem } from '@rmwc/list';
import { Tooltip } from '@rmwc/tooltip';

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
import '@material/checkbox/dist/mdc.checkbox.css';
import '@material/form-field/dist/mdc.form-field.css';
import '@material/radio/dist/mdc.radio.css';
import '@rmwc/tooltip/tooltip.css';

import './SideBar.scss';

const SideBar = ({ isSidebarOpened, toggleSidebar, onSearchChange, clearSearchField, searchFilterValue, language, changeLanguage,
                   setComponentValue, setComponentsMode, componentsModeStrict }) => {

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
          className='sidebar-component'
          onChange={onSearchChange}
          value={searchFilterValue}
          trailingIcon={{
            icon: 'close',
            tabIndex: 0,
            onClick: () => clearSearchField()
          }}/>

        <CollapsibleList handle={<SimpleListItem className='sidebar-component components-collapsible'
                                                 text={(language === 'Русский') ? "Компоненты" : "Components"}
                                                 metaIcon="chevron_right"/>}
        >
          <div className='components-collapsible-child'>
            <Checkbox label={(language === 'Русский') ? "В" : "V"} onChange={() => setComponentValue("V")} />
            <Checkbox label={(language === 'Русский') ? "С" : "S"} onChange={() => setComponentValue("S")} />
            <Checkbox label={(language === 'Русский') ? "М" : "M"} onChange={() => setComponentValue("M")}  />
          </div>
          <div className='components-collapsible-child'>
            <Tooltip content={<span>Показывать заклинания, в списке компонентов которых есть любой из выбранных компонентов</span>} align='bottom'>
              <div>
                <Radio label={(language === 'Русский') ? "ИЛИ" : "OR"}
                      value={0}
                      checked={componentsModeStrict === 0}
                      onChange={() => setComponentsMode(0)} />
              </div>
            </Tooltip>

            <Tooltip content={<span>Показывать заклинания, в списке компонентов которых есть ВСЕ выбранные компоненты</span>} align='bottom'>
              <div>
                <Radio label={(language === 'Русский') ? "И" : "AND"}
                    value={1}
                    checked={componentsModeStrict === 1}
                    onChange={() => setComponentsMode(1)} />
              </div>
            </Tooltip>

            <Tooltip content={<span>Показывать заклинания, в компонентах которых есть ТОЛЬКО выбранные компоненты</span>} align='bottom'>
              <div>
                <Radio label={(language === 'Русский') ? "ТОЛЬКО" : "ONLY"}
                    value={2}
                    checked={componentsModeStrict === 2}
                    onChange={() => setComponentsMode(2)}  />
              </div>
            </Tooltip>
          </div>
        </CollapsibleList>
        
        <Select
          className='sidebar-component'
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
