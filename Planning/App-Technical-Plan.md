#App Plan
___

##BACK END

###Models

**USER**

* username: String
* avatar: String
* email: String
* passwordHash: String
* packages: [REFERENCED ID]

*Virtuals*
password
passwordConfirmation


**PACKAGE**

* contents: [ARRAY OF CATEGORIES]
* collection_time: String
	* NB. Created using a dropdown i.e. MORNING/LUNCH/AFTERNOON etc
* expiry: Date
* location: String
* notes: String

###Controllers

**authentications**

* Handles login/registration for users
* Handles CRUD for users

**packages**

* Handles CRUD for each package
	* Will be used to populate map with appropriate information
	* Potential for displaying only certain types of packages on the map i.e. via contents.

###Config

* Routes.js will contain all routes/authorization functionality

* Tokens.js will contain SECRET key for tokens
* Seeds.js will seed the database with users/packages

###Test

* package_test.js
	* Tests CRUD functionality for packages
* authentications_test.js
	*  Tests token functionality for users

Install and require in each test:

* chai
	* should
	* expect
* supertest
* api
* mongoose
* models

###app.js
Install and require:

* express
* morgan
* cors
* mongoose
* bodyParser
* router
* jwt
* secret token
* router
* promises?

##FRONT END

###CSS
* Potentially use SCSS/SASS for partials etc
* NORMALIZE CSS
* SKELETON
* app.css

###JS
* app.js

###Index.html