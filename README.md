# How to build an API workshop

[![HitCount](http://hits.dwyl.io/AlbertSuarez/build-api-workshop.svg)](http://hits.dwyl.io/AlbertSuarez/build-api-workshop)
[![GitHub stars](https://img.shields.io/github/stars/AlbertSuarez/build-api-workshop.svg)](https://GitHub.com/AlbertSuarez/build-api-workshop/stargazers/)
[![GitHub forks](https://img.shields.io/github/forks/AlbertSuarez/build-api-workshop.svg)](https://GitHub.com/AlbertSuarez/build-api-workshop/network/)
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/AlbertSuarez/build-api-workshop.svg)](https://github.com/AlbertSuarez/build-api-workshop)
[![GitHub contributors](https://img.shields.io/github/contributors/AlbertSuarez/build-api-workshop.svg)](https://GitHub.com/AlbertSuarez/build-api-workshop/graphs/contributors/)
[![GitHub license](https://img.shields.io/github/license/AlbertSuarez/build-api-workshop.svg)](https://github.com/AlbertSuarez/build-api-workshop/blob/master/LICENSE)

👷🏽‍♀️ Code for **How to build an API workshop** at [UPC Campus Nord](https://www.upc.edu/campusnord/en), a [Hackers@UPC](https://hackersatupc.org/) event.

## Table of contents

1. [Introduction](#introduction)
2. [Theory](#theory)
   1. [What's an API?](#whats-an-api)
   2. [API endpoints](#api-endpoints)
   3. [Input](#input)
      1. [Headers](#headers)
      2. [Query parameters](#query-parameters)
      3. [Request body](#request-body)
   4. [Output](#output)
      1. [JSON](#json)
      2. [HTTP Response status codes](#http-response-status-codes)
3. [Practice](#practice)
4. [Tools](#tools)

## Introduction

This workshop has the goal of introducing the concept of the APIs and learning how to build one. In order to understand the concept of *black box* of the APIs, we are gonna have an [HTML](/index.html) page, hosted [here](https://asuarez.dev/build-api-workshop/), where you will be able to test your API.

For doing this workshop in a proper way, a bit of theory is needed for understanding how we are gonna build the API, and why we should do it in that way. After, in the practice section, there will be few exercises, given a code structure, where we finally will implement a RESTFul API in Python.

## Theory

### What's an API?

APIs, also known as Application Programming Interfaces, at their most basic level, allows applications to talk to other applications, but they are so much more than this when you begin to explore the world of APIs further.

You can consider an API as a *black box* where given some **input** you have some **output**, indepently of which programming languange you are using or how you implement the black box. At the end, it's a box anyways.

> The API is like an artist performing on stage, and its users are the audience.

RESTFul APIs are the most common in the current state of art of Computer Science. This kind of APIs uses [HTTP](https://searchwindevelopment.techtarget.com/definition/HTTP) requests to GET, PUT, POST and DELETE data. They use **GET** to retrieve a resource; **PUT** to change the state of or update a resource, which can be an [object](https://searchmicroservices.techtarget.com/definition/object), [file](https://whatis.techtarget.com/definition/file) or [block](https://searchsqlserver.techtarget.com/definition/block); **POST** to create that resource ; and **DELETE** to remove it.

### API endpoints

You can understand an endpoint of an API as an **entry point into that mentioned black box**. You receive requests to that endpoint with some parameters, and magically you have to return some cool data in a proper way. That proper way is called [JSON](https://www.json.org/), which we'll be explainer later.

In order to understand how to use those endpoints, we have to know how an API is properly **designed**.

Let’s write few endpoints for an API that has **Companies** which has some **Employees,** to understand more.
`/getAllEmployees` is an API which will respond with the list of employees.

Few more APIs around a **Company** will look like as follows:

- `/addNewEmployee`
- `/updateEmployee`
- `/deleteEmployee`
- `/deleteAllEmployees`
- `/promoteEmployee`
- `/promoteAllEmployees`

And there will be tons of other API endpoints like these for different operations. All of those will contain many redundant actions. Hence, all these API endpoints would be burdensome to maintain, when API count increases.

**What is wrong?** The URL should *only* contain resources(nouns) not actions or verbs. The API path`/addNewEmployee` contains the action `addNew` along with the resource name `Employee`.

**Then what is the correct way?**`/companies` endpoint is a good example, which contains no action. But the question is how do we tell the server about the actions to be performed on `companies` resource viz. whether to *add*, *delete* or *update*?

This is where the [HTTP methods](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) (GET, POST, DELETE, PUT), also called as verbs, play the role.

The resource should always be **plural** in the API endpoint and if we want to access one instance of the resource, we can always pass the id in the URL.

- method `GET` path `/companies` should get the list of all companies.
- method `GET` path `/companies/34` should get the detail of company 34.
- method `DELETE` path `/companies/34` should delete company 34.

Other RESTFul APIs prefers to design these paths using query parameters instead of having the `ID` in the path directly. Something like:

- method `GET` path `/companies?id=34` should get the detail of company 34.

Wait, did you say *query parameters*? What's that? Let's talk a bit about how we can specity the input of the black box.

### Input

In order to specify the input of the black box, there are **three** ways for doing it. However, not all of them can be used in all the scenarios.

#### Headers

This kind of input can be used in the four HTTP methods. It's usually being used for security parameters or for configuring the request to the API.

#### Query parameters

This type of parameter is being used in the *four types* of the methods but not 100% recomended in POST. This input is always specified in the URL path directly. For example:

- **GET** `https://api.example.com/students?university=UPC&faculty=FIB` returns all the students from `UPC` university and the faculty `FIB`.
- **DELETE** `https://api.example.com/subjects?code=XC` deletes the subject with `XC` as code.

> **Note**: See that `&` character in the URL path is for concatenating multiple query parameters.

#### Request body

This kind of input is only allowed in POST and PUT methods. This is usually useful for letting the request know which data should be added or modified. There are a bunch of [different request bodies](http://www.iana.org/assignments/media-types/media-types.xhtml), where you can specify which one as a header using `Content-Type` parameter. Howerver, the most common one is `application/json`.

### Output

That we know how to specify the input of the black box, let's see some information about the output.

In most cases, when you are specifying the reponse of a RESTFul API, there is always two things to return: the response if self (formatted as JSON) and the HTTP status code.

#### JSON format

**JSON** (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate.

```json
{
  "widget": {
    "debug": "on",
    "window": {
        "title": "Sample Konfabulator Widget",
        "name": "main_window",
        "width": 500,
        "height": 500
    },
    "image": { 
        "src": "Images/Sun.png",
        "name": "sun1",
        "hOffset": 250,
        "vOffset": 250,
        "alignment": "center"
    }
  }
}
```

There are more ways to specify the output of an API, but we are gonna use JSON as the one since is the most common in most of the RESTFul APIs.

#### HTTP Response status codes

Response status codes are part of the HTTP specification. There are quite a number of them to address the most common situations. In the spirit of having our RESTful services embrace the HTTP specification, our Web APIs should return relevant HTTP status codes. For example, when a resource is successfully created (e.g. from a POST request), the API should return HTTP status code 201. A list of valid [HTTP status codes](https://www.restapitutorial.com/httpstatuscodes.html) is available [here](https://www.restapitutorial.com/httpstatuscodes.html) which lists detailed descriptions of each.

Suggested usages for the **Top 10 HTTP Response Status Codes** are as follows:

- **200 OK**

  General success status code. This is the most common code. Used to indicate success.

- **201 CREATED**

  Successful creation occurred (via either POST or PUT). Set the Location header to contain a link to the newly-created resource (on POST). Response body content may or may not be present.

- **204 NO CONTENT**

  Indicates success but nothing is in the response body, often used for DELETE and PUT operations.

- **400 BAD REQUEST**

  General error for when fulfilling the request would cause an invalid state. Domain validation errors, missing data, etc. are some examples.

- **401 UNAUTHORIZED**

  Error code response for missing or invalid authentication token.

- **403 FORBIDDEN**

  Error code for when the user is not authorized to perform the operation or the resource is unavailable for some reason (e.g. time constraints, etc.).

- **404 NOT FOUND**

  Used when the requested resource is not found, whether it doesn't exist or if there was a 401 or 403 that, for security reasons, the service wants to mask.

- **405 METHOD NOT ALLOWED**

  Used to indicate that the requested URL exists, but the requested HTTP method is not applicable. For example, POST */users/12345* where the API doesn't support creation of resources this way (with a provided ID). The Allow HTTP header must be set when returning a 405 to indicate the HTTP methods that are supported. In the previous case, the header would look like "Allow: GET, PUT, DELETE"

- **409 CONFLICT**

  Whenever a resource conflict would be caused by fulfilling the request. Duplicate entries, such as trying to create two customers with the same information, and deleting root objects when cascade-delete is not supported are a couple of examples.

- **500 INTERNAL SERVER ERROR**

  Never return this intentionally. The general catch-all error when the server-side throws an exception. Use this only for errors that the consumer cannot address from their end.

> **TIP**: For knowing all the HTTP codes without dying, it's cool to checkout this [website](https://http.cat/) called HTTP.cat. Just check it.

## Practice

Now that we already understood (I hope) all the concepts related to create an API, let's make it real.

The idea of this section is to create some endpoints of an API using [Python](https://www.python.org/) and the [Flask](http://flask.pocoo.org/) library. Flask is a simple, yet very powerful Python web framework, specially very useful for a hackathon environment.

All the code related to this section is under the `api` path. For installing all the dependencies, take a look at the [README](api/README.md) where is well detailed. The folder structure is the following.

```
.
├── requirements.lock
├── requirements.txt
└── src
    ├── __init__.py
    ├── __main__.py
    └── api.py
```

- **requirements.txt**: contains a list of the Python libraries needed for building a Flask API.
- **requirements.lock**: contains the same list as before but with the versions and other needed libraries specified.
- **src**: folder containg all the code related to the API.
- **__init__.py**: file needed in Python for specifying that the current directory is a Python module.
- **__main__.py**: file needed in Python for specifying the main function for this Python module.
- **api.py**: file where the Flask application is created (and where we are gonna implement the endpoints).

## Tools

### Postman

[Postman](https://www.getpostman.com/) is one of the most famous, if not the most, tools for firing requests to an API. It is very lightweight and fast. Requests can be organized in groups, also tests can be created with verifications for certain conditions on the response. With its features, it is very good and convenient API tool. It is possible to make different kinds of HTTP requests – *GET*, *POST*, *PUT* and *DELETE*. It is possible to add headers to the requests.

## Authors

- [Albert Suàrez](https://github.com/AlbertSuarez)

## License

MIT © Albert Suàrez
