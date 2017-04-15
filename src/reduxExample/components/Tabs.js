import React from 'react';

const tablist = [
    '1111111',
    '2222',
    '33333',
    '44444'
];

const Tabs = ({
    focused,
    changeTab
}) => (
    <ul>
        {tablist.map((tab, i) => (
            <li key={`tablist${i}`} onClick={() => changeTab(i)}>
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