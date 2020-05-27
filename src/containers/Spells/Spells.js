import React from 'react';
import './Spells.scss';

import SpellCard from '../../components/SpellCard/SpellCard';

import { test_spells } from '../../spellsArray';

const Spells = ({ isSidebarOpened, searchFilterValue, componentsFilterValue, componentsModeStrict, language }) => {

  const spells = test_spells;

  const searchFilter = spell =>
    spell.ru.name.toLowerCase().includes(searchFilterValue.toLowerCase()) ||
    spell.en.name.toLowerCase().includes(searchFilterValue.toLowerCase());

  // или (любой из) / и (все) / только эти
  const componentsFilter = spell => {
    console.log(componentsModeStrict);
    if (componentsFilterValue.length) {
      switch(componentsModeStrict) {
        case 1:
          let flags = 0;
          for (let i = 0; i < componentsFilterValue.length; i++) {
            if (spell.en.components.includes(componentsFilterValue[i])) flags += 1;
          };
          return flags === componentsFilterValue.length ?  true :  false
        case 2:
          const splittedComponents = spell.en.components.split(", ");
          const componentsFilterValueCopy = componentsFilterValue;
          splittedComponents.sort();
          componentsFilterValueCopy.sort();

          return splittedComponents.join(" ") === componentsFilterValueCopy.join(" ")
        default:
          for (let i = 0; i < componentsFilterValue.length; i ++) {
            if (spell.en.components.includes(componentsFilterValue[i])) return true
          };
      }
    } else return true
  }

  const languageProperty = (other = false) => {
    if (language === 'Русский' ^ other) return "ru";
    
    return "en";
  }

  return (
    <div className={`spell-table ${isSidebarOpened ? "" : "spells-wide"}`}>
      {spells
      .filter(spell => searchFilter(spell))
      .filter(spell => componentsFilter(spell))
      .map((spell, i) =>
        <SpellCard
          name={spell[languageProperty()].name}
          otherName={spell[languageProperty(true)].name}
          castingTime={spell[languageProperty()].castingTime}
          range={spell[languageProperty()].range}
          duration={spell[languageProperty()].duration}
          description={spell[languageProperty()].description}
          higherLevels={spell[languageProperty()].higherLevels}
          materials={spell[languageProperty()].materials}
          components={spell[languageProperty()].components}
          materialCost={spell.materialCost}
          materialConsumed={spell.materialConsumed}
          source={spell.source}
          level={spell.level}
          school={spell.school}

          key={spell.en.name}
          // classes={spell.ru}

          language={language}
        />
      )}
    </div>
  );
}

export default Spells;
