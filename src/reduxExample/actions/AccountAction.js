//action creator

const save = money => ({
    type: "SAVE_MONEY",
    money
});


const withdraw = money => ({
    type: "WITHDROW_MONEY",
    money
});

export default{
    save,
    withdraw
}