import React from 'react';
import './SpellCard.scss';
import { mdReact } from 'markdown-react-js';

const SpellCard = ({ name, castingTime, range, components, duration, description, materials, source, classes, level, school }) => {

  const levelAdjusted = () => {
    if (level == 0) {
      return 'Заговор'
    } else {
      return level + '-й круг'
    }
  }

  const markdown = text => mdReact()(text);

  const capitalize = text => {
    if (!text == 0) {
      const splitted = text.split(' ');
      const newText = splitted.map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase());
      return newText.join(' ');
    } else {
      return '';
    }
  } 

  return (
    <div className='spellcard'>
      <div className="spellcard-name section">
        <h1>{capitalize(name)}</h1>
      </div>

      <div className="spellcard-castingTime section">
        <h2>Время накл-я</h2>
        <p>{castingTime}</p>
      </div>

      <div className="spellcard-range section">
      <h2>Дистанция</h2>
        <p>{range}</p>
      </div>

      <div className="spellcard-components section">
      <h2>Компоненты</h2>
        <p>{components}</p>
      </div>

      <div className="spellcard-duration section">
      <h2>Длительность</h2>
        <p>{duration}</p>
      </div>

      <div className="spellcard-materials">
        <p>{materials}</p>
      </div>

      <div className="spellcard-description section">
        <p>{markdown(description)}</p>
      </div>

      <div className="spellcard-footer footer">
        <p>{levelAdjusted()}, {capitalize(school)}</p>
        <p>{source}</p>
      </div>
    </div>
  );
}

export default SpellCard;
