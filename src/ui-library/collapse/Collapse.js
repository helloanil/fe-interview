import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { FaChevronCircleRight, FaChevronCircleDown } from "react-icons/fa";

const CollapseContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`;

const CollapseHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  padding: 10px;
  border-bottom: ${(props) =>
    props.isCollapsed ? "none" : "1px solid #d9d9d9"};
  background-color: #fafafa;
`;

const CollapseHeaderIconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const CollapseContent = styled.div`
  padding: 10px;
  display: ${(props) => (props.isCollapsed ? "none" : "initial")};
`;

const Collapse = ({ header, content }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const handleCollapseHeaderClick = () => setIsCollapsed(!isCollapsed);

  return (
    <CollapseContainer>
      <CollapseHeader
        onMouseUp={handleCollapseHeaderClick}
        isCollapsed={isCollapsed}
      >
        <CollapseHeaderIconContainer>
          {isCollapsed ? <FaChevronCircleRight /> : <FaChevronCircleDown />}
        </CollapseHeaderIconContainer>
        {header}
      </CollapseHeader>
      <CollapseContent isCollapsed={isCollapsed}>{content}</CollapseContent>
    </CollapseContainer>
  );
};

Collapse.propTypes = {
  header: PropTypes.node,
  content: PropTypes.node,
};

export default Collapse;
