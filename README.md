# CLAUDE - Nutrition Assistant Mobile App

An elder-friendly mobile nutrition tracking app with AI-powered meal analysis and personalized recommendations.

## Features

- **Elder-Friendly Design**: Large text, clear buttons, and intuitive navigation
- **Photo-based Meal Logging**: Take photos of meals for automatic calorie calculation
- **AI Assistant**: Conversational nutrition guidance with voice support
- **Meal History**: Track daily nutrition and view historical data
- **Profile Management**: Customize goals and dietary preferences
- **Green & White Theme**: Calming colors optimized for elder users

## Project Structure

```
src/
├── screens/           # Main app screens
│   ├── HomeScreen.tsx    # Dashboard with meal logging
│   ├── ChatScreen.tsx    # AI assistant interface
│   ├── HistoryScreen.tsx # Meal history and analytics
│   └── ProfileScreen.tsx # User profile and settings
├── theme/             # UI styling
│   ├── colors.ts         # Color palette
│   └── styles.ts         # Elder-friendly styles
└── data/              # Mock data
    └── mockData.ts       # Sample meals and user data
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. For iOS:
   ```bash
   cd ios && pod install && cd ..
   npm run ios
   ```

3. For Android:
   ```bash
   npm run android
   ```

## Elder-Friendly Features

- **Large Touch Targets**: Minimum 60px height for buttons
- **High Contrast**: Green and white color scheme for readability
- **Simple Navigation**: Clear tab-based navigation
- **Voice Support**: Text-to-speech for AI responses
- **Emergency Features**: Quick access to emergency contacts
- **Family Integration**: Share progress with family members

## Mock Data

The app includes realistic mock data for:
- Sample meals with nutritional information
- AI chat conversations
- User profile with health goals
- Nutrition suggestions and tips

## Technologies Used

- React Native 0.72.6
- TypeScript
- React Navigation
- React Native Vector Icons
- Mock data for offline functionality