import styled from 'styled-components';

export const Details = styled.details`
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(11, 11, 11, 0.1);
  border-radius: 15px;
  max-width: 320px;
  padding: 20px;
  margin: auto;
  height: auto;
  transition: 3s;
  summary {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
    font-weight: bold;
  }
  table {
    padding-top: 3px;
    width: 100%;
    border-top: 1px solid #000;
  }
  tbody {
    padding-top: 5px;
  }
  tr {
    width: 100%;
  }
  th {
    border-right: 1px solid #000;
    text-align: left;
    padding-left: 5px;
    width: 25%;
  }
  td {
    text-align: center;
  }
`;
