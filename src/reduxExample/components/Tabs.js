import React from 'react';

const tablist = [
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,consequuntur. ',
    'Dolor hic ipsum mollitia necessitatibus omnis quis quo repellat unde!',
    'Aut culpa impedit minima omnis ullam.Ab accusamus ea iste!',
    'Aut deleniti dolorem ducimus ipsum iure laudantium nam officiis ratione.'
];

const Tabs = ({
    focused,
    changeTab
}) => (
    <ul>
        {tablist.map((tab, i) =>(
            <li key={`tablist${i}`} onClick={()=> changeTab(i)}>
                <span>#{i}</span>
                <span style={{
                    display: i === focused? "block":"none"
                }}>
                    {tab}
                </span>
            </li>
        ))}
    </ul>
);

export default Tabs;