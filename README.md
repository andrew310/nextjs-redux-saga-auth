# Next.js with redux-sagas, material-ui and jwt authentication using cookies

## The idea behind the example

Started with material-ui-1-beta/examples/nextjs, added in redux-sagas inspired by examples such as react-boilerplate.
I really like code-splitting with redux so I have actions/reducers/sagas/selectors for each 'entity'.
The closest example in the nextjs examples git was the one with apollo and redux-sagas, but it still needed a few updates such as the combineLazyReducer. This allows the middleware that checks for isLoggedIn to work.
Example taken from: https://medium.com/front-end-hacking/code-splitting-redux-reducers-4073db30c72e
Auth inspiration: https://medium.com/@positivecarlos/authentication-on-universal-react-with-next-js-b441ef458046
