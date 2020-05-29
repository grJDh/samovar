import React, { useState } from 'react';

import { mdReact } from 'markdown-react-js';
import Tooltip from '@material-ui/core/Tooltip';
import Collapse from '@material-ui/core/Collapse';

import './SpellCard.scss';

const SpellCard = ({ name, castingTime, range, components, duration, description, materials, source, level, school, materialCost, otherName,
                     materialConsumed, higherLevels, language, languageProperty, schools, sources }) => {


  const levelAdjusted = () => {
    if (level === 0) {
      if (language === 'Русский') return 'Заговор'
      return 'Cantrip'
    } else {
      
      if (language === 'Русский') return level + '-й круг'
      return level + ' level'
    }
  }

  const componentsLanguage = () => {
    if (language === 'Русский') {
      return components.split(", ").map(component => {
        switch(component) {
          case "V":
            return "В";
          case "S":
            return "С";
          case "M":
            return "М";
          default:
            return '???';
        }
      }).join(", ")
    } else return components
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

  const useCollapse = true;

  const [isOpened, setOpened] = useState(false);
  const toggleMaterials = () => setOpened(!isOpened);

  const materialCollapsible = () => {
    if (!useCollapse) {
      return <p className='materials'>{materials}</p>
    }

    if (materialCost) {
      return (
        <div>
          {/* <CollapsibleList handle={(language === 'Русский') ?
            <p className='material-collapse'>Стоим-ть компонентов {doesConsume()}: <span style={{fontWeight: "bold"}}>{materialCost + " зм"}</span></p> :
            <p className='material-collapse'>Materials cost {doesConsume()}: <span style={{fontWeight: "bold"}}>{materialCost + " gp"}</span></p>}
          >
            <p className='material-collapse-child'>{materials}</p>
          </CollapsibleList> */}

          {(language === 'Русский') ?
          <p onClick={toggleMaterials}  className='material-collapse'>Стоим-ть компонентов {doesConsume()}: <span style={{fontWeight: "bold"}}>{materialCost + " зм"}</span></p> :
          <p onClick={toggleMaterials}  className='material-collapse'>Materials cost {doesConsume()}: <span style={{fontWeight: "bold"}}>{materialCost + " gp"}</span></p>}

          <Collapse in={isOpened} timeout="auto" >
            <p className='material-collapse-child'>{materials}</p>
          </Collapse>
        </div>
      );
    } else {
      return (
        <div>
          {<p onClick={toggleMaterials} className='material-collapse'>{(language === 'Русский') ?
          "Нажмите, чтобы увидеть мат. комп-т" : "Click to see material component"}</p>}

          <Collapse in={isOpened} timeout="auto" >
            <p className='material-collapse-child'>{materials}</p>
          </Collapse>
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
        <Tooltip title={<span className='name-tooltip'>{capitalize(otherName)}</span>} enterDelay={500} arrow>
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
        <p>{componentsLanguage()}</p>
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
        <p>{levelAdjusted()}, {schools[school][languageProperty()]}</p>
        <p>{source}</p>
      </div>
    </div>
  );
}

export default SpellCard;
