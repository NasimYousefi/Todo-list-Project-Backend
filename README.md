https://github.com/NasimYousefi/Todo-list-Project-FrontEnd

https://github.com/NasimYousefi/Todo-list-Project-Backend

# Student TodoList Project

# Project Overview

This backend project is designed to manage tasks and user authentication efficiently. Below are the key components and functionalities of the application.

## Project Components

### User Interface (UI)

- Task List View: 
  - Displays a comprehensive list of tasks with options to mark tasks as complete or delete them.
  
- Task Creation Form: 
  - A user-friendly form to add new tasks, including fields for title, description, and due date.

- Task Editing: 
  - Provides an interface for modifying existing tasks, allowing users to update details as needed.

- User Authentication: 
  - Includes registration and login forms to manage user accounts securely.

### API Development

- Endpoints: 
  - RESTful API endpoints for performing CRUD operations and user authentication:
    - GET /tasks - Retrieve all tasks.
    - POST /tasks - Create a new task.
    - PUT /tasks/:id - Update an existing task.
    - DELETE /tasks/:id - Delete a specific task.
    - POST /register - User registration.
    - POST /login - User login.

### Database Management

- Schema Design: 
  - Defines schemas for users and tasks to ensure data integrity and organization.

- Data Operations: 
  - Implements CRUD operations for tasks and authentication mechanisms to manage user data effectively.

### Authentication

- User Registration: 
  - Allows new users to create accounts easily.

- User Login: 
  - Authenticates users and manages sessions using JSON Web Tokens (JWT) for enhanced security.

### Deployment

- Dockerization: 
  - Containerizes the application to ensure consistency across different environments.

- Cloud Hosting: 
  - Deploys the Docker container on a cloud server (or a specified server) for reliable access and scalability.
