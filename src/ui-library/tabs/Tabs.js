import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Tab from "./Tab";

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid black;

  ${(props) => `
    & ${Tab}:nth-child(${props.activeTabIndex}) {
      border-bottom: 1px solid blue;
    }
  `}
`;

const Tabs = ({ activeTabIndex, children }) => {
  return (
    <TabsContainer activeTabIndex={activeTabIndex + 1}>
      {children}
    </TabsContainer>
  );
};

Tabs.defaultProps = {
  activeTabIndex: 0,
};

Tabs.propTypes = {
  activeTabIndex: PropTypes.number,
  children: PropTypes.node,
};

export default Tabs;
