# WDI_LDN_18_GROUP_PROJECT_3
WDI-18-LDN-GROUP-PROJECT


Lise Muller
Snita Bharth
Max Hilliard
Andy Hunt

#Web development Group Project "Excess" (by Cochons D'Inde).

###Brief:

### Technical Requirements

Your app must:

* **Use Mongo & Express** to build an API and a front-end that consumes it
* **Create an API using at least 2 related models**, one of which should be a user
* Include **all major CRUD functions** in a **RESTful API** for at least one of those model
* **Consume your own API** by making your front-end with HTML, Javascript, & jQuery
* **Add authentication to your API** to restrict access to appropriate users
* **Craft thoughtful user stories together**, as a team
* **Manage team contributions and collaboration** using a standard Git flow on Github
* Layout and style your front-end with **clean & well-formatted CSS**
* **Deploy your application online** so it's publically accessible


---

### Necessary Deliverables

* A **working API, built by the whole team**, hosted somewhere on the internet
* A handmade front-end **that consumes your own API**, hosted somewhere on the internet
* A **link to your hosted working app** in the URL section of your Github repo
* A **team git repository hosted on Github**, with a link to your hosted project, and frequent commits from ​_every_​ team member dating back to the ​_very beginning_​ of the project
* **A ``readme.md`` file** with:
   * Explanations of the **technologies** used
   * A couple paragraphs about the **general approach you took**
   * **Installation instructions** for any dependencies
   * Link to your **user stories** – who are your users, what do they want, and why?
   * Link to your **wireframes** – sketches of major views / interfaces in your application
   * Descriptions of any **unsolved problems** or **major hurdles** your team had to overcome


---

###Our project: EXCESS

* An app to provide people with a platform for sharing food resources that woud otherwise be wasted.



![](http://i.imgur.com/czUJE4t.png)

* Uses **Google maps API** and **Geocoder**
* Databasing with **mongoDB/mongoose**
* [Image picker](rvera.github.io)
* Styled with **Skeleton** and **SCSS**
* Planned using traditional wireframing and [Marvel](https://marvelapp.com/e85c10)
* Project managed using **Trello**
* **Test Driven Development** using **Mocha** and **Chai**
* Authenticated using **JWT**

___
###Features to Add

* Set package expiry/packages are removed automatically from the DB
* Avatar/image uploader
* In-app messaging service/notifications
* More work on responsive design

___
###Use Case 1 - Creating a food package

* User logs in/registers
* Enter postcode of user's current location
* **Create package**
	* User can select icons referring to the contents of the package, make notes on the contents, set convenient pickup time and details for other users to contact them on.
	* User then enters the postcode of a convenient pickup location

* **Package is then added to the map for others to see**

* Packages can be edited or archived at any time using the **manage packages** feature

___
###Use Case 2 - searching for other users' excess food packages

* User logs in/registers
* Enter postcode of user's current location
* Click on nearby packages on the map for information about its content/notes and contact details
