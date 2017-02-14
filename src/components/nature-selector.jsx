import React from 'react';
import data from '../config/natures.csv';

export default class NatureSelector extends React.Component {
  render() {
    return (
      <select>
        {data.map(nature => {
          return <option value={nature.Nature}>{nature.Nature}</option>;
        })}
      </select>
    );
  }
};
