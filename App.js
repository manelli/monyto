import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AnalyticsScreen, ExpenseScreen, MainScreen } from './src/app/screens';

const Tab = createBottomTabNavigator();

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

            if (route.name === 'Main') {
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
        <Tab.Screen name="Main" component={MainScreen} options={{ title: 'My expenses' }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}