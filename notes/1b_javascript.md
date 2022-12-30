# 1b. JavaScript

[[Home]](../README.md)

Because browser do not yet support all newer JavaScript features. Due to this,
a lot of code that browsers are intended to run is transpiled. Transpiled code 
means that its translated to code that is compatible with older versions of 
javascript. The most popular transpiler today is *Babel*

## Variables

There are several ways of defining a vaiable in javascript. let, const, and var.

Creating a variable using ```const``` makes the variable a constant. ```let``` on
the other hand creates a normal changeable variable. For a long time ```var```
was the only way to define a variable. The use of var is generally ill adviced.

## Arrays

### forEach

On way of iterating through an array is using forEach. forEach can be called on
an array and will perform the passed function for every item of the array.
forEach can receive other arguments, such as *index*, which shows the index of
the current element, *array* which shows the array forEach was called on, and the
valua that is to be used as ```this``` when executing the function.

### Immutable data and concat

React often uses functional programing techniques, in which the use of immutable
data structures is common. Because of this, it is generally advised to use the 
array method concat in stead of push. Where push changes the given array, concat returns
a new one, leaving the original unchanged.  

### Map
Another useful method for arrays is *map*. Map iterates through the array and performs
an action on each item, and returns a new array containing the modified values.

### Destructuring assignment

Indiviual items of an array can easily be assigned to variables using the destructuring
assignment. 

```javascript
const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t

console.log(first, second)  // 1, 2 is printed
console.log(rest)          // [3, 4, 5] is printed
```

Destructuring also works with objects

```javascript
const object1 = {
    var1: 1,
    var2: 2,
    var3: 3
    }

```

Assignment by destructuring the object: 
```javascript
const {var1, var2, var3} = object1
```

## Objects

```javascript
const object = {
    a: 1,
    b: 2,
    c:3
    }
```

Can be accesed with bracket or dot notation. If the property includes spaces, 
the bracket notation has to be used. 

### Object methods and 'this'

When using newer versions of react, that includes hooks, theres no need for 
defining objects with methods. 

Methods can be assigned to an object by defining properties that are functions, 
and can be assigned even after the creation of the object. 

When calling a method through a reference, the method loses the knowledge of what
the original ```this``` was.

```javascript
arto.greet()       // "hello, my name is Arto Hellas" gets printed

const referenceToGreet = arto.greet
referenceToGreet() // prints "hello, my name is undefined"
```

There are several ways of preserving the original ```this```. One of these is 
using a method call ```bind```

*Arrow functions* should not be used as methods for objects, because they break the
```this``` functionality

# Classes

There is not a class feature in JavaScript, like in other object oriented languages.
There are however a features 'simulating' classes. 
