# 2c - Getting data from server

## Promises
A promise is an object that represents an asynchronous operation. A promise can
have three distinct states:

### The promise is pending:

It means that the final value (one of the followingtwo) is not available yet.

### The promise is fulfilled:

It means that the operation has been completed and the final value is available,
which generally is a successful operation. This state is sometimes also called resolved.

### The promise is rejected:

It means that an error prevented the final value from being determined, which 
generally represents a failed operation.

## Effect Hooks

The Effect Hook lets you perform side effects on function components.
Data fetching, setting up a subscription, and manually changing the DOM in
React components are all examples of side effects.
