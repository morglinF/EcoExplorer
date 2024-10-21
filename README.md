
# EcoExplorer App

## Project Overview

The **EcoExplorer App** allows users to explore a list of wildlife species and rate them based on their preferences (like or dislike). Users can interact with the app by viewing details of different wildlife, rating them, and sorting the list based on ratings. Ratings are stored in the browser’s cache using `localStorage`, ensuring that the ratings persist across sessions. The app is built using **React 18**, styled with **Tailwind CSS**, and tested with **Jest**.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Wildlife Exploration**: Browse a list of wildlife species fetched from an external API.
- **Like/Dislike Ratings**: Users can like or dislike each species, and their ratings are saved in the browser cache.
- **Sorting**: Sort wildlife based on user ratings (most liked or most disliked).
- **Cache Persistence**: User ratings are stored in `localStorage` for persistence across sessions.
- **Responsive UI**: Designed with Tailwind CSS for responsiveness on different devices.
- **Unit Testing**: Tests written using Jest to ensure application stability.

## Technologies Used

- **Frontend**: 
  - [React 18](https://reactjs.org/) for building the user interface.
  - [Tailwind CSS](https://tailwindcss.com/) for styling and responsive design.
  - [Wildlife API](#) for fetching wildlife data.
  - [Jest](https://jestjs.io/) for unit testing.
  
- **Backend**:
  - This app relies on a public wildlife API, but there is no dedicated back-end server.
  
- **Data Storage**: 
  - **Browser Cache**: `localStorage` is used to store rating data.

## Project Setup

### Prerequisites

Ensure that you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Git**

### Installation

1. Clone the repository:
    \`\`\`bash
    git clone https://github.com/morglinF/EcoExplorer.git
    \`\`\`

2. Navigate to the project directory:
    \`\`\`bash
    cd eco-explorer
    \`\`\`

3. Install dependencies:
    \`\`\`bash
    npm install
    \`\`\`

4. Install Tailwind CSS:
    \`\`\`bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init
    \`\`\`

5. Configure Tailwind CSS by updating the \`tailwind.config.js\` file:
    \`\`\`javascript
    module.exports = {
      content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    \`\`\`

6. Add Tailwind CSS to your \`src/index.css\` file:
    \`\`\`css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    \`\`\`

7. Start the development server:
    \`\`\`bash
    npm start
    \`\`\`

This will launch the app at \`http://localhost:3000\`.

## Environment Variables

To securely manage your API key, create a \`.env\` file in the root of your project. The API key should be stored as an environment variable.


- **Start the Development Server**:
    \`\`\`bash
    npm start
    \`\`\`

- **Run Tests**:
    \`\`\`bash
    npm test
    \`\`\`

- **Build for Production**:
    \`\`\`bash
    npm run build
    \`\`\`