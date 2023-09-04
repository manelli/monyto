import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AnalyticsScreen, ExpenseScreen, MainScreen, SearchScreen, CategoriesScreen } from './src/app/screens';

const Tab = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();

const MainStackScreen = () => (
    <MainStack.Navigator>
      <MainStack.Screen name="MainStack" component={MainScreen} options={{ title: 'My expenses' }} />
      <MainStack.Screen name="Search" component={SearchScreen} />
      <MainStack.Screen name="Categories" component={CategoriesScreen} />
    </MainStack.Navigator>
)

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
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
        <Tab.Screen name="Analytics" component={AnalyticsScreen} />
        <Tab.Screen name="Expense" component={ExpenseScreen} />
        <Tab.Screen name="MainTab" component={MainStackScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}