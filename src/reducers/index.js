const initialState = {
    // data
    token: '',
    user: {},
    suites: [],
    testCases: [],
    suite: {},
    testCase: {},
    success: null,
    error: null,

    // UI state
    loading: false
};

export default (state = initialState, action) => {
    action = { ...action }
    const payload = action.payload;
    delete action.type;
    delete action.payload;
    // Joins previous state, payload and anything else left in action
    return Object.assign({}, state, action, payload);
}
