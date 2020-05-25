import React from 'react';
import './Spells.scss';

import SpellCard from '../../components/SpellCard/SpellCard';

import { spells } from '../../spells';

const Spells = ({ isSidebarOpened, searchFilterValue, componentsFilterValue }) => {

  const searchFilter = spell => spell.ru.name.toLowerCase().includes(searchFilterValue.toLowerCase()) || spell.en.name.toLowerCase().includes(searchFilterValue.toLowerCase());
  const componentsFilter = spell => (spell.ru.components) ? spell.ru.components.includes(componentsFilterValue) : false

  return (
    <div className={`spell-table ${isSidebarOpened ? "" : "spells-wide"}`}>
      {spells
      .filter(spell => searchFilter(spell))
      .filter(spell => componentsFilter(spell))
      .map((spell, i) =>
        <SpellCard
          name={spell.ru.name}
          otherName={spell.en.name}
          castingTime={spell.ru.castingTime}
          range={spell.ru.range}
          components={spell.ru.components}
          duration={spell.ru.duration}
          description={spell.ru.text}
          higherLevels={spell.ru.higherLevels}
          materials={spell.ru.materials}
          materialCost={spell.ru.materialCost}
          materialConsumed={spell.ru.materialConsumed}
          source={spell.ru.source}
          level={spell.ru.level}
          school={spell.ru.school}
          key={i}
          // classes={spell.ru}
        />
      )}
    </div>
  );
}

export default Spells;
