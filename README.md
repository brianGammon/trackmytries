# TrackMyTries

Track your fitness progress by recording every "Try" of one of the PRT exercises (Sit ups, Push ups, Pull ups, or 1.5 mile run).

http://trackmytries.com

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisities

Make sure your system has the following foundational software installed:

* NodeJS
* A [Firebase](http://www.firebase.com) instance
* JDK (for running e2e tests, install prior running ```npm install``` on project)

Next, globally install bower and gulp:
```
npm install -g gulp bower
```

### Installing

Clone the repo into your projects directory:

```
git clone https://github.com/brianGammon/trackmytries.git
cd trackmytries
```
The app uses Firebase as a backend-as-a-service, please set your firebase root reference in:
```
app/common/constants/firebase-url-constant.js
``` 
Next, install the dependencies and launch:

```
npm install
gulp
```

The ```npm install``` command will automatically run bower install and gulp to compile the assets. Investigate any npm errors, common issue is Protractor or Selenium problems due to no JDK on the system.

The default ```gulp``` task will build, lint, run all unit tests. If everything passed the app will launch in the browser with BrowserSync connected.

## Running the tests

### Unit tests
Unit tests are automatically run when ```gulp``` is used to start up the development environment.


### End to end tests

The e2e tests require JDK to be installed, and are executed using Chrome, but other browsers can be configured.

```
gulp webdriverUpdate
gulp e2eTest
```
For e2e tests to run, a localhost must be started first in a separate tab using ```gulp```.

## Authors

* **Brian Gammon** - *Initial work* - [GitHub](https://github.com/brianGammon)

## License

This project is licensed under the MIT License

## Acknowledgments

* Generated with [ng-poly](https://github.com/dustinspecker/generator-ng-poly/tree/v0.12.1) version 0.12.1*
