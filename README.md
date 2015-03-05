# Ionic FlowFact API Connector Example AngularJS

Ionic starter project connecting to FlowFact direct API Service.

Based on [FlowFact API Documentation](https://flowfact.atlassian.net/wiki/display/FA/Version+1.0.X;jsessionid=00F71B803B338F15309B449A13EFBABC)

Requires [Node.js](http://nodejs.org/), [Ionic](http://ionicframework.com/) and [Cordova](http://cordova.apache.org/)

Once the above prerequesites are installed, go to project folder and start the example with:

    ionic serve

or 

    ionic serve --lab

To prevent cors issue, ionic serve requires "Ionic Proxy" to be used (see ionic.project):

    .constant("APISERVER", "http://localhost:8100/com.flowfact.server/api")

For live deployment change the above line to the desired API server, i.e.:

    .constant("APISERVER", "https://flowfactapi.flowfact.com/com.flowfact.server/api")
