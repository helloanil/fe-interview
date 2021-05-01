import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CollapseContainer = styled.div`
  border: 1px solid black;
`;

const CollapseHeader = styled.div`
  padding: 10px;
  border-bottom: 1px solid black;
`;

const CollapseContent = styled.div`
  padding: 10px;
  display: ${(props) => (props.isCollapsed ? "none" : "initial")};
`;

const Collapse = (props) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const handleCollapseHeaderClick = () => setIsCollapsed(!isCollapsed);

  return (
    <CollapseContainer>
      <CollapseHeader onClick={handleCollapseHeaderClick}>
        {isCollapsed ? "›" : "⌄"} This is the collapse header
      </CollapseHeader>
      <CollapseContent isCollapsed={isCollapsed}>
        This is the collapse content
      </CollapseContent>
    </CollapseContainer>
  );
};

Collapse.propTypes = {};

export default Collapse;
