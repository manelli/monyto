import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AnalyticsScreen, ExpenseScreen, MainScreen, SearchScreen, CategoriesScreen } from './src/app/screens';
import { storeData } from './src/app/utils';
import { useEffect } from 'react';

const Tab = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();

const MainStackScreen = () => (
    <MainStack.Navigator>
      <MainStack.Screen name="MainStack" component={MainScreen} options={{ title: 'My expenses' }} />
      <MainStack.Screen name="Search" component={SearchScreen} />
      <MainStack.Screen name="Categories" component={CategoriesScreen} />
    </MainStack.Navigator>
)

const defaultCategories = [
  { emoji: '🍽️', name: 'Restaurant' },
  { emoji: '🚗', name: 'Transportation' },
  { emoji: '🛒', name: 'Groceries' },
  { emoji: '🏠', name: 'Housing' },
  { emoji: '🏥', name: 'Healthcare' },
  { emoji: '🎓', name: 'Education' },
  { emoji: '💻', name: 'Technology' },
  { emoji: '🛍️', name: 'Shopping' },
  { emoji: '📚', name: 'Books' },
  { emoji: '✈️', name: 'Travel' },
  { emoji: '🎁', name: 'Gifts' },
  { emoji: '🏋️‍♂️', name: 'Fitness' },
  { emoji: '🌲', name: 'Outdoor' },
  { emoji: '🎥', name: 'Entertainment' },
];

export default function App() {
  useEffect(() => {
    storeDefaultCategories();
  }, []);

  const storeDefaultCategories = async () => {
    await storeData('categories', defaultCategories);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Main'
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#2F2F2F',
          tabBarInactiveTintColor: '#93827F',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconSize;

            if (route.name === 'MainTab') {
              iconName = 'apps'
            } else if (route.name === 'Expense') {
              iconName = 'add-circle'
            } else if (route.name === 'Analytics') {
              iconName = 'bar-chart'
            }

            iconName = focused ? iconName : iconName + '-outline';
            iconSize = focused ? size * 1.5 : size;

            return <Ionicons name={iconName} size={iconSize} color={color} />;
          }
        })}
      >
        <Tab.Screen name="MainTab" component={MainStackScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Expense" component={ExpenseScreen} />
        <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}