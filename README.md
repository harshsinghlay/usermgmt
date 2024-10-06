# UserManager WebApp

## Description
**UserManager** is a responsive CRUD application designed to simplify user management. The app allows users to create, edit, update, and delete user information, while also providing filtering and searching capabilities for easy navigation. The project is built using **React** with **Tailwind CSS** for styling , **jsonplaceholderapi** for dummyuserdata and **Redux** for state management. This app is fully responsive and offers a clean, user-friendly interface to streamline user management tasks.

## Deployed Application
The application is deployed and accessible at [https://usermgmt.vercel.app]. You can explore all features directly through the live application without cloning the repository.

## Technologies Used
- **React**: JavaScript library for building interactive user interfaces.
- **Vite**: Fast and optimized build tool for frontend projects.
- **Tailwind CSS**: Utility-first CSS framework for responsive and customizable styling.
- **React Hook Form**: Efficient form handling and validation.
- **JSONPlaceholder API**: Mock API for handling user data.
- **Redux** : State container for JavaScript apps.

## How to Run the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/harshsinghlay/usermgmt.git
   ```

2. Navigate to the project directory:

   ```bash
   cd usermgmt
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the application.

## Features

- **Add Users**: Allows adding new users with details like name, email, and address.
- **Edit or Delete Users**: Users can modify existing information or remove users from the system.
- **User List**: Displays all users in a table, with options to view, edit, or delete each user.
- **Filter/Search Users**: Easily find users through filtering by name or searching by keyword.
- **Form Validation**: Ensures data integrity with form validation using React Hook Form.
- **Error Handling**: Displays meaningful error messages during user actions.
- **API Integration**: Uses JSONPlaceholder API for handling CRUD operations.
- **Custom Hooks**: Code is modularized with custom hooks for managing API requests.
- **Fully Responsive Design**: Provides optimal user experience across all devices.
- **State Management with Redux**: Manage application state efficiently with Redux.

## How to Use

1. **Add a User**: Navigate to the "Add User" form, fill in the required fields, and click "Submit" to add a new user.
2. **Edit a User**: Click on the edit button next to a user in the table, update the user's information, and submit the changes.
3. **Delete a User**: Click the delete button next to a user to remove them from the list.
4. **Search/Filter Users**: Use the search bar to filter users by name.

## Folder Structure

- **api.js**: Contains all API-related functions such as `createUser` , `fetchUsers` , `deleteUser` , `updateUser`.
- **components**: Houses the modular components like `UserTable`, `UserForm`, etc.

## License
This project is licensed under the MIT License.
