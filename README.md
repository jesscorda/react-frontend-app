# Project Name

## Code Repository

- GitHub Repository: https://github.com/jesscorda/react-frontend-app

## Documentation

### Instructions on How to Set Up and Run the Project Locally

1. Clone the repository to your local machine using the following command:
    ```bash
    git clone https://github.com/jesscorda/react-frontend-app.git
3. Install dependencies: 
    ```bash
    npm i
4. Start the development server: 
    ```bash
    npm run dev:live
5. Open your web browser and navigate to [http://localhost:8080](http://localhost:8080) to view the application.

### How to Run the Unit Tests

1. Ensure that all dependencies are installed by running: 
    ```bash
    npm i
2. Run the unit tests using the following command: npm run test

### Assumptions or Limitations

1. It is assumed that at the first boot of the application, user with ADMIN role is present, if not it is created.
2. Only ADMIN users can create new users and grant them ADMIN or OWNER role.
3. The owners are not shown the users page.
4. The login api does not take into consideration the password entered, it only checks the username. Hence the username must be distinct.
5. The add and edit screens cannot be accessed via dedicated routes.
6. Implement error boundaries.

### Brief Explanation of Code Structure and Design Choices

1. The project uses React with Typescript to ensure better typing and TailwindCSS because it provides low-level utility classes to build custom designs quickly.
2. React Testing library and Jest is used for testing.
3. The app is segregated into components folder - where reusable components are kept and pages where route related pages are kept. This approach promotes extensibity and readability.
4. State management is done using useState hook rather than a state management library because of the simple structure of the app.
5. Data is persisted in the local storage for easy access and retrival.

## Functionality

1. Permission based UI.
2. Tasks list with the option to create, update and delete tasks. It is also possible to sort on the individual fields in ascending and descending order and also search for any property on the task.
3. Users list with the option to create, update and delete users. It is possible to search on any property of the user.
4. Tasks are shown to the user based on their role. Users with ADMIN role have access to the entire list, whereas those with OWNER role have access only to their own tasks.
5. Users can login and logout of the application.
