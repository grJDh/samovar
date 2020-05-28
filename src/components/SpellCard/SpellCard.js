import React from 'react';
import './SpellCard.scss';
import { mdReact } from 'markdown-react-js';
import { Tooltip } from '@rmwc/tooltip';
import { CollapsibleList } from '@rmwc/list';

import '@rmwc/tooltip/tooltip.css';
import '@material/list/dist/mdc.list.css';
import '@rmwc/list/collapsible-list.css';

const SpellCard = ({name, castingTime, range, components,
                    duration, description, materials, source,
                    classes, level, school, materialCost,
                    otherName, materialConsumed, higherLevels,
                    language }) => {

  const useCollapse = true;

  const levelAdjusted = () => {
    if (level === 0) {
      if (language === 'Русский') return 'Заговор'
      return 'Cantrip'
    } else {
      
      if (language === 'Русский') return level + '-й круг'
      return level + ' level'
    }
  }

  const schoolLanguage = () => {
    if (language === 'Русский') {
      switch(school) {
        case "Conjuration":
          return "Призыв";
        case "Abjuration":
          return "Ограждение";
        case "Necromancy":
          return "Некромантия";
        case "Evocation":
          return "Воплощение";
        case "Enchantment":
          return "Очарование";
        case "Transmutation":
          return "Трансмутация";
        case "Illusion":
          return "Иллюзия";
        case "Divination":
          return "Прорицание";
        default:
          return '???';
      } 
    } else return school
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

  const doesConsume = () => {
    if (materialConsumed) {
      if (language === 'Русский') return '(расход-я)'
      return '(consumed)'
    } else {
      return ''
    }
  }

  const materialCollapsible = () => {
    if (!useCollapse) {
      return <p className='materials'>{materials}</p>
    }

    if (materialCost) {
      return (
        <div>
          <CollapsibleList handle={(language === 'Русский') ?
            <p className='material-collapse'>Стоимость комп-тов {doesConsume()}: <span style={{fontWeight: "bold"}}>{materialCost + " зм"}</span></p> :
            <p className='material-collapse'>Materials cost {doesConsume()}: <span style={{fontWeight: "bold"}}>{materialCost + " gp"}</span></p>}
          >
            <p className='material-collapse-child'>{materials}</p>
          </CollapsibleList>
        </div>
      );
    } else {
      return (
        <div>
          {/* className='material-collapse-div' */}
          <CollapsibleList  handle={<p className='material-collapse'>{(language === 'Русский') ? "Нажмите, чтобы увидеть мат. комп-т" :
          "Click to see material component"}</p>}
          >
            <p className='material-collapse-child'>{materials}</p>
          </CollapsibleList>
        </div>
      );
    }
  }

  const higherLevelsCheck = () => {
    if (higherLevels) {
      return (
        <div className="spellcard-higher section">
          <p>{higherLevels}</p>
        </div>
      );
    }
  }

  return (
    <div className='spellcard'>
      <div className="spellcard-name section">
        <Tooltip className='tooltiptext' content={capitalize(otherName)} showArrow align='bottom' enterDelay="300" activateOn="click">
          <h1>{capitalize(name)}</h1>
        </Tooltip>
      </div>

      <div className="spellcard-castingTime section">
        {(language === 'Русский') ? <h2>Время накл-я</h2> : <h2>Casting time</h2>}
        <p>{castingTime}</p>
      </div>

      <div className="spellcard-range section">
        {(language === 'Русский') ? <h2>Дистанция</h2> : <h2>Distance</h2>}
        <p>{range}</p>
      </div>

      <div className="spellcard-components section">
        {(language === 'Русский') ? <h2>Компоненты</h2> : <h2>Components</h2>}
        <p>{components}</p>
      </div>

      <div className="spellcard-duration section">
        {(language === 'Русский') ? <h2>Длительность</h2> : <h2>Duration</h2>}
        <p>{duration}</p>
      </div>

      <div className="spellcard-materials">
        {(materials) ? materialCollapsible() : ''}
      </div>

      <div className="spellcard-description section">
        <p>{markdown(description)}</p>
      </div>

      {higherLevelsCheck()}

      <div className="spellcard-footer footer">
        <p>{levelAdjusted()}, {schoolLanguage(school)}</p>
        <p>{source}</p>
      </div>
    </div>
  );
}

export default SpellCard;
