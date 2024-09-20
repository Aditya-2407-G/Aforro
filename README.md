
# Aforro

Designed to provides functionalities such as user authentication, product categorization, and a shopping cart. The app integrates with a mock API to simulate backend operations.


## APK Link

You can download the APK from here - 

https://drive.google.com/file/d/1gyq1fqHNdyRWkpdaYyb2J1BEy1GCk8Fa/view?usp=sharing
## Features

- **User Authentication**: Login and logout functionalities using a mock API.
    
    - Use the email from the given dummy API for login : 
        
        - "email": "Sincere@april.biz",
        - "email": "Shanna@melissa.tv",
    

    For now I have only added the email field as the dummy API didn't had passwords , but I can implement complete Authentication with real users 
    
    - Can integrate JWT tokens (access and refresh) if needed for better security.
    - Can implement form validation with Formik and yup, also have worked with Zod validation.


- **Home Screen**: Displays categories, promotional banners, and a search bar.
    
    - Implemented carousel using flatlist for now.  Can be done more elegantly using react-native-snap-carousel.

    - Search bar feature implemented and used debounce for better user experience.

    - Request for current users location to show the current location on top.

- **Add to Cart**: Implemented the add to cart feature so that items that a user selects can be added to a cart.
    
    - Used context to store the state of the cart 
    - Can implement redux store also.
    - Currently not able to implement different cart for different users due to lack of a backend but can be done.

- **Checkout**: I can integrate a Payment gateway using stripe or razorpay. _(Not implemented in this app)_
 

**Cart Page**: Display items that have been added to the cart, along with their details 
(name, image, and quantity).



**Profile Page**: Displayed all the mock users information to the profile tab and implemented logout functionality.

**Secured Routes**: Made secured routes so that only the authenticated user can access particular screens.

- Stored the authenticated users data in the AuthContext so that it can be used in various compoments.






**BONUS TASKS COMPLETED**: 

    - Product Search: users can search for a particular product
    - Implement pull-to-refresh on the home page for better user experience.







## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running the App](#running-the-app)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (install it globally with `npm install -g expo-cli`)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd your-repo-name
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

## Running the App

To start the development server, run:

```bash
npm start
```

This will open a new browser tab with the Expo developer tools. You can scan the QR code with the Expo Go app on your mobile device to see your app in action.

## Development

To make changes to your app, simply edit the files in the `App.js` (or any other component file). The app will automatically reload to reflect your changes.

### Running on a Simulator

If you prefer to run your app in an iOS or Android simulator, you can use:

- For iOS: Press `i`
- For Android: Press `a`

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add your feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Open a pull request.


Feel free to reach out if you have any questions or need assistance!



