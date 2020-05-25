import React, {useState} from 'react';
import './SpellCard.scss';
import { mdReact } from 'markdown-react-js';
import { Collapse } from 'react-collapse';

const SpellCard = ({name, castingTime, range, components,
                    duration, description, materials, source,
                    classes, level, school, materialCost,
                    otherName, materialConsumed, higherLevels }) => {

  const [isMaterialsOpened, setMaterialsOpened] = useState(false);

  const useCollapse = true;

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

  const doesConsume = () => {
    if (materialConsumed) {
      return 'расход-я'
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
          <label className='material-collapse'>
          <p className='materials'>Стоимость комп-та ({doesConsume()}): {materialCost + " зм"}</p>
            <input
              type="checkbox"
              checked={isMaterialsOpened}
              onChange={() => setMaterialsOpened(!isMaterialsOpened)} />
          </label>
          <Collapse isOpened={isMaterialsOpened}>
            <p className='materials'>{materials}</p>
          </Collapse>
        </div>
      );
    } else {
      return (
        <div>
          <label className='material-collapse'>
          <p  className='material-collapse'>Нажмите, чтобы увидеть мат. комп-т</p>
            <input
              type="checkbox"
              checked={isMaterialsOpened}
              onChange={() => setMaterialsOpened(!isMaterialsOpened)} />
          </label>
          <Collapse isOpened={isMaterialsOpened}>
            <p>{materials}</p>
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
        <h1 className='tooltip'>{capitalize(name)}
          <span 
            className='tooltiptext'
            style={{ width:`${otherName.split('').length*8}px`,
            marginLeft:`${otherName.split('').length*-4}px`}}
          >
            {capitalize(otherName)}
          </span>
        </h1>
        
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
        {(materials) ? materialCollapsible() : ''}
      </div>

      <div className="spellcard-description section">
        <p>{markdown(description)}</p>
      </div>

      {higherLevelsCheck()}

      <div className="spellcard-footer footer">
        <p>{levelAdjusted()}, {capitalize(school)}</p>
        <p>{source}</p>
      </div>
    </div>
  );
}

export default SpellCard;
