import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Switch,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {elderStyles} from '../theme/styles';
import {theme} from '../theme/colors';
import {mockUserProfile} from '../data/mockData';

const ProfileScreen = () => {
  const [profile, setProfile] = useState(mockUserProfile);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingField, setEditingField] = useState<string>('');
  const [editValue, setEditValue] = useState<string>('');

  const handleEditField = (field: string, currentValue: string | number) => {
    setEditingField(field);
    setEditValue(currentValue.toString());
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editingField === 'name') {
      setProfile(prev => ({...prev, name: editValue}));
    } else if (editingField === 'age') {
      setProfile(prev => ({...prev, age: parseInt(editValue) || prev.age}));
    } else if (editingField === 'weight') {
      setProfile(prev => ({...prev, weight: parseInt(editValue) || prev.weight}));
    } else if (editingField === 'height') {
      setProfile(prev => ({...prev, height: parseInt(editValue) || prev.height}));
    }
    setShowEditModal(false);
    Alert.alert('Success!', 'Profile updated successfully.');
  };

  const handleUpgradeToPremium = () => {
    Alert.alert(
      'Upgrade to Premium',
      'Get access to:\n• Advanced AI nutrition analysis\n• Personal nutritionist consultations\n• Family meal planning\n• Detailed health insights\n\nStarting at $9.99/month',
      [
        {text: 'Maybe Later', style: 'cancel'},
        {text: 'Upgrade Now', onPress: () => Alert.alert('Thank you!', 'Premium features activated!')},
      ],
    );
  };

  const handleEmergencyContact = () => {
    Alert.alert(
      'Emergency Contact',
      'This feature would allow you to set up emergency contacts and medical information for quick access.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Set Up', onPress: () => Alert.alert('Set Up', 'Emergency contacts configured!')},
      ],
    );
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'This would export all your nutrition data for your records or to share with healthcare providers.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Export', onPress: () => Alert.alert('Exported!', 'Data exported successfully!')},
      ],
    );
  };

  const getBMI = () => {
    const heightInMeters = profile.height / 100;
    const bmi = profile.weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const getBMICategory = () => {
    const bmi = parseFloat(getBMI());
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  return (
    <SafeAreaView style={elderStyles.elderSafeArea}>
      <ScrollView style={elderStyles.elderScrollView} showsVerticalScrollIndicator={false}>
        <View style={elderStyles.container}>
          <Text style={elderStyles.headerText}>Profile</Text>
          
          {/* Profile Info */}
          <View style={elderStyles.card}>
            <View style={elderStyles.row}>
              <View style={elderStyles.column}>
                <Icon name="account-circle" size={60} color={theme.primary} />
              </View>
              <View style={{flex: 1, marginLeft: 20}}>
                <Text style={[elderStyles.titleText, {marginBottom: 5}]}>
                  {profile.name}
                </Text>
                <Text style={elderStyles.bodyText}>
                  {profile.age} years old • {profile.activityLevel}
                </Text>
                <Text style={elderStyles.bodyText}>
                  {profile.height}cm • {profile.weight}kg
                </Text>
              </View>
            </View>
          </View>

          {/* Health Stats */}
          <View style={elderStyles.card}>
            <Text style={elderStyles.titleText}>Health Information</Text>
            
            <TouchableOpacity 
              style={elderStyles.elderHighlight}
              onPress={() => handleEditField('weight', profile.weight)}
            >
              <View style={elderStyles.row}>
                <View style={{flex: 1}}>
                  <Text style={[elderStyles.bodyText, {fontWeight: 'bold'}]}>Weight</Text>
                  <Text style={elderStyles.bodyText}>{profile.weight} kg</Text>
                </View>
                <Icon name="edit" size={20} color={theme.primary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={elderStyles.elderHighlight}
              onPress={() => handleEditField('height', profile.height)}
            >
              <View style={elderStyles.row}>
                <View style={{flex: 1}}>
                  <Text style={[elderStyles.bodyText, {fontWeight: 'bold'}]}>Height</Text>
                  <Text style={elderStyles.bodyText}>{profile.height} cm</Text>
                </View>
                <Icon name="edit" size={20} color={theme.primary} />
              </View>
            </TouchableOpacity>

            <View style={elderStyles.elderHighlight}>
              <Text style={[elderStyles.bodyText, {fontWeight: 'bold'}]}>BMI</Text>
              <Text style={elderStyles.bodyText}>
                {getBMI()} ({getBMICategory()})
              </Text>
            </View>
          </View>

          {/* Dietary Preferences */}
          <View style={elderStyles.card}>
            <Text style={elderStyles.titleText}>Dietary Preferences</Text>
            {profile.dietaryRestrictions.map((restriction, index) => (
              <View key={index} style={elderStyles.elderHighlight}>
                <Text style={elderStyles.bodyText}>• {restriction}</Text>
              </View>
            ))}
            <TouchableOpacity 
              style={elderStyles.secondaryButton}
              onPress={() => Alert.alert('Edit Preferences', 'This would allow you to modify your dietary restrictions and preferences.')}
            >
              <Text style={[elderStyles.buttonText, {color: theme.primary}]}>
                Edit Preferences
              </Text>
            </TouchableOpacity>
          </View>

          {/* Daily Goals */}
          <View style={elderStyles.card}>
            <Text style={elderStyles.titleText}>Daily Nutrition Goals</Text>
            <View style={elderStyles.elderHighlight}>
              <Text style={elderStyles.bodyText}>Calories: {profile.goals.calories}</Text>
              <Text style={elderStyles.bodyText}>Protein: {profile.goals.protein}g</Text>
              <Text style={elderStyles.bodyText}>Carbs: {profile.goals.carbs}g</Text>
              <Text style={elderStyles.bodyText}>Fat: {profile.goals.fat}g</Text>
              <Text style={elderStyles.bodyText}>Fiber: {profile.goals.fiber}g</Text>
            </View>
          </View>

          {/* Settings */}
          <View style={elderStyles.card}>
            <Text style={elderStyles.titleText}>Settings</Text>
            
            <View style={elderStyles.elderHighlight}>
              <View style={elderStyles.row}>
                <View style={{flex: 1}}>
                  <Text style={[elderStyles.bodyText, {fontWeight: 'bold'}]}>Meal Reminders</Text>
                  <Text style={elderStyles.bodyText}>Get notified about meal times</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{false: theme.border, true: theme.primaryLight}}
                  thumbColor={notificationsEnabled ? theme.primary : theme.textLight}
                />
              </View>
            </View>

            <View style={elderStyles.elderHighlight}>
              <View style={elderStyles.row}>
                <View style={{flex: 1}}>
                  <Text style={[elderStyles.bodyText, {fontWeight: 'bold'}]}>Voice Assistant</Text>
                  <Text style={elderStyles.bodyText}>Enable voice responses</Text>
                </View>
                <Switch
                  value={voiceEnabled}
                  onValueChange={setVoiceEnabled}
                  trackColor={{false: theme.border, true: theme.primaryLight}}
                  thumbColor={voiceEnabled ? theme.primary : theme.textLight}
                />
              </View>
            </View>
          </View>

          {/* Premium Features */}
          <View style={elderStyles.card}>
            <Text style={elderStyles.titleText}>Premium Features</Text>
            <TouchableOpacity 
              style={elderStyles.primaryButton}
              onPress={handleUpgradeToPremium}
            >
              <View style={elderStyles.row}>
                <Icon name="stars" size={28} color={theme.elderButtonText} />
                <Text style={[elderStyles.buttonText, {marginLeft: 15}]}>
                  Upgrade to Premium
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Emergency & Support */}
          <View style={elderStyles.card}>
            <Text style={elderStyles.titleText}>Emergency & Support</Text>
            
            <TouchableOpacity 
              style={elderStyles.secondaryButton}
              onPress={handleEmergencyContact}
            >
              <View style={elderStyles.row}>
                <Icon name="emergency" size={24} color={theme.primary} />
                <Text style={[elderStyles.buttonText, {color: theme.primary, marginLeft: 15}]}>
                  Emergency Contacts
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={elderStyles.secondaryButton}
              onPress={handleExportData}
            >
              <View style={elderStyles.row}>
                <Icon name="file-download" size={24} color={theme.primary} />
                <Text style={[elderStyles.buttonText, {color: theme.primary, marginLeft: 15}]}>
                  Export Health Data
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={elderStyles.secondaryButton}
              onPress={() => Alert.alert('Support', 'Contact our support team for help with the app.')}
            >
              <View style={elderStyles.row}>
                <Icon name="help" size={24} color={theme.primary} />
                <Text style={[elderStyles.buttonText, {color: theme.primary, marginLeft: 15}]}>
                  Get Help
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={[elderStyles.card, {margin: 20, minWidth: '80%'}]}>
            <Text style={elderStyles.titleText}>Edit {editingField}</Text>
            
            <TextInput
              style={elderStyles.input}
              value={editValue}
              onChangeText={setEditValue}
              placeholder={`Enter ${editingField}`}
              placeholderTextColor={theme.textLight}
              keyboardType={editingField === 'name' ? 'default' : 'numeric'}
            />

            <View style={elderStyles.row}>
              <TouchableOpacity 
                style={[elderStyles.secondaryButton, {flex: 1, marginRight: 10}]}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={[elderStyles.buttonText, {color: theme.primary}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[elderStyles.primaryButton, {flex: 1, marginLeft: 10}]}
                onPress={handleSaveEdit}
              >
                <Text style={elderStyles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;