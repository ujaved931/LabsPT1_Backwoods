# Backwoods Adventure Tracker

Backwoods is an app for adventurers to track trips. This app is a final team project at [Lambda School](https://lambdaschool.com/).

## 🚀 Quick Start with Yarn

### Development Mode
To run both client and server simultaneously:
```bash
yarn start
```

This will start:
- React client on http://localhost:3000
- Node.js API server on http://localhost:9000

### Individual Services

#### Client (React App)
```bash
cd client
yarn install
yarn start
```
Then open [http://localhost:3000](http://localhost:3000) to see your app

#### Server (Node.js API)
```bash
cd server
yarn install
yarn dev
```
Server will be available at [http://localhost:9000/api](http://localhost:9000/api)

### Build for Production
```bash
yarn build
```

## 🛠 What's Included?

### Frontend (Client)
- **React 18** with modern hooks
- **React Router** for navigation
- **Axios** for API calls
- **React Scripts** for development and building
- Modern ES6+ JavaScript features

### Backend (Server)
- **Express.js** REST API
- **CORS** enabled for cross-origin requests
- **Nodemon** for development hot reloading
- Environment configuration with dotenv

### Development Features
- **Concurrently** runs both client and server together
- **Hot reloading** on both frontend and backend
- **Modern tooling** with updated dependencies
- **Yarn workspaces** for efficient dependency management

## 📝 Available Scripts

### Root Level
- `yarn start` - Run both client and server
- `yarn client` - Run only client
- `yarn server` - Run only server
- `yarn install-client` - Install client dependencies
- `yarn install-server` - Install server dependencies
- `yarn install-all` - Install all dependencies

### Client Scripts
- `yarn start` - Start development server
- `yarn build` - Build for production
- `yarn test` - Run tests

### Server Scripts
- `yarn start` - Start production server
- `yarn dev` - Start development server with nodemon

## 🌟 Features Planned

Based on the original project requirements:
- 📍 Create and track trip waypoints
- 🗺️ Google Maps integration
- 📱 Mobile-friendly design
- 📊 Trip progress tracking
- 💳 Stripe payment integration
- 🔐 User authentication with Firebase
- 🎨 Bootstrap/Reactstrap UI components

## 🔧 Development Setup

1. **Clone the repository**
2. **Install dependencies**: `yarn install-all`
3. **Start development**: `yarn start`
4. **Open browser**: http://localhost:3000

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/               # React components and logic
│   └── package.json       # Client dependencies
├── server/                # Node.js backend
│   ├── src/               # API routes and logic
│   └── package.json       # Server dependencies
├── package.json           # Root package with scripts
└── README.md              # This file
```

## 🐛 Issues

If something does not work, please [file an issue](https://github.com/ujaved931/LabsPT1_Backwoods/issues/new)

## 🎯 User Guide

### User Access
Users are not required to sign in to use the app
Unauthenticated users have limited access to some features

### Create New Trip 
1. Click `Add your first trip` after you sign in OR
2. Go to `Trips` section and click `New Trip`
3. Add your first waypoint and click `Select Location` to save your starting point
4. Let's move!
5. Add new waypoint as you wish

### Track a Trip
1. In `Trips` section, select a trip
2. Get to your starting point and start follow the path
3. When you reach a waypoint, click `I made it`

### Archive and Unarchive
1. Go to `Trips` section and click `Archived Trips`
2. Click `Unarchive` as you wish

### Repeat a Trip
1. Go to your archived trip list
2. Click `Repeat`
3. The app will load all waypoints and you can fill out new date & time

### Pay for Subscription
1. Go to `Billing` section
2. Fill out payment form
3. Select a plan
4. Click `Buy Now`

### Settings
1. Reset your email OR
2. Reset your password
3. Click `Save`

## 📄 License
