const initialState = {
    accountList: []
};

const AccountReducer = (prevState = initialState, action) => {

    const money = +action.money;
    const prevAccount = prevState.accountList;
    const lastResult = prevAccount.length
        ? prevAccount[prevAccount.length - 1].result
        : 0;

    switch (action.type) {
        case 'SAVE_MONEY' : {
            return {
                accountList: [
                    ...prevAccount, {
                        type: action.type,
                        money,
                        result: lastResult + money
                    }
                ]
            }
        }
        case 'WITHDRAW_MONEY': {
            return {
                accountList: [
                    ...prevAccount, {
                        type: action.type,
                        money,
                        result: lastResult - money
                    }
                ]
            }
        }
        default :
            return prevState;
    }
};

export default AccountReducer;