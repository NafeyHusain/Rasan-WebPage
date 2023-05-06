import { authConstants } from "../actions/constants";

const initState = {
    name: "nafey",
};

/* eslint-disable */
export default (state = initState, action) => {
    console.log("====================================");
    console.log(action);
    console.log("====================================");
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                ...action.payload,
            };
            break;
    }

    return state;
};
