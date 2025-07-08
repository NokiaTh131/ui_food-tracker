import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {elderStyles} from '../theme/styles';
import {theme} from '../theme/colors';
import {mockMeals, mockNutritionTips, mockUserProfile} from '../data/mockData';

const HomeScreen = () => {
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const [dailyCalories, setDailyCalories] = useState(1020);
  const [calorieGoal] = useState(mockUserProfile.goals.calories);

  const handleTakePhoto = () => {
    Alert.alert(
      'Take Photo',
      'This would open the camera to take a photo of your meal for calorie analysis.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Camera',
          onPress: () => {
            // Mock adding a meal
            setDailyCalories(prev => prev + 320);
            Alert.alert('Success!', 'Meal logged successfully!\n\nGrilled Chicken Salad\n320 calories\n35g protein');
          },
        },
      ],
    );
  };

  const handleScanLabel = () => {
    Alert.alert(
      'Scan Nutrition Label',
      'This would open the camera to scan a nutrition label.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Scan',
          onPress: () => {
            setDailyCalories(prev => prev + 150);
            Alert.alert('Success!', 'Nutrition label scanned!\n\nApple Juice\n150 calories');
          },
        },
      ],
    );
  };

  const handleManualEntry = () => {
    Alert.alert(
      'Manual Entry',
      'This would open a form to manually enter meal information.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Enter',
          onPress: () => {
            setDailyCalories(prev => prev + 280);
            Alert.alert('Success!', 'Meal entered manually!\n\nOatmeal with Berries\n280 calories');
          },
        },
      ],
    );
  };

  const progressPercentage = Math.min((dailyCalories / calorieGoal) * 100, 100);

  return (
    <SafeAreaView style={elderStyles.elderSafeArea}>
      <ScrollView style={elderStyles.elderScrollView} showsVerticalScrollIndicator={false}>
        <View style={elderStyles.container}>
          <Text style={elderStyles.headerText}>Welcome Back, {mockUserProfile.name}!</Text>
          
          {/* Daily Progress Card */}
          <View style={elderStyles.card}>
            <Text style={elderStyles.titleText}>Today's Progress</Text>
            <View style={elderStyles.row}>
              <View style={elderStyles.column}>
                <Text style={[elderStyles.bodyText, {fontSize: 32, fontWeight: 'bold', color: theme.primary}]}>
                  {dailyCalories}
                </Text>
                <Text style={elderStyles.bodyText}>calories eaten</Text>
              </View>
              <View style={elderStyles.column}>
                <Text style={[elderStyles.bodyText, {fontSize: 32, fontWeight: 'bold', color: theme.textSecondary}]}>
                  {calorieGoal}
                </Text>
                <Text style={elderStyles.bodyText}>daily goal</Text>
              </View>
            </View>
            
            {/* Progress Bar */}
            <View style={{
              height: 20,
              backgroundColor: theme.elderBorder,
              borderRadius: 10,
              marginTop: 15,
              overflow: 'hidden',
            }}>
              <View style={{
                height: '100%',
                width: `${progressPercentage}%`,
                backgroundColor: theme.primary,
                borderRadius: 10,
              }} />
            </View>
            <Text style={[elderStyles.bodyText, {textAlign: 'center', marginTop: 10}]}>
              {Math.round(progressPercentage)}% of daily goal
            </Text>
          </View>

          {/* Quick Actions */}
          <View style={elderStyles.card}>
            <Text style={elderStyles.titleText}>Log Your Meal</Text>
            
            <TouchableOpacity style={elderStyles.primaryButton} onPress={handleTakePhoto}>
              <View style={elderStyles.row}>
                <Icon name="camera-alt" size={28} color={theme.elderButtonText} />
                <Text style={[elderStyles.buttonText, {marginLeft: 15}]}>
                  Take Photo of Meal
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={elderStyles.secondaryButton} onPress={handleScanLabel}>
              <View style={elderStyles.row}>
                <Icon name="qr-code-scanner" size={28} color={theme.primary} />
                <Text style={[elderStyles.buttonText, {color: theme.primary, marginLeft: 15}]}>
                  Scan Nutrition Label
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={elderStyles.secondaryButton} onPress={handleManualEntry}>
              <View style={elderStyles.row}>
                <Icon name="edit" size={28} color={theme.primary} />
                <Text style={[elderStyles.buttonText, {color: theme.primary, marginLeft: 15}]}>
                  Enter Manually
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Recent Meals */}
          <View style={elderStyles.card}>
            <Text style={elderStyles.titleText}>Recent Meals</Text>
            {mockMeals.slice(0, 3).map((meal) => (
              <View key={meal.id} style={elderStyles.elderHighlight}>
                <View style={elderStyles.row}>
                  <View style={{flex: 1}}>
                    <Text style={[elderStyles.bodyText, {fontWeight: 'bold', marginBottom: 5}]}>
                      {meal.name}
                    </Text>
                    <Text style={elderStyles.bodyText}>
                      {meal.calories} calories • {meal.protein}g protein
                    </Text>
                  </View>
                  <Icon name="restaurant" size={24} color={theme.primary} />
                </View>
              </View>
            ))}
          </View>

          {/* Daily Tip */}
          <View style={elderStyles.card}>
            <Text style={elderStyles.titleText}>💡 Daily Tip</Text>
            <Text style={elderStyles.bodyText}>
              {mockNutritionTips[0]}
            </Text>
          </View>

          {/* Quick Stats Button */}
          <TouchableOpacity 
            style={elderStyles.primaryButton} 
            onPress={() => setShowNutritionModal(true)}
          >
            <View style={elderStyles.row}>
              <Icon name="analytics" size={28} color={theme.elderButtonText} />
              <Text style={[elderStyles.buttonText, {marginLeft: 15}]}>
                View Nutrition Details
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Nutrition Modal */}
      <Modal
        visible={showNutritionModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowNutritionModal(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={[elderStyles.card, {margin: 20, maxHeight: '80%'}]}>
            <Text style={elderStyles.titleText}>Today's Nutrition</Text>
            
            <View style={elderStyles.elderHighlight}>
              <Text style={elderStyles.bodyText}>Calories: {dailyCalories}/{calorieGoal}</Text>
              <Text style={elderStyles.bodyText}>Protein: 75/{mockUserProfile.goals.protein}g</Text>
              <Text style={elderStyles.bodyText}>Carbs: 85/{mockUserProfile.goals.carbs}g</Text>
              <Text style={elderStyles.bodyText}>Fat: 43/{mockUserProfile.goals.fat}g</Text>
              <Text style={elderStyles.bodyText}>Fiber: 24/{mockUserProfile.goals.fiber}g</Text>
            </View>

            <TouchableOpacity 
              style={elderStyles.primaryButton} 
              onPress={() => setShowNutritionModal(false)}
            >
              <Text style={elderStyles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;