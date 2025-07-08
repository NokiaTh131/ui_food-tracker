import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {elderStyles} from '../theme/styles';
import {theme} from '../theme/colors';
import {mockChatMessages, mockFoodSuggestions, mockNutritionTips} from '../data/mockData';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<FlatList>(null);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm here to help you with your nutrition journey. How can I assist you today?";
    }
    
    if (lowerMessage.includes('calories') || lowerMessage.includes('calorie')) {
      return "Great question about calories! Based on your profile, your daily goal is 1,800 calories. You've consumed 1,020 calories today, which means you have 780 calories remaining. Would you like some meal suggestions?";
    }
    
    if (lowerMessage.includes('protein')) {
      return "Protein is essential for muscle health, especially as we age. You've had 75g of protein today out of your 90g goal. Great sources include lean meats, fish, eggs, and legumes.";
    }
    
    if (lowerMessage.includes('suggest') || lowerMessage.includes('recommendation')) {
      return `Here are some healthy options for you:\n\n• ${mockFoodSuggestions[0].name} - ${mockFoodSuggestions[0].calories} calories\n• ${mockFoodSuggestions[1].name} - ${mockFoodSuggestions[1].calories} calories\n\nWould you like more specific suggestions?`;
    }
    
    if (lowerMessage.includes('water') || lowerMessage.includes('drink')) {
      return "Staying hydrated is so important! I recommend drinking at least 8 glasses of water daily. You can also count herbal teas and water-rich foods like fruits and vegetables.";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return "I'm here to help! I can assist you with:\n\n• Meal planning and suggestions\n• Nutrition information\n• Calorie tracking advice\n• Healthy eating tips\n• Dietary questions\n\nWhat would you like to know more about?";
    }
    
    return "That's a great question! I'm here to help you maintain a healthy and balanced diet. Based on your profile, I can provide personalized nutrition advice. Is there something specific about your meals or nutrition you'd like to discuss?";
  };

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(inputText.trim());
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    Alert.alert(
      'Voice Input',
      'This feature would allow you to speak your message instead of typing.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Start Recording',
          onPress: () => {
            // Mock voice input
            setInputText("What should I eat for dinner tonight?");
          },
        },
      ],
    );
  };

  const handleReadAloud = (text: string) => {
    Alert.alert(
      'Read Aloud',
      'This would read the message aloud using text-to-speech.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Read', onPress: () => console.log('Reading:', text)},
      ],
    );
  };

  const renderMessage = ({item}: {item: ChatMessage}) => (
    <View style={[
      elderStyles.card,
      {
        backgroundColor: item.isUser ? theme.elderHighlight : theme.elderCardBackground,
        marginLeft: item.isUser ? 40 : 0,
        marginRight: item.isUser ? 0 : 40,
      }
    ]}>
      <View style={elderStyles.row}>
        <View style={{flex: 1}}>
          <Text style={[
            elderStyles.bodyText,
            {
              fontSize: 22,
              lineHeight: 32,
              color: item.isUser ? theme.elderTextMedium : theme.elderTextLarge,
            }
          ]}>
            {item.text}
          </Text>
          <Text style={[
            elderStyles.bodyText,
            {
              fontSize: 16,
              color: theme.textLight,
              marginTop: 10,
            }
          ]}>
            {item.timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
          </Text>
        </View>
        {!item.isUser && (
          <TouchableOpacity 
            onPress={() => handleReadAloud(item.text)}
            style={{marginLeft: 10}}
          >
            <Icon name="volume-up" size={24} color={theme.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={elderStyles.elderSafeArea}>
      <View style={elderStyles.container}>
        <Text style={elderStyles.headerText}>Chat with Claude</Text>
        
        <FlatList
          ref={scrollViewRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={{flex: 1}}
          contentContainerStyle={{paddingBottom: 20}}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
        />

        {isTyping && (
          <View style={elderStyles.card}>
            <Text style={[elderStyles.bodyText, {fontStyle: 'italic', color: theme.textLight}]}>
              Claude is typing...
            </Text>
          </View>
        )}

        {/* Input Area */}
        <View style={elderStyles.card}>
          <View style={elderStyles.row}>
            <TextInput
              style={[elderStyles.input, {flex: 1, marginRight: 10}]}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type your message..."
              placeholderTextColor={theme.textLight}
              multiline
              maxLength={500}
            />
            <TouchableOpacity onPress={handleVoiceInput} style={{marginRight: 10}}>
              <Icon name="mic" size={32} color={theme.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={sendMessage} disabled={inputText.trim() === ''}>
              <Icon 
                name="send" 
                size={32} 
                color={inputText.trim() === '' ? theme.textLight : theme.primary} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={elderStyles.card}>
          <Text style={[elderStyles.bodyText, {marginBottom: 15, fontWeight: 'bold'}]}>
            Quick Questions:
          </Text>
          <View style={elderStyles.row}>
            <TouchableOpacity 
              style={[elderStyles.secondaryButton, {flex: 1, marginRight: 5}]}
              onPress={() => setInputText("What should I eat for dinner?")}
            >
              <Text style={[elderStyles.buttonText, {color: theme.primary, fontSize: 18}]}>
                Dinner Ideas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[elderStyles.secondaryButton, {flex: 1, marginLeft: 5}]}
              onPress={() => setInputText("How many calories do I need?")}
            >
              <Text style={[elderStyles.buttonText, {color: theme.primary, fontSize: 18}]}>
                Calorie Goal
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;