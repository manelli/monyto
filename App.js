import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AnalyticsScreen, ExpenseScreen, MainScreen } from './src/app/screens';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Analytics" component={AnalyticsScreen} />
        <Tab.Screen name="Expense" component={ExpenseScreen} />
        <Tab.Screen name="Main" component={MainScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}