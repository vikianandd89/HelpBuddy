## Application flow

The application comprises of two flows
1. User requests for help
2. User responding to help

### User requests for help
The app provides an IBM watson assistant chatbot to interact with user and handles the request and submits it to the database.

The chatbot uses IBM discovery API and CloudantDB to store the information

It acknowlegdes the user on successful completion

![Chatbot](https://github.com/prakashalamanda/HelpBuddy/blob/master/IBM_Chatbot.png)

### User responding to help

User can access the portal [Help your buddy](https://helpbuddy.eu-gb.mybluemix.net/)

please user the below credentials as we haven't integrated with different login providers like Google, Facebook or create an user for yourself.

username: phil@test.com
password: testuser

He/She can see the notifications in the dashboard and accept/ignore to the request.

Once they accept the request then the app will ask for the number of quantities they would like to share.

They can enter and close the request and it will then get notified to the requester.

Once the requester accepted the request they both could see their contact details.

This helps to get the need in the real time and direct interaction between both end users.

Request notification
![Request](https://github.com/prakashalamanda/HelpBuddy/blob/master/Notifications.png)

Responding to request
![Responding](https://github.com/prakashalamanda/HelpBuddy/blob/master/RespondToRequest.png)

Response details
![Response](https://github.com/prakashalamanda/HelpBuddy/blob/master/response_details.png)


##Improvements
1. We are thinking to integrate with IBM push notification at later point in time due to time constraint
2. We have to apply a pattern matching in the request to give more detailed information as much as we can to the users willing to help
3. Add additional features to track history of the donations/help done by an users
