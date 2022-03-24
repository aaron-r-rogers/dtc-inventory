

# DTC: Inventory

*Project Duration: 2 Week Sprint*

DTC: Inventory is a web application optimized for mobile which supports [Danish Teak Classics](https://www.danishteakclassics.com/).  Danish Teak Classics is a purveyor of fine vintage furniture, and they have a warehouse full of unrestored furniture.  This app allows them to easily see and sift through the many pieces in their inventory by adding, editing, and deleting pieces of furniture.  There is a guest function which allows users to see but not change any furniture, and they may search by text and filter by category or dimensions.  The furniture is organized by cards, which when clicked into, show further details about the selected item.  Admin functionality includes photo upload along with adding furniture, adding and deleting categories, designers, or materials, and user management.

## Screenshots

![2022-03-24 13 01 23](https://user-images.githubusercontent.com/87159469/159981911-c24f6663-489c-4790-8ec3-9c88e123d707.gif)
![2022-03-24 13 03 18](https://user-images.githubusercontent.com/87159469/159981934-85b7aee6-ea5d-4ce7-be76-b9cf3d4d52be.gif)

## Prerequisites

Before getting started working with this application, you should have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Database Setup

Make a new database called `dtc_inventory` in PostgreSQL and use the **database.sql** file in the root of this project to set up all of your tables.

## Installation

1. Run `npm install`
2. Start Postgres using `brew services start postgresql`
    - only required if PG is not already running
3. Open a terminal and run `npm run server`
4. Open another terminal and run `npm run client`
5. This should open a new tab in your browser at `localhost:3000`

## How to Use DTC: Inventory

- A new user to DTC: Inventory is a guest by default.
- Any guest user can be made into an admin user by any other admin.
- The nav bar at the top permits navigation from anywhere to anywhere.
- After logging in, a user will be brought to the home page which has every piece of furniture organized in cards with the most recently updated at the top.
    - On the home page, the search uses all text associated with that piece.  This includes category, designer, material, and any comments left about the item.
    - There is a dropdown which filters the furniture by category (i.e. sofas, dining tables, lounge chairs, etc.)
    - The dimensions filter uses a minimum and maximum for width, depth, and height.  
- Clicking "details" reveals more information about the item than is apparent on the home page.
    - For admin users, there is an edit details option within the details view where the material, category, designer, dimensions, or comments can be altered.
- If an admin user navigates to the add view, they begin adding a furniture item by uploading a photo.
    - They will select "choose file" to select the file they wish to upload.
    - Once a file is chosen, the "upload" button alerts the user that their file has been successfully added.
    - The piece is tagged with a material, designer, and category using dropdowns.
    - Minimum and maximum dimensions are entered into text fields, and this is to account for modular furniture or furniture that can expand in size.
    - A large text field is available for anyone to leave more extensive comments or descriptions about the piece such as when it was manufactured, who manufactured it, or any cosmetic defects that need to be addressed during restoration.
    - The "add" button alerts the user that the item has been successfully added and returns them to the home page where their newly added item appears at the top.
- The admin section of the app uses tabs to add, delete, or manage users.
    - Add uses one text field and three buttons to add information to either the material, designer, or category lists.
    - Delete uses dropdowns and buttons for removing information from the same three lists.
    - The users tab is where each user's username and authorization level can be viewed and toggled.
- Finally, the log out button logs out the user and returns them to where they can either login or register a new user. 

## Built With

This application uses the following technologies:

- [React](https://reactjs.org/)
- [Redux](https://maven.apache.org/)
- [Redux-Sagas](https://redux-saga.js.org/)
- [Express](https://expressjs.com/)
- [Passport](http://www.passportjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Material-UI](https://material-ui.com/)
- [SweetAlert2](https://sweetalert2.github.io/)

(a full list of dependencies can be found in `package.json`)

## Acknowledgements

- I would like to thank [Prime Digital Academy](https://github.com/PrimeAcademy) for empowering me to put my acquired skills into action.
- A very special thanks to the Woodall cohort instructor, Edan Schwartz, for providing the tools and knowledge to build this application. His instruction has been invaluable in leading us down the road to successful careers as software developers.

## Support

For any questions, concerns, or suggestions feels free to contact me.
