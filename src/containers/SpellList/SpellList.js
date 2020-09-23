import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import SpellCard from '../../components/SpellCard/SpellCard';

import './SpellList.scss';

import { spells, spellsByClasses } from '../../spellsArray';

import { filtersSelector, changeNumberOfSpells } from '../../slices/filters';
import { cardsSelector } from '../../slices/cards';


const SpellList = ({ schools, sources }) => {

  const dispatch = useDispatch();

  const onNumberOfSpellsChange = () =>{dispatch(changeNumberOfSpells(filteredSpells.length));}

  const { isSidebarOpened, language, searchFilterValue, componentsFilterValue, componentsModeStrict, schoolsFilterValue, levelsFilterValue,
          sourcesFilterValue, classesFilterValue, sortValue } = useSelector(filtersSelector);

  const { cardsWidth, cardsHeight} = useSelector(cardsSelector);

  const searchFilter = spell =>
    spell.ru.name.toLowerCase().includes(searchFilterValue.toLowerCase()) ||
    spell.en.name.toLowerCase().includes(searchFilterValue.toLowerCase());

  const componentsFilter = spell => {
    if (componentsFilterValue.length) {
      switch(componentsModeStrict) {
        case 1:
          let flags = 0;
          for (let i = 0; i < componentsFilterValue.length; i++) {
            if (spell.components.includes(componentsFilterValue[i])) flags += 1;
          };
          return flags === componentsFilterValue.length ?  true :  false
        case 2:
          const splittedComponents = spell.components.split(", ").slice();
          const componentsFilterValueCopy = componentsFilterValue.slice();
          splittedComponents.sort();
          componentsFilterValueCopy.sort();

          return splittedComponents.join(" ") === componentsFilterValueCopy.join(" ")
        default:
          for (let i = 0; i < componentsFilterValue.length; i ++) {
            if (spell.components.includes(componentsFilterValue[i])) return true
          };
      }
    } else return true
  }

  const schoolsFilter = spell => {
    if (schoolsFilterValue.length) {
      for (let i = 0; i < schoolsFilterValue.length; i ++) {
        if (spell.school.includes(schoolsFilterValue[i])) return true
      };
    } else return true
  }

  const sourcesFilter = spell => {
    if (sourcesFilterValue.length) {
      for (let i = 0; i < sourcesFilterValue.length; i ++) {
        if (spell.source.includes(sourcesFilterValue[i])) return true
      };
    }
  }

  const classesFilter = spell => {
    if (classesFilterValue.length) {
      for (let i = 0; i < classesFilterValue.length; i ++) {
        if (spellsByClasses[classesFilterValue[i]].spells.includes(spell.en.name)) return true
      };
    } else return true
  }

  const levelsFilter = spell => (spell.level >= levelsFilterValue[0] && spell.level <= levelsFilterValue[1]) ? true : false;

  const languageProperty = (other = false) => {
    if (language === 'Русский' ^ other) return "ru";
    
    return "en";
  }

  const spellsSort = (spell1, spell2) => {
    if (sortValue === 0) {
      if (spell1.level > spell2.level) {
        return 1;
      }
      if (spell1.level < spell2.level) {
        return -1;
      }

      if (spell1[languageProperty()].name > spell2[languageProperty()].name) {
        return 1;
      }
      if (spell1[languageProperty()].name < spell2[languageProperty()].name) {
        return -1;
      }

    } else {
      if (spell1[languageProperty()].name > spell2[languageProperty()].name) {
        return 1;
      }
      if (spell1[languageProperty()].name < spell2[languageProperty()].name) {
        return -1;
      }
    }

    return 0;
  }

  const filteredSpells = spells
  .filter(spell => searchFilter(spell))
  .filter(spell => levelsFilter(spell))
  .filter(spell => classesFilter(spell))
  .filter(spell => schoolsFilter(spell))
  .filter(spell => componentsFilter(spell))
  .filter(spell => sourcesFilter(spell))
  .sort((spell1, spell2) => spellsSort(spell1, spell2))

  useEffect(() => {
    onNumberOfSpellsChange();
  }, [filteredSpells.length])

  //КЛАССЫ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // увеличение размера карточек
  // закреп карточек
  
  // время
  // дистанция
  // длительность

  // тултипы для источников на карточках
  // кнопка вверх
  // папки закрепов
  // новые виды карточек

  const cellRenderer = ({columnIndex, rowIndex, style, data}) => {
    if (filteredSpells.length !== 0) {  
      const index = (Math.floor(rowIndex * data)) + columnIndex;
      if (filteredSpells[index]) {
        return (
          <div style={style}>
            {<SpellCard
              name={filteredSpells[index][languageProperty()].name}
              otherName={filteredSpells[index][languageProperty(true)].name}
              castingTime={filteredSpells[index][languageProperty()].castingTime}
              range={filteredSpells[index][languageProperty()].range}
              duration={filteredSpells[index][languageProperty()].duration}
              description={filteredSpells[index][languageProperty()].description}
              higherLevels={filteredSpells[index][languageProperty()].higherLevels}
              materials={filteredSpells[index][languageProperty()].materials}
              components={filteredSpells[index].components}
              materialCost={filteredSpells[index].materialCost}
              materialConsumed={filteredSpells[index].materialConsumed}
              source={filteredSpells[index].source}
              level={filteredSpells[index].level}
              school={filteredSpells[index].school}
              cardsWidth={cardsWidth}
              cardsHeight={cardsHeight}

              key={filteredSpells[index].en.name}
              languageProperty={languageProperty}
              // classes={spell.ru}

              language={language}
              schools={schools}
              sources={sources}
            />}
          </div>
        );
      } return null
    } else {
      return <p>Wow, such empty</p>
    }
  }

  return (
    <div className={`spell-table ${isSidebarOpened ? "" : "spells-wide"}`}>
          <AutoSizer>
          {({ height, width }) => (
            <Grid
              className='spell-table-window'
              columnCount={Math.floor(width / (cardsWidth + 10))}
              rowCount={Math.ceil(filteredSpells.length / Math.floor(width / (cardsWidth + 10)))}
              columnWidth={cardsWidth + 10}
              rowHeight={cardsHeight + 10}
              height={height}
              width={width}
              itemData={Math.floor(width / (cardsWidth + 10))}
            >
              {cellRenderer}
            </Grid>
          )}
          </AutoSizer>
    </div>
  );
}

export default SpellList;
