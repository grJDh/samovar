import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Slider from '@material-ui/core/Slider';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import './SideBar.scss';

const SideBar = ({ isSidebarOpened, toggleSidebar, onSearchChange, clearSearchField, searchFilterValue, language, changeLanguage,
                   setComponentValue, setComponentsMode, componentsModeStrict, schools, onSchoolsChange, schoolsFilterValue,
                   componentsFilterValue, onLevelsChange, levelsFilterValue }) => {

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

  const [schoolsOpened, setSchoolsOpened] = React.useState(false);
  const openSchools = () => {
    setSchoolsOpened(!schoolsOpened);
  };

  const [componentsOpened, setComponentsOpened] = React.useState(false);
  const openComponents = () => {
    setComponentsOpened(!componentsOpened);
  };

  const marks = [
    {value: 0, label: '0'},{value: 1, label: '1'},{value: 2, label: '2'},{value: 3, label: '3'},{value: 4, label: '4'},{value: 5, label: '5'},{value: 6, label: '6'},{value: 7, label: '7'},{value: 8, label: '8'},{value: 9, label: '9'},
  ];
  
  return (
    <nav className={`sidebar ${isSidebarOpened ? "" : "sidebar-hidden"}`}>
      <IconButton className='sidebar-button' onClick={toggleSidebar}><Icon>menu</Icon></IconButton>
      <div className={`sidebar-filters ${isSidebarOpened ? "" : "sidebar-filters-hidden"}`}>
        
        <TextField
          label={labelsLanguage("search")}
          className='sidebar-component'
          onChange={onSearchChange}
          value={searchFilterValue}
          multiline
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            endAdornment: <InputAdornment position="end"><IconButton onClick={() => clearSearchField()}><CloseIcon /></IconButton></InputAdornment>
            // edge="end"
          }}
        />

        <FormControl className='sidebar-component levels-component'>
          {/* <InputLabel>{labelsLanguage("language")}</InputLabel> */}
          <Slider
            value={levelsFilterValue}
            onChange={onLevelsChange}
            marks={marks}
            min={0}
            max={9}
            valueLabelDisplay="on"
          />
        </FormControl>

        <List className='sidebar-component'>
          <ListItem button onClick={openSchools}>
            <ListItemText primary={(language === 'Русский') ? "Школы" : "Schools"} />
            {schoolsOpened ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={schoolsOpened} timeout="auto" >
            <List component="div">
              {Object.keys(schools).map(school => (
                <ListItem button key={school}onClick={() => onSchoolsChange(school)}>
                  <Checkbox checked={schoolsFilterValue.includes(school)} />
                  <ListItemText primary={(language === 'Русский') ? schools[school].ru : schools[school].en} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>

        <List className='sidebar-component'>
          <ListItem button onClick={openComponents}>
            <ListItemText primary={(language === 'Русский') ? "Компоненты" : "Components"} />
            {componentsOpened ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={componentsOpened} timeout="auto" >
            <List component="div" className='components-collapsible-child'>
              <ListItem button onClick={() => setComponentValue("V")}>
                <Checkbox checked={componentsFilterValue.includes("V")} />
                <ListItemText primary={(language === 'Русский') ? "В" : "V"} />
              </ListItem>
              <ListItem button onClick={() => setComponentValue("S")}>
                <Checkbox checked={componentsFilterValue.includes("S")} />
                <ListItemText primary={(language === 'Русский') ? "С" : "S"} />
              </ListItem>
              <ListItem button onClick={() => setComponentValue("M")} >
                <Checkbox checked={componentsFilterValue.includes("M")}  />
                <ListItemText primary={(language === 'Русский') ? "М" : "M"} />
              </ListItem>
            </List>

            <List component="div" className='components-collapsible-child'>
              <Tooltip title={<span className='components-tooltip' >{(language === 'Русский') ? "Показывать заклинания с любыми из выбранных компонентов" : "Show spells with any of the selected components"}</span>}>
                <ListItem button onClick={() => setComponentsMode(0)} >
                  <Radio value={0} checked={componentsModeStrict === 0} />
                  <ListItemText className='components-collapsible-child-mode' primary={(language === 'Русский') ? "ИЛИ" : "OR"} />
                </ListItem>
              </Tooltip>
              <Tooltip title={<span className='components-tooltip' >{(language === 'Русский') ? "Показывать заклинания со ВСЕМИ выбранными компонентами" : "Show spells with ALL selected components"}</span>}>
                <ListItem button onClick={() => setComponentsMode(1)}>
                  <Radio value={1} checked={componentsModeStrict === 1} />
                  <ListItemText className='components-collapsible-child-mode' primary={(language === 'Русский') ? "И" : "AND"} />
                </ListItem>
              </Tooltip>
              <Tooltip title={<span className='components-tooltip' >{(language === 'Русский') ? "Показывать заклинания с ТОЛЬКО выбранными компонентами" : "Show spells with ONLY selected components"}</span>}>
                <ListItem button onClick={() => setComponentsMode(2)} >
                  <Radio value={2} checked={componentsModeStrict === 2} />
                  <ListItemText className='components-collapsible-child-mode' primary={(language === 'Русский') ? "=" : "="} />
                </ListItem>
              </Tooltip>
            </List>
          </Collapse>
        </List>

        <FormControl variant="filled" className='sidebar-component'>
          <InputLabel>{labelsLanguage("language")}</InputLabel>
          <Select value={language} onChange={changeLanguage}>
            <MenuItem value='Русский'>Русский</MenuItem>
            <MenuItem value='English'>English</MenuItem>
          </Select>
        </FormControl>
      </div>
    </nav>
  );
}

export default SideBar;
