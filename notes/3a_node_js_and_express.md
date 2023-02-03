# Part 3, Node js and Express

## REST

REST stands for Representational State transfer. It was
introduced in 2000 in Roy Fielding's 
[dissertation](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm).
REST is an architectural style meant for building scaleable web apps. 

### A narrow view of RESTful APIs

Singular things, like notes in an application, are called *resources* in RESTful thinking.
Every resource has an associated URL which is the resource's unique address.

Standard convention for creating unique addresses is to combine the name of the 
resource type with the resource's unique identifier. 

Ex: assume root URL: www.example.com/api

With a resource type of notes, then the address of a note resource with the 
identifier 10 has the unique address of www.example.com/api/notes/10

The URL for the entire collection of all note resources is www.example.com/api/notes

#### Resource operations

These are defined by the HTTP *verb*:

|URL|verb|functionality|
|-|-|-|
|notes/10|GET|fetches a single resource|
|notes|GET|fetches all resources in the collection|
|notes|POST|creates a new resource based on the request data|
|notes/10|DELETE|removes the identified resource|
|notes/10|PUT|replaces the entire identified resource with the request data|
|notes/10|PATCH|replaces a part of the identified resource with the request data|

With this, we define what REST refers to as a uniform interface
What is considered a REST API differs.

GET must never cause side effects. This means that it should not alter the state
of the database, and the response should only return data that already exists on
the server. 

The HEAD request should work like GET, but only return the status code and response
headers. 

All HTTP requests should be *idempotent*, which means that the side effects of
1 or more identical requests should be the same as a single request
