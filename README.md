# Front-end Project

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/Redux-v.1.9-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4.9-green)
![react-router-dom](https://img.shields.io/badge/ReactRouter-v.6.4-orange)

This is a project template for the Front-end project, it is a simple e-commerce website that requires implementation of TypeScript and Redux.

## Stack that come with this project template

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [react-router-dom](https://reactrouter.com/web/guides/quick-start)

## Requirement

1. Use the API endpoints [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/) to create an e-commerce website. Read the documentation and learn how to use the different endpoints.

2. Use React Router to create at least 4 pages (can be more if you want):

   - [x] Home page
   - [ ] Products page - list all products (can be a grid or a list view)
   - [ ] Product detail page
   - [ ] Cart page (cart could be a page or a modal)

3. Create Redux store for following features:

   - [ ] product reducer: get all products, find a single product, sort products by categories, sort products by price. Create, update and delete a product.
   - [ ] cart reducer: add, remove, update, clear cart.
   - [ ] user reducer: login, logout, register (optional - if you want to add user registration)
   - [ ] theme reducer: switch theme (optional - theme could be in Redux store or in context API, recommended to use context API for this)

4. Deploy the application and rewrite README file with the link to the deployed application.

## Bonus

- [ ] Use context API to switch theme
- [ ] Include user registration feature and user profile page
- [ ] Add a search bar to search products by name
- [ ] Add a filter to filter products by price or category
- [ ] Persist cart and user items in local storage
- [ ] Add a loading indicator when fetching data from API
- [ ] Add a 404 page for routes that do not exist
- [ ] Add a pagination to products page
- [ ] Add ..... (you can add more features if you want)

## Submission

- [ ] Fork and clone this repository. **Make a pull request to this repository as soon as you make your first commit** - you don't have to wait until you finish the project.

- [ ] Deploy the application and rewrite README file with the link to the deployed application.

## Instruction to start the project

In the project directory, you can run:

### `npm install`

Install all the dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
