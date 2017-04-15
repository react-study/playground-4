import React from 'react';

const tablist = [
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis suscipit beatae corrupti nihil fugiat qui nam voluptatibus nulla dignissimos expedita veniam ea tempore necessitatibus, rerum ex, consectetur voluptates est, asperiores.',
    'Similique deserunt hic vero id ea. Odit voluptates ipsam ex, eveniet vitae a in officiis, at architecto voluptate eaque, veritatis quo fugiat ab ipsum eius quas. Tempore quibusdam dolores nam.',
    'Dicta cumque aut ratione vel voluptates provident libero, aspernatur, veritatis, suscipit nihil officiis nisi! Voluptate autem reprehenderit vero quo. Accusamus expedita cupiditate maiores officia saepe praesentium est neque nesciunt obcaecati.',
    'Dolores eaque eos reiciendis doloribus sequi accusantium provident dicta quam amet iusto in voluptatum quo eligendi minima, ratione, dolorem quaerat doloremque quisquam porro, corporis aperiam ut officiis. Quam, velit porro?'
];

const Tabs = ({
    focused,
    changeTab
}) => (
    <ul>
        {tablist.map((tab,i) => (
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
