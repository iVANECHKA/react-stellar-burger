import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from "react-redux";
import { getTabsNavigation } from "../../services/store-selectors.js";
function Tabs({tabData, onTabClick}) {
    

    const { activeTab } = useSelector(getTabsNavigation);
    
    return (
        <div style={{display: 'flex'}}>
            {tabData.map((tab) => (
                <Tab key={tab.value} value={tab.value} active={activeTab === tab.value} onClick={() => onTabClick(tab.value)}>
                    {tab.label}
                </Tab>
            ))}
        </div>
    );
}


export default Tabs;