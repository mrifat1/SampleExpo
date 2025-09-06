# SampleExpo

A modern React Native app built with Expo that demonstrates advanced mobile development features including state management, navigation, forms, animations, and push notifications.

## Features

- **API Integration**: Fetches data from JSONPlaceholder API with error handling and refresh functionality
- **State Management**: Zustand for predictable and efficient state management
- **Navigation**: Tab-based navigation with stack navigation support
- **Forms**: React Hook Form with validation and error handling
- **Animations**: Smooth Reanimated animations for enhanced user experience
- **Push Notifications**: Complete Expo notification system implementation
- **Modern UI/UX**: Responsive design with consistent spacing and typography
- **App Store Ready**: Proper metadata, icons, and privacy policy for submission
- **Privacy Policy** - Built-in privacy policy screen

## Tech Stack

- **Framework**: Expo SDK 53
- **Language**: TypeScript
- **State Management**: Zustand
- **Navigation**: React Navigation v7
- **Forms**: React Hook Form
- **Animations**: React Native Reanimated
- **Notifications**: Expo Notifications
- **Build**: EAS Build

## Quick Start

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- EAS CLI (`npm install -g eas-cli`)

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd SampleExpo
   npm install
   ```

2. **Start development server**
   ```bash
   npx expo start
   ```

3. **Run on device/emulator**
   ```bash
   # iOS Simulator
   npx expo start --ios
   
   # Android Emulator
   npx expo start --android
   
   # Web
   npx expo start --web
   ```

## Project Structure

```
SampleExpo/
├── components/          # Reusable UI components
├── constants/           # App constants and theme
├── hooks/              # Custom React hooks
├── navigation/         # Navigation configuration
├── screens/            # App screens
├── stores/             # Zustand stores
├── utils/              # Utility functions
├── assets/             # Images, icons, fonts
└── app.json            # Expo configuration
```

## Key Features Implementation

### State Management (Zustand)
- `stores/usePostStore.ts` - Post data management
- `stores/useNotificationStore.ts` - Notification state

### Navigation
- Stack Navigator for screen transitions
- Tab Navigator for main app sections
- Deep linking support

### Forms
- React Hook Form integration
- Form validation and error handling
- Modern form UI components

### Animations
- React Native Reanimated v3
- Smooth transitions and micro-interactions
- Performance-optimized animations

### Push Notifications
- Expo Notifications setup
- Device registration
- Notification handling and display

## Build & Deployment

### Development Build
```bash
eas build --profile development --platform ios
eas build --profile development --platform android
```

### Production Build
```bash
eas build --profile production --platform all
```

### App Store Submission

1. **Configure app metadata** in `app.json`
2. **Add app icons** in `assets/images/`
3. **Build production version**
   ```bash
   eas build --profile production --platform all
   ```
4. **Submit to stores**
   ```bash
   eas submit --platform ios
   eas submit --platform android
   ```

## Configuration

### App Icons & Splash Screen
- App icon: `assets/images/mainIcon.png`
- Adaptive icon: `assets/images/adaptive-icon.png`
- Splash screen configured in `app.json`

### Push Notifications
- Configured in `app.json` plugins
- Device registration in `utils/registerForPushNotificationsAsync.ts`

### Bundle Identifiers
- iOS: `com.mahmudrifat.sampleexpo`
- Android: `com.mahmudrifat.sampleexpo`

## Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
npm run lint       # Run ESLint
```

## Privacy Policy

The app includes a privacy policy screen accessible from the settings. Ensure to update the privacy policy content before app store submission.

## License

This project is private and proprietary.

## Support

For issues and questions, please refer to the [Expo documentation](https://docs.expo.dev/) or create an issue in the repository.
