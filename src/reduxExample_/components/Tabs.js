import React from 'react';

const tablist = [
  '탭컨텐츠 11111',
  '탭컨텐츠 22222',
  '탭컨텐츠 33333'
]

const Tabs = ({
  focused,
  changeTab
}) => (
  <ul>
    {tablist.map((tab, i) => (
      <li key={`tablist${i}`} onClick= {() => changeTab(i)}>
        <span>#{i}</span>
        <span style={{
            display: i === focused ? 'block':'none'
        }}>
          {tab}
        </span>
      </li>
    ))}
  </ul>
);

export default Tabs;
