import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
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


export default Tabs;