# Fundamentals of Web Apps

[[Home]](../README.md)

## HTTP GET

The server and web browser communicates using the [HTTP protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP).
View the network tab of the dev-tools to see how the browser and and server communicates.

### Traditional web applications

"Dumb", only fetches HTML data from the server, all application logic on the server

Web browser makes requests to the server using the GET method, which the server
responds to. Requests have different types, like document or image. 

### Loading a page containing JavaScript 

[Example used](https://studies.cs.helsinki.fi/exampleapp/notes)

Browser fetches html code defining the content and structure of the page from 
the server using an HTTP get request.

Links in the html causes the browser to also fetch CSS style sheets and eventual
javascript code files. 

Browser executes the javascript. Code makes an HTTP GET request, which returns
JSON data.

When data has been fetched, the browser executes an event-handler, which renders
the notes to the page using the DOM-api.

#### Forms and HTTP POST

The page uses a form element to post new notes. When the button on the form is 
clicked, the browser will send the user input to the server. The browser sends 
*five* http requests to the server.

The first one is the form submit request. This is an HTTP POST request. The 
server responds with HTTP status code 302. This is a URL redirect, with which the
server asks the browser to do a new HTTP GET request to the adress defined in the 
header's Location, the address *notes*. The browser then reloads the Notes page,
which causes three more HTTP requests: fetching the style sheet, the javascript code, 
and the JSON of the notes

The form tag has the attributes action and method. The action attribute defines 
the address the method (GET) is done to.



