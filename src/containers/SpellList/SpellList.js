import React from 'react';

import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import './SpellList.scss';

import SpellCard from '../../components/SpellCard/SpellCard';

import { spells } from '../../spellsArray';

const SpellList = ({ isSidebarOpened, searchFilterValue, componentsFilterValue, componentsModeStrict, language, schools,
                  schoolsFilterValue }) => {

  // const spells = test_spells;

  const searchFilter = spell =>
    spell.ru.name.toLowerCase().includes(searchFilterValue.toLowerCase()) ||
    spell.en.name.toLowerCase().includes(searchFilterValue.toLowerCase());

  // или (любой из) / и (все) / только эти
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
          const splittedComponents = spell.components.split(", ");
          const componentsFilterValueCopy = componentsFilterValue;
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

  const languageProperty = (other = false) => {
    if (language === 'Русский' ^ other) return "ru";
    
    return "en";
  }

  const filteredSpells = spells
  .filter(spell => searchFilter(spell))
  .filter(spell => componentsFilter(spell))
  .filter(spell => schoolsFilter(spell))

  function cellRenderer({columnIndex, key, rowIndex, style}) {
    if (filteredSpells.length !== 0) {  
      const index = (Math.floor(rowIndex * 6)) + columnIndex;
      if (filteredSpells[index]) {
        return (
          <div key={key} style={style}>
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

              key={filteredSpells[index].en.name}
              // classes={spell.ru}

              language={language}
            />}
          </div>
        );
      } return 1
    } else {
      return <p>Wow, such empty</p>
    }
  }

  return (
    <div className={`spell-table ${isSidebarOpened ? "" : "spells-wide"}`}>

          <AutoSizer>
          {({ height, width }) => (
            <Grid
              columnCount={width / 300}
              rowCount={Math.ceil(filteredSpells.length / 6)}
              columnWidth={300}
              rowHeight={510}
              height={height}
              width={width}
            >
              {cellRenderer}
            </Grid>
          )}
          </AutoSizer>
    </div>
  );
}

export default SpellList;