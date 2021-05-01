import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Tab from "./Tab";

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid black;
`;

const Tabs = (props) => {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  const isTabActive = (tabIndex) => activeTabIndex === tabIndex;

  const handleTabClick = (tabIndex) => setActiveTabIndex(tabIndex);

  return (
    <TabsContainer>
      <Tab active={isTabActive(0)} onClick={() => handleTabClick(0)}>
        Tab 1
      </Tab>
      <Tab active={isTabActive(1)} onClick={() => handleTabClick(1)}>
        Tab 2
      </Tab>
    </TabsContainer>
  );
};

Tabs.propTypes = {};

export default Tabs;
