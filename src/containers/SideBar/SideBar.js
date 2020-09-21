import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

import { filtersSelector, toggleSidebar, changeLanguage, changeSearchField, clearSearchField, setComponentValue, setComponentsMode,
         changeSchools, setLevelsValue, changeSources, changeSort } from '../../slices/filters';

const SideBar = ({ schools, sources }) => {

  const dispatch = useDispatch();
  const { isSidebarOpened, language, searchFilterValue, componentsFilterValue, componentsModeStrict, schoolsFilterValue, levelsFilterValue,
          sourcesFilterValue, numberOfSpells, sortValue } = useSelector(filtersSelector);

  const onSidebarToggle = () => dispatch(toggleSidebar());

  const onLanguageChange = event => dispatch(changeLanguage(event.target.value));

  const onSearchChange = event => dispatch(changeSearchField(event.target.value));
  const onSearchClear = () => dispatch(clearSearchField());

  const onComponentsValueSet = value => dispatch(setComponentValue(value));
  const onComponentsModeSet = value => dispatch(setComponentsMode(value));

  const onSchoolsChange = value => dispatch(changeSchools(value));

  const onLevelsChange = (event, whichSelect) => whichSelect ? dispatch(setLevelsValue([levelsFilterValue[0], event.target.value]))
  : dispatch(setLevelsValue([event.target.value, levelsFilterValue[1]]));

  const onSourcesChange = value => dispatch(changeSources(value));

  const onSortChange = event => dispatch(changeSort(event.target.value));
  
  
  const [schoolsOpened, setSchoolsOpened] = useState(false);
  const openSchools = () => {
    setSchoolsOpened(!schoolsOpened);
  };

  const [componentsOpened, setComponentsOpened] = useState(false);
  const openComponents = () => {
    setComponentsOpened(!componentsOpened);
  };

  const [sourcesOpened, setSourcesOpened] = useState(false);
  const openSources = () => {
    setSourcesOpened(!sourcesOpened);
  };
  
  return (
    <nav className={`sidebar ${isSidebarOpened ? "" : "sidebar-hidden"}`}>
      <IconButton className='sidebar-button' onClick={onSidebarToggle}><Icon>menu</Icon></IconButton>
      <div className={`sidebar-filters ${isSidebarOpened ? "" : "sidebar-filters-hidden"}`}>
        
        <TextField
          label={(language === 'Русский') ? "Введите название" : "Enter spell name"}
          className='sidebar-component'
          onChange={onSearchChange}
          value={searchFilterValue}
          multiline
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            endAdornment: <InputAdornment position="end"><IconButton onClick={onSearchClear}><CloseIcon /></IconButton></InputAdornment>
            // edge="end"
          }}
        />

        <div className='sidebar-component levels-component'>
          <Typography>{(language === 'Русский') ? "Выберите уровни" : "Choose levels"}</Typography>
            <div className='sidebar-component levels-component-selects'>
            <FormControl variant="filled">
              {/* <Slider
                value={levelsFilterValue}
                onChange={onLevelsChange}
                marks={marks}
                min={0}
                max={9}
                valueLabelDisplay="on"
              /> */}
              <InputLabel>{(language === 'Русский') ? "C" : "From"}</InputLabel>
              <Select value={levelsFilterValue[0]} onChange={(event) => onLevelsChange(event, 0)}>
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="filled">
              <InputLabel>{(language === 'Русский') ? "По" : "To"}</InputLabel>
              <Select value={levelsFilterValue[1]} onChange={(event) => onLevelsChange(event, 1)}>
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
              </Select>
        </FormControl>
          </div>
        </div>
        
        <List className='sidebar-component'>
          <ListItem button onClick={openSchools}>
            <ListItemText primary={(language === 'Русский') ? "Школы" : "Schools"} />
            {schoolsOpened ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={schoolsOpened} timeout="auto" >
            <List component="div">
              {Object.keys(schools).map(school => (
                <ListItem button key={school} onClick={() => onSchoolsChange(school)}>
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
              <ListItem button onClick={() => onComponentsValueSet("V")}>
                <Checkbox checked={componentsFilterValue.includes("V")} />
                <ListItemText primary={(language === 'Русский') ? "В" : "V"} />
              </ListItem>
              <ListItem button onClick={() => onComponentsValueSet("S")}>
                <Checkbox checked={componentsFilterValue.includes("S")} />
                <ListItemText primary={(language === 'Русский') ? "С" : "S"} />
              </ListItem>
              <ListItem button onClick={() => onComponentsValueSet("M")} >
                <Checkbox checked={componentsFilterValue.includes("M")}  />
                <ListItemText primary={(language === 'Русский') ? "М" : "M"} />
              </ListItem>
            </List>

            <List component="div" className='components-collapsible-child'>
              <Tooltip title={<span className='components-tooltip' >{(language === 'Русский') ? "Показывать заклинания с любыми из выбранных компонентов" : "Show spells with any of the selected components"}</span>}>
                <ListItem button onClick={() => onComponentsModeSet(0)} >
                  <Radio value={0} checked={componentsModeStrict === 0} />
                  <ListItemText className='components-collapsible-child-mode' primary={(language === 'Русский') ? "ИЛИ" : "OR"} />
                </ListItem>
              </Tooltip>
              <Tooltip title={<span className='components-tooltip' >{(language === 'Русский') ? "Показывать заклинания со ВСЕМИ выбранными компонентами" : "Show spells with ALL selected components"}</span>}>
                <ListItem button onClick={() => onComponentsModeSet(1)}>
                  <Radio value={1} checked={componentsModeStrict === 1} />
                  <ListItemText className='components-collapsible-child-mode' primary={(language === 'Русский') ? "И" : "AND"} />
                </ListItem>
              </Tooltip>
              <Tooltip title={<span className='components-tooltip' >{(language === 'Русский') ? "Показывать заклинания ТОЛЬКО с выбранными компонентами" : "Show spells with ONLY selected components"}</span>}>
                <ListItem button onClick={() => onComponentsModeSet(2)} >
                  <Radio value={2} checked={componentsModeStrict === 2} />
                  <ListItemText className='components-collapsible-child-mode' primary={(language === 'Русский') ? "=" : "="} />
                </ListItem>
              </Tooltip>
            </List>
          </Collapse>
        </List>

        <List className='sidebar-component'>
          <ListItem button onClick={openSources}>
            <ListItemText primary={(language === 'Русский') ? "Источники" : "Sources"} />
            {sourcesOpened ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={sourcesOpened} timeout="auto" >
            <List component="div">
              {Object.keys(sources).map(source => (
                <ListItem button key={source} onClick={() => onSourcesChange(source)}>
                  <Checkbox checked={sourcesFilterValue.includes(source)} />
                  <ListItemText primary={(language === 'Русский') ? sources[source].ru : sources[source].en} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>

        <FormControl variant="filled" className='sidebar-component'>
          <InputLabel>{(language === 'Русский') ? "Выберите язык" : "Choose language"}</InputLabel>
          <Select value={language} onChange={onLanguageChange}>
            <MenuItem value='Русский'>Русский</MenuItem>
            <MenuItem value='English'>English</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="filled" className='sidebar-component'>
          <InputLabel>{(language === 'Русский') ? "Сортировка" : "Sort"}</InputLabel>
          <Select value={sortValue} onChange={onSortChange}>
            <MenuItem value={0}>{(language === 'Русский') ? "По уровню и алфавиту" : "Sort by level and alphabet"}</MenuItem>
            <MenuItem value={1}>{(language === 'Русский') ? "По алфавиту" : "Sort alphabetically"}</MenuItem>
          </Select>
        </FormControl>

      </div>

      <p className={`sidebar-last-spells ${isSidebarOpened ? "" : "sidebar-filters-hidden"}`}>{(language === 'Русский') ? 'Заклинаний найдено: ' + numberOfSpells : "Spells found: " + numberOfSpells}</p>
    </nav>
  );
}

export default SideBar;
