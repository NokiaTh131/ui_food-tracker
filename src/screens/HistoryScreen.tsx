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
import {mockMeals, mockUserProfile, MealItem} from '../data/mockData';

const HistoryScreen = () => {
  const [selectedMeal, setSelectedMeal] = useState<MealItem | null>(null);
  const [showMealModal, setShowMealModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleMealPress = (meal: MealItem) => {
    setSelectedMeal(meal);
    setShowMealModal(true);
  };

  const handleDeleteMeal = (mealId: string) => {
    Alert.alert(
      'Delete Meal',
      'Are you sure you want to delete this meal from your history?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Deleted!', 'Meal removed from your history.');
            setShowMealModal(false);
          },
        },
      ],
    );
  };

  const getTotalCalories = () => {
    return mockMeals.reduce((total, meal) => total + meal.calories, 0);
  };

  const getTotalProtein = () => {
    return mockMeals.reduce((total, meal) => total + meal.protein, 0);
  };

  const getWeeklyAverage = () => {
    return Math.round(getTotalCalories() / 7);
  };

  return (
    <SafeAreaView style={elderStyles.elderSafeArea}>
      <ScrollView style={elderStyles.elderScrollView} showsVerticalScrollIndicator={false}>
        <View style={elderStyles.container}>
          <Text style={elderStyles.headerText}>Meal History</Text>
          
          {/* Date Selector */}
          <View style={elderStyles.card}>
            <View style={elderStyles.row}>
              <TouchableOpacity>
                <Icon name="chevron-left" size={32} color={theme.primary} />
              </TouchableOpacity>
              <Text style={[elderStyles.titleText, {flex: 1, textAlign: 'center'}]}>
                {formatDate(selectedDate)}
              </Text>
              <TouchableOpacity>
                <Icon name="chevron-right" size={32} color={theme.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Daily Summary */}
          <View style={elderStyles.card}>
            <Text style={elderStyles.titleText}>Today's Summary</Text>
            <View style={elderStyles.row}>
              <View style={elderStyles.column}>
                <Text style={[elderStyles.bodyText, {fontSize: 28, fontWeight: 'bold', color: theme.primary}]}>
                  {getTotalCalories()}
                </Text>
                <Text style={elderStyles.bodyText}>Total Calories</Text>
              </View>
              <View style={elderStyles.column}>
                <Text style={[elderStyles.bodyText, {fontSize: 28, fontWeight: 'bold', color: theme.primary}]}>
                  {getTotalProtein()}g
                </Text>
                <Text style={elderStyles.bodyText}>Protein</Text>
              </View>
              <View style={elderStyles.column}>
                <Text style={[elderStyles.bodyText, {fontSize: 28, fontWeight: 'bold', color: theme.primary}]}>
                  {mockMeals.length}
                </Text>
                <Text style={elderStyles.bodyText}>Meals</Text>
              </View>
            </View>
          </View>

          {/* Weekly Stats */}
          <View style={elderStyles.card}>
            <Text style={elderStyles.titleText}>Weekly Overview</Text>
            <View style={elderStyles.elderHighlight}>
              <Text style={elderStyles.bodyText}>
                Daily Average: {getWeeklyAverage()} calories
              </Text>
              <Text style={elderStyles.bodyText}>
                Goal Progress: {Math.round((getTotalCalories() / mockUserProfile.goals.calories) * 100)}%
              </Text>
              <Text style={elderStyles.bodyText}>
                Streak: 5 days of logging 🔥
              </Text>
            </View>
          </View>

          {/* Meals List */}
          <View style={elderStyles.card}>
            <Text style={elderStyles.titleText}>Meals Today</Text>
            {mockMeals.map((meal) => (
              <TouchableOpacity 
                key={meal.id} 
                style={elderStyles.elderHighlight}
                onPress={() => handleMealPress(meal)}
              >
                <View style={elderStyles.row}>
                  <View style={{flex: 1}}>
                    <Text style={[elderStyles.bodyText, {fontWeight: 'bold', marginBottom: 5}]}>
                      {meal.name}
                    </Text>
                    <Text style={elderStyles.bodyText}>
                      {meal.calories} calories • {formatTime(meal.timestamp)}
                    </Text>
                    <Text style={[elderStyles.bodyText, {color: theme.textLight}]}>
                      Protein: {meal.protein}g • Carbs: {meal.carbs}g • Fat: {meal.fat}g
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={24} color={theme.primary} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Export Options */}
          <View style={elderStyles.card}>
            <Text style={elderStyles.titleText}>Export & Share</Text>
            <TouchableOpacity 
              style={elderStyles.secondaryButton}
              onPress={() => Alert.alert('Export', 'This would export your meal history to PDF or share with your doctor.')}
            >
              <View style={elderStyles.row}>
                <Icon name="file-download" size={24} color={theme.primary} />
                <Text style={[elderStyles.buttonText, {color: theme.primary, marginLeft: 15}]}>
                  Export Weekly Report
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={elderStyles.secondaryButton}
              onPress={() => Alert.alert('Share', 'This would share your progress with family or healthcare provider.')}
            >
              <View style={elderStyles.row}>
                <Icon name="share" size={24} color={theme.primary} />
                <Text style={[elderStyles.buttonText, {color: theme.primary, marginLeft: 15}]}>
                  Share with Family
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Meal Detail Modal */}
      <Modal
        visible={showMealModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowMealModal(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={[elderStyles.card, {margin: 20, maxWidth: '90%'}]}>
            {selectedMeal && (
              <>
                <Text style={elderStyles.titleText}>{selectedMeal.name}</Text>
                <Text style={[elderStyles.bodyText, {marginBottom: 20}]}>
                  Logged at {formatTime(selectedMeal.timestamp)}
                </Text>
                
                <View style={elderStyles.elderHighlight}>
                  <Text style={elderStyles.bodyText}>
                    <Text style={{fontWeight: 'bold'}}>Calories:</Text> {selectedMeal.calories}
                  </Text>
                  <Text style={elderStyles.bodyText}>
                    <Text style={{fontWeight: 'bold'}}>Protein:</Text> {selectedMeal.protein}g
                  </Text>
                  <Text style={elderStyles.bodyText}>
                    <Text style={{fontWeight: 'bold'}}>Carbohydrates:</Text> {selectedMeal.carbs}g
                  </Text>
                  <Text style={elderStyles.bodyText}>
                    <Text style={{fontWeight: 'bold'}}>Fat:</Text> {selectedMeal.fat}g
                  </Text>
                  <Text style={elderStyles.bodyText}>
                    <Text style={{fontWeight: 'bold'}}>Fiber:</Text> {selectedMeal.fiber}g
                  </Text>
                </View>

                <View style={elderStyles.row}>
                  <TouchableOpacity 
                    style={[elderStyles.secondaryButton, {flex: 1, marginRight: 10}]}
                    onPress={() => setShowMealModal(false)}
                  >
                    <Text style={[elderStyles.buttonText, {color: theme.primary}]}>
                      Close
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[elderStyles.primaryButton, {flex: 1, marginLeft: 10, backgroundColor: theme.error}]}
                    onPress={() => handleDeleteMeal(selectedMeal.id)}
                  >
                    <Text style={elderStyles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HistoryScreen;