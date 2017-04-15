import React from 'react';

const tablist = [
  'apple',
  'banana',
  'coconut',
  'dessert'
];

const Tabs = ({
  focused,
  chageTab
}) => (
  <ul>
    {tablist.map((tab, i) => (
      <li key = {`tablist${i}`} onClick={() => changeTab(i)}>
        <span>#{i}</span>
        <span style={{
          display: i === focused ? 'block' : 'none'
        }}>
          {tab}
        </span>
      </li>
    ))}
  </ul>
);

export default Tabs;
