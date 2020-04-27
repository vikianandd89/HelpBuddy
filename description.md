## Application flow

The application comprises of two flows
1. User requests for help
2. User responding to help

### User requests for help
The app provides an IBM watson assistant chatbot to interact with user and handles the request and submits it to the database.

The chatbot uses IBM discovery API and CloudantDB to store the information

It acknowlegdes the user on successful completion

(https://github.com/prakashalamanda/HelpBuddy/blob/master/IBM_Chatbot.png)

### User responding to help

User can access the portal [Help your buddy](https://helpbuddy.eu-gb.mybluemix.net/)

please user the below credentials as we haven't integrated with different login providers like Google, Facebook.

username: phil@test.com
password: testuser

