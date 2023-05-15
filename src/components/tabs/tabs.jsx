import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
function Tabs() {
    
    const tabsData = [
        'Булки',
        'Соусы',
        'Начинки'
    ];
    const [current, setCurrent] = useState(tabsData[0]);
    
    return (
        <div style={{display: 'flex'}}>
            {tabsData.map((tab) => (
                <Tab key={tab} value={tab} active={current === tab} onClick={setCurrent}>
                    {tab}
                </Tab>
            ))}
        </div>
    );
}

Tabs.propTypes = {
    tabData: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

export default Tabs;