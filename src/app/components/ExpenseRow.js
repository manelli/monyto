import { Text, View, Pressable } from 'react-native';

export const ExpenseRow = ({ emoji, text, number, onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 24, width: 50}}>{emoji}</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text numberOfLines={1} style={{fontSize: 18, width: 150}}>{text}</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 20}}>{number}</Text>
                </View>
            </View>
        </Pressable>
    );
};
