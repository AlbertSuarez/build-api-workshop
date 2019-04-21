# How to build an API workshop

[![HitCount](http://hits.dwyl.io/AlbertSuarez/build-api-workshop.svg)](http://hits.dwyl.io/AlbertSuarez/build-api-workshop)
[![GitHub stars](https://img.shields.io/github/stars/AlbertSuarez/build-api-workshop.svg)](https://GitHub.com/AlbertSuarez/build-api-workshop/stargazers/)
[![GitHub forks](https://img.shields.io/github/forks/AlbertSuarez/build-api-workshop.svg)](https://GitHub.com/AlbertSuarez/build-api-workshop/network/)
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/AlbertSuarez/build-api-workshop.svg)](https://github.com/AlbertSuarez/build-api-workshop)
[![GitHub contributors](https://img.shields.io/github/contributors/AlbertSuarez/build-api-workshop.svg)](https://GitHub.com/AlbertSuarez/build-api-workshop/graphs/contributors/)
[![GitHub license](https://img.shields.io/github/license/AlbertSuarez/build-api-workshop.svg)](https://github.com/AlbertSuarez/build-api-workshop/blob/master/LICENSE)

👷🏽‍♀️ Code for **How to build an API workshop** at [UPC Campus Nord](https://www.upc.edu/campusnord/en), a [Hackers@UPC](https://hackersatupc.org/) event.

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

You can understand an endpoint of an API as an **entry point into that mentioned black box**. You receive requests to that endpoint with some parameters, and magically you have to return some cool data in a proper way. That proper way is called [JSON](https://www.json.org/).

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

Going back to the previous point, in order to understand how to use those endpoints, we have to know how an API is properly **designed**.

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

### Query parameters / Body request / Headers

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