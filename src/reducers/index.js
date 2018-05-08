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
    console.log('action in reducer', action)
    delete action.type;
    const payload = action.payload;
    delete action.payload;

    return Object.assign({}, state, action, payload);
}
