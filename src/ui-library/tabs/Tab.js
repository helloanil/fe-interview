import styled from "styled-components";

const Tab = styled.div`
  border-bottom: ${(props) => (props.active ? "1px solid blue" : "none")};
  padding: 20px;
`;

export default Tab;
