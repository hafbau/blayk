export default [
    {
        _id: '1',
        title: 'Blayk Authentication suite',
        cases: [
            {
                _id: '1',
                title: 'Sucessful login',
                steps: [
                    {
                        category: 'operation',
                        order: 1,
                        target: {},
                        type: 'get',
                        options: {
                            value: 'http://staging.mystrengthbook.com'
                        }
                    },
                    {
                        category: 'operation',
                        order: 2,
                        target: {
                            type: 'css',
                            value: '#login-wrapper > form > div.frame.narrow > div > div:nth-child(1) > input'
                        },
                        type: 'sendKeys',
                        options: {
                            value: 'blake@tillerdigital.ca'
                        }
                    },
                    {
                        category: 'operation',
                        order: 3,
                        target: {
                            type: 'css',
                            value: '#login-wrapper > form > div.frame.narrow > div > div:nth-child(2) > input'
                        },
                        type: 'sendKeys',
                        options: {
                            value: 'T!ll3rTEAM'
                        }
                    },
                    {
                        category: 'operation',
                        order: 4,
                        target: {
                            type: 'css',
                            value: '#login-wrapper > form > div.frame.narrow > div > div:nth-child(5) > button'
                        },
                        type: 'click',
                        options: {
                            type: 'left'
                        }
                    },
                    {
                        category: 'assertion',
                        order: 5,
                        target: {
                            type: 'css',
                            value: 'body'
                        },
                        type: 'textNotContains',
                        options: {
                            value: 'Calendar'
                        }
                    },
                    {
                        category: 'operation',
                        order: 41,
                        target: {
                            type: 'css',
                            value: '#login-wrapper > form > div.frame.narrow > div > div:nth-child(5) > button'
                        },
                        type: 'click',
                        options: {
                            type: 'left'
                        }
                    },
                    {
                        category: 'assertion',
                        order: 51,
                        target: {
                            type: 'css',
                            value: 'body'
                        },
                        type: 'textNotContains',
                        options: {
                            value: 'Calendar'
                        }
                    },
                    {
                        category: 'operation',
                        order: 42,
                        target: {
                            type: 'css',
                            value: '#login-wrapper > form > div.frame.narrow > div > div:nth-child(5) > button'
                        },
                        type: 'click',
                        options: {
                            type: 'left'
                        }
                    },
                    {
                        category: 'assertion',
                        order: 52,
                        target: {
                            type: 'css',
                            value: 'body'
                        },
                        type: 'textNotContains',
                        options: {
                            value: 'Calendar'
                        }
                    },
                    {
                        category: 'assertion',
                        order: 6,
                        target: {
                            type: 'css',
                            value: 'body'
                        },
                        type: 'textContains',
                        options: {
                            value: 'Calendar'
                        }
                    }
                ]
            },
            {
                _id: '2',
                title: 'Unsucessful login',
                steps: [

                ]
            },
            {
                _id: '3',
                title: 'Sucessful logout',
                steps: [

                ]
            }
            
        ]
    },
    {
        _id: '2',
        title: 'Blayk Create Test Workflow',
        cases: [
            {
                _id: '1',
                title: 'Sucessful create test',
                steps: [

                ]
            },
            {
                _id: '2',
                title: 'Unsucessful create test',
                steps: [

                ]
            }
        ]
    },
    {
        _id: '3',
        title: 'Blayk Run Test Workflow',
        cases: [
            {
                _id: '1',
                title: 'Sucessful run test',
                steps: [

                ]
            },
            {
                _id: '2',
                title: 'Unsucessful run test',
                steps: [

                ]
            }
        ]
    },
    {
        _id: '4',
        title: 'Blayk All Tests workflow',
        cases: [
            {
                _id: '1',
                title: 'View test',
                steps: [

                ]
            },
            {
                _id: '2',
                title: 'Edit test',
                steps: [

                ]
            }
        ]
    },
    {
        _id: '5',
        title: 'Blayk Scheduling tests suite',
        cases: [
            {
                _id: '1',
                title: 'Sucessful schedule test',
                steps: [

                ]
            },
            {
                _id: '2',
                title: 'Unsucessful schedule test',
                steps: [

                ]
            }
        ]
    }
]