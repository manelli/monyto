import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import { getData } from '../utils';

export const ExpenseScreen = () => {
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const currentCategories = await getData('categories');
    setCategories(currentCategories);
  };

  const handleButtonPress = (value) => {
    setInput((prevInput) => prevInput + value.toString());
  };

  const backspaceAmount = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const clearData = () => {
    setInput('');
    setDescription('');
  };

  const handleSubmit = () => {
    // You can handle the submission here, e.g., perform calculations.
    // For simplicity, we'll just clear the input.
    clearData();
  };

  return (
    <View style={styles.container}>

        <View style={styles.amountContainer}>
            <Text style={{fontSize: 28}}>{'$'}</Text>
            <Text style={styles.amountText}>{input}</Text>
            <Pressable onPress={backspaceAmount}>
                <Ionicons name='backspace-outline' size={28} color='#2F2F2F' />
            </Pressable>
        </View>

        <TextInput
            style={styles.descriptionTextInput}
            onChangeText={setDescription}
            value={description}
            placeholder="Add description"
        />

        <Picker
          mode='dialog'
          style={{width: 250}}
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemValue)
          }>
            {categories.map((item, index) => (
              <Picker.Item label={`${item.emoji} ${item.name}`} value={item.name} />))}
        </Picker>

        <View style={styles.buttonRow}>
            {[1, 2, 3].map((num) => (
                <Pressable
                    key={num}
                    style={styles.button}
                    onPress={() => handleButtonPress(num)}
                >
                    <Text style={styles.buttonText}>{num}</Text>
                </Pressable>
            ))}
        </View>
        <View style={styles.buttonRow}>
            {[4, 5, 6].map((num) => (
                <Pressable
                    key={num}
                    style={styles.button}
                    onPress={() => handleButtonPress(num)}
                >
                    <Text style={styles.buttonText}>{num}</Text>
                </Pressable>
            ))}
        </View>
        <View style={styles.buttonRow}>
            {[7, 8, 9].map((num) => (
                <Pressable
                    key={num}
                    style={styles.button}
                    onPress={() => handleButtonPress(num)}
                >
                    <Text style={styles.buttonText}>{num}</Text>
                </Pressable>
            ))}
        </View>
        <View style={styles.buttonRow}>
            <Pressable
                style={styles.button}
                onPress={() => handleButtonPress('.')}
            >
                <Text style={styles.buttonText}>.</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => handleButtonPress('0')}
            >
                <Text style={styles.buttonText}>0</Text>
            </Pressable>
            <Pressable
                style={[styles.button, {backgroundColor: '#A2B8B9'}]}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>✓</Text>
            </Pressable>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  amountText: {
    textAlign: 'center',
    fontSize: 56,
    marginRight: 10,
    marginLeft: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECEAE9',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 30,
    color: '#2F2F2F',
  },
  descriptionTextInput: {
    fontSize: 32,
    textAlign: 'center',
    width: 250,
    margin: 12,
    padding: 10,
  },
  categoryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BDC4A7',
    marginBottom: 20,
    padding: 5,
    borderRadius: 5,
  },
  categoryText: {
    fontSize: 20,
    color: '#2F2F2F',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});