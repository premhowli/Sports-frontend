# Sports-frontend
> **Note**: Make sure you have the backend server up and running [Set Up Your Local Backend Server](https://github.com/premhowli/SharpStakes-backend) before proceeding.

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see app is running in iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Xcode.

## Congratulations! :tada:

You've successfully run the app. :partying_face:

### Ai Usage at coding
Took help of copilot using chat gpt 4.1

### Architectural decisions taken
- Structured the frontend using atomic design—every feature gets its own folder with all UI, hooks, and utilities bundled together.- Shared components and helpers go in a dedicated shared folder for consistency and easy reuse.
- Set up a strongly-typed, centralized API client so all network requests are type-safe and easy to maintain.
- Chose Zustand for state management because it’s lightweight and avoids unnecessary re-renders.
 - For data fetching, I load data only when needed, and stop polling as soon as it’s not required.
 - For user-sensitive or frequently updated data, like balance, I added pull-to-refresh so users can always get the latest info.
 - Focused on a polished, mobile-first UI—dropdowns use overlays with click-away to close, and coins animate when balance increases for an engaging user experience.
 - Navigation and layout are fully responsive and follow native platform guidelines.
 - This structure makes the app easy to maintain, extend.



