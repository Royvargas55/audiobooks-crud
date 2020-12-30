# Audiobook CRUD
Given an API documentation, a web page is created that can create, search, delete, and edit audio content models.

You can see the project working in the following link: https://audiobook-c1681.web.app/home

## How to run and use your application
To run the application it is necessary to have installed NodeJS

Once located in the main folder, execute the following command, to install all application dependencies:

    npm install
    
If you want to create the dist folder, with all the compiled files, it is necessary to execute the following command:

    npm run build

To run the application you have to execute the following command:

    npm run start

The application starts running on port **8080**, you can change the port in the **webpack.config.js** file, in the **devServer** section.

Open the browser and enter the URL: http://localhost:8080/
## Requirements:

 - [x] Search Audiobooks and display the results.
 - [x]  Add a new Audiobook to the list.
 - [x] Update an Audiobook from the list.
 - [x] View the list of all current Audiobooks
 - [x] Remove an Audiobook from the list.
 - [x] Create a friendly interface

These were the **minimum** requirements requested, but more features were added, for a better user experience.

## Bugs

 - Sometimes the application takes time to load the information.
 - My search results section sometimes does not disappear when the search bar is empty.

## To do improvements

Some of the improvements I would like to make are the following:

 - Add lazy loading to load the information as it is displayed and also add paging to load the information by blocks and thus improve the performance of the application.
 - Perform a refactoring of the API calls.
 - Add some media queries to make the application more responsive.

# Screenshots

**Home**

<a href="https://imgur.com/JSyRJOV"><img src="https://i.imgur.com/JSyRJOV.png" title="source: imgur.com" /></a>
<a href="https://imgur.com/xbQM2st"><img src="https://i.imgur.com/xbQM2st.png" title="source: imgur.com" /></a>


**Audiobook details**

<a href="https://imgur.com/CuEggSA"><img src="https://i.imgur.com/CuEggSA.png" title="source: imgur.com" /></a>
<a href="https://imgur.com/3TGqNvx"><img src="https://i.imgur.com/3TGqNvx.png" title="source: imgur.com" /></a>

**Forms**

<a href="https://imgur.com/Uu4vCn5"><img src="https://i.imgur.com/Uu4vCn5.png" title="source: imgur.com" /></a>
<a href="https://imgur.com/MffAtwR"><img src="https://i.imgur.com/MffAtwR.png" title="source: imgur.com" /></a>
