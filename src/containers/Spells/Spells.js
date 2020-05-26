import React from 'react';
import './Spells.scss';

import SpellCard from '../../components/SpellCard/SpellCard';

import { spells } from '../../spellsArray';

const Spells = ({ isSidebarOpened, searchFilterValue, componentsFilterValue, language }) => {

  const searchFilter = spell => spell.ru.name.toLowerCase().includes(searchFilterValue.toLowerCase()) || spell.en.name.toLowerCase().includes(searchFilterValue.toLowerCase());
  const componentsFilter = spell => (spell.ru.components) ? spell.ru.components.includes(componentsFilterValue) : false

  console.log(spells.map(spell => {
    return {en: {...spell.en, materialCost: 0, materialConsumed: false, classes: ""}, ru: {...spell.ru, materialCost: 0, materialConsumed: false, classes: ""}}
  }))

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
          components={spell[languageProperty()].components}
          duration={spell[languageProperty()].duration}
          description={spell[languageProperty()].description}
          higherLevels={spell[languageProperty()].higherLevels}
          materials={spell[languageProperty()].materials}
          materialCost={spell[languageProperty()].materialCost}
          materialConsumed={spell[languageProperty()].materialConsumed}
          source={spell[languageProperty()].source}
          level={spell[languageProperty()].level}
          school={spell[languageProperty()].school}
          key={i}
          // classes={spell.ru}

          language={language}
        />
      )}
    </div>
  );
}

export default Spells;
