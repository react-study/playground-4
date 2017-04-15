import React from 'react';

const tablist = [
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, recusandae.',
    'Assumenda nulla aliquid consequuntur, quos doloribus et mollitia repellendus similique.',
    'Vel quisquam fugiat ullam totam, sit ex! Laudantium, veniam, placeat?',
    'Quibusdam officiis dicta provident cum eum adipisci tempore temporibus minus.'
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
