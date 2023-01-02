# 1d - A more complex state, debugging React apps

[[Home]](../README.md)

## Complex state

In order to have a more complex state of a react app, 
it is either possible to save the state as an object,
or to create several pieces of state for the app.

In react the state should never be mutated directly, as it can result in 
unexpected side effects. Changing the state should always be done by setting
the state to a new object. If properties from the previous state is not changed,
they should be copied into a new object, and setting that as the new state.

## Debugging React apps

When debugging with print statements, doing 

```javascript
    console.log('props value is', props)
```
rather than 

```javascript
    console.log('props value is' + props)
```

makes it so that you're able to inspect the separate elements of the string, 
including the props object.

### The debugger command

You can write ```debugger``` anywhere in the apps code in order to pause the
execution of the application with Chromes developer tools 

The debugger also allows us to execute the code line by line in order to find out
what the problems with the code is.

## Rules of React Hooks

```useState``` and ```useEffect``` should never be called from within a loop,
a conditional expression, or any place that is not a function defining a component.
This is because the hooks must always be called in the same order. 

Do not define components within other components. The biggest problem this can 
cause is that React treats a component defined within another component as a 
new component with every render. This causes React to fail to be able to optimize
the component. 
