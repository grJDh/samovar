import React from 'react';
import './Spells.scss';

import SpellCard from '../../components/SpellCard/SpellCard';

import { spells } from '../../spells';

const Spells = () => {

  return (
    <div className='spell-table'>
      {spells.map((spell, i) =>
        <SpellCard
        name={spell.ru.name}
        castingTime={spell.ru.castingTime}
        range={spell.ru.range}
        components={spell.ru.components}
        duration={spell.ru.duration}
        description={spell.ru.text}
        materials={spell.ru.materials}
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
