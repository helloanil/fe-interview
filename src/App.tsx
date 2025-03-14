import React from 'react';

import Tabs from './ui-library/tabs/Tabs';
import Tab from './ui-library/tabs/Tab';
import Merchants from './components/Merchants';

const App: React.FunctionComponent = () => {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  const handleTabClick = (event: any) => setActiveTabIndex(event.target.tabIndex);

  return (
    <>
      <Tabs activeTabIndex={activeTabIndex}>
        <Tab tabIndex={0} onClick={handleTabClick}>
          Bills
        </Tab>
        <Tab tabIndex={1} onClick={handleTabClick}>
          Potential Bills
        </Tab>
      </Tabs>
      <Merchants isBill={activeTabIndex === 0} />
    </>
  );
}

export default App;
