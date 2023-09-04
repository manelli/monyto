import { View, Text, Button } from 'react-native';

export const MainScreen = ({ navigation }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Main screen</Text>
        <Button
            title="Go to Search"
            onPress={() => navigation.navigate('Search')}
        />
    </View>
)