# Helping People in need

[![Slack](https://img.shields.io/badge/Join-Slack-blue)](https://callforcode.org/slack) [![Website](https://img.shields.io/badge/View-Website-blue)](https://helpbuddy.eu-gb.mybluemix.net/)

## Contents

1. [Short description](#short-description)
1. [Demo video](#demo-video)
1. [The architecture](#the-architecture)
1. [Long description](#long-description)
1. [Project roadmap](#project-roadmap)
1. [Getting started](#getting-started)
1. [Live demo](#live-demo)
1. [Built with](#built-with)
1. [Contributing](#contributing)
1. [Authors](#authors)

## Short description

### What's the problem?

At any pandemic situation, there are people who need help. There are many people who are ready to help but they would struggle to find where the help is really need and how to connect with those people and help effectively to meet their basic needs.

### How can technology help?

Allow people to request for help which can be notifed to all people who are ready to help.

### The idea

Providing a web/mobile app for people to find others who need help and connecting them in real time.
We haven't used HERE location services to filter the people for receiving the notification.
This helps to find donors/volunteers nearest to your location and so it would help to receive the help quicker.

## Demo video

![Watch the video](https://youtu.be/ZjiMPW72UA4)

## The architecture

![Architecture](https://github.com/prakashalamanda/HelpBuddy/blob/master/assets/Architecture.PNG)

1 - Requester request for assistance with IBM chatbot.
2,3,4 - The message is forwarded to Cloudant DB via a IBM discovery API
5 - IBM Push notification reads the message and notifies to the web app
6 - Web App shows the message in the notificaiton panel
7 - User would see and accept/ignore the request and submit it back to API

Both Web Portal and Web service is protected using IBM APP Id.

## Long description

[More detail is available here](https://github.com/prakashalamanda/HelpBuddy/blob/master/description.md)

## Project roadmap

![Roadmap](https://github.com/prakashalamanda/HelpBuddy/blob/master/Roadmap.PNG)

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

What things you need to install the software and how to install them

1. NPM latest version 
2. Node latest version

### Installing
Download the source code from github.
Follow the steps below to get the development env running


```node
npm install
npm run ng serve
Server running at http://localhost:4200/
```

## Live demo

You can access the portal [Help your buddy](https://helpbuddy.eu-gb.mybluemix.net/)

please user the below credentials as we haven't integrated with different login providers like Google, Facebook or create an user for yourself.

username: phil@test.com 
password: testuser

You can find a running system to test at [assistanceportal.eu-gb.cf.appdomain.cloud](https://assistanceportal.eu-gb.cf.appdomain.cloud/)

## Built with

* Angualar 8
* Bootstrap
* IBM Watson Assistant
* IBM Discovery API
* IBM Cloudant DB

## Contributing

Please reach out to authors.

## Authors

* **Ananda Krishnan Rajasekar** 
* **Rajaprabhu** 
* **Sasi Munusamy** 
* **Prakash Alamanda** 
