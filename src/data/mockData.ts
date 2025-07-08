export interface MealItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  image?: string;
  timestamp: Date;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  activityLevel: string;
  dietaryRestrictions: string[];
  goals: NutritionGoals;
}

export const mockMeals: MealItem[] = [
  {
    id: '1',
    name: 'Grilled Chicken Salad',
    calories: 320,
    protein: 35,
    carbs: 12,
    fat: 15,
    fiber: 8,
    timestamp: new Date(),
  },
  {
    id: '2',
    name: 'Oatmeal with Berries',
    calories: 280,
    protein: 8,
    carbs: 45,
    fat: 6,
    fiber: 10,
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '3',
    name: 'Salmon with Vegetables',
    calories: 420,
    protein: 32,
    carbs: 18,
    fat: 22,
    fiber: 6,
    timestamp: new Date(Date.now() - 7200000),
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    text: 'Hello! I\'m Claude, your nutrition assistant. How can I help you today?',
    isUser: false,
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: '2',
    text: 'I just ate a chicken salad. Can you tell me about its nutrition?',
    isUser: true,
    timestamp: new Date(Date.now() - 240000),
  },
  {
    id: '3',
    text: 'Great choice! Your chicken salad contains 320 calories, 35g protein, 12g carbs, and 15g fat. It\'s a well-balanced meal with plenty of protein and fiber. Would you like some suggestions for your next meal?',
    isUser: false,
    timestamp: new Date(Date.now() - 180000),
  },
];

export const mockUserProfile: UserProfile = {
  name: 'Mary Johnson',
  age: 68,
  weight: 65,
  height: 160,
  activityLevel: 'Light Activity',
  dietaryRestrictions: ['Low Sodium', 'Heart Healthy'],
  goals: {
    calories: 1800,
    protein: 90,
    carbs: 225,
    fat: 60,
    fiber: 25,
  },
};

export const mockFoodSuggestions = [
  {
    id: '1',
    name: 'Whole Grain Toast',
    calories: 160,
    reason: 'Good source of fiber to complement your meal',
  },
  {
    id: '2',
    name: 'Greek Yogurt',
    calories: 130,
    reason: 'High protein snack for muscle health',
  },
  {
    id: '3',
    name: 'Apple with Almond Butter',
    calories: 200,
    reason: 'Healthy fats and natural sugars for energy',
  },
  {
    id: '4',
    name: 'Vegetable Soup',
    calories: 120,
    reason: 'Low calorie, high nutrition option',
  },
];

export const mockNutritionTips = [
  'Remember to drink plenty of water throughout the day!',
  'Aim for colorful fruits and vegetables in every meal.',
  'Choose lean proteins like fish, chicken, and legumes.',
  'Include healthy fats from nuts, seeds, and olive oil.',
  'Try to eat regularly to maintain steady energy levels.',
];