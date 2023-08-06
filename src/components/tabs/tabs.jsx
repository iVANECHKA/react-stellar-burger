import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from "react-redux";
import { getTabsNavigation } from "../../services/store-selectors.js";
import PropTypes from 'prop-types';


function Tabs({ tabData, onTabClick }) {

    const { activeTab } = useSelector(getTabsNavigation);

    return (
        <div style={{ display: 'flex' }}>
            {tabData.map((tab) => (
                <Tab key={tab.value} value={tab.value} active={activeTab === tab.value} onClick={() => onTabClick(tab.value)}>
                    {tab.label}
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
      })
    ).isRequired,
    onTabClick: PropTypes.func.isRequired,
  };


export default Tabs;