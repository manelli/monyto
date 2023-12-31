import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TextInput, Button, Pressable, StyleSheet, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { multiGetData, randKey, storeData } from '../utils';

export const EditExpenseScreen = ({navigation, route}) => {
  const [expenseKey, setExpenseKey] = useState(route.params.expenseKey);
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [date, setDate] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => {
    fetchCategoriesAndExpenses();
  }, []);

  useFocusEffect(
      useCallback(() => {
        fetchCategoriesAndExpenses()
      }, [])
  );

  const fetchCategoriesAndExpenses = async () => {
    const data = await multiGetData(['expenses', 'categories']);
    const exps = data['expenses'] || [];
    const cats = data['categories'] || [];
    const expense = exps.find((e) => e.key == expenseKey);

    setInput(expense.amount.toString());
    setDescription(expense.description);
    setSelectedCategory(expense.category);
    setDate(new Date(expense.date));
    setExpenses(exps);
    setCategories(cats);
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

  const handleSubmit = async () => {
    const editedExpense = {
      key: expenseKey,
      category: selectedCategory,
      amount: parseFloat(input),
      description: description,
      date: date,
    };

    if (!editedExpense.category || !(editedExpense.amount > 0) || !editedExpense.description) {
      Alert.alert('Please complete all fields')
      return;
    };

    expenses.forEach((e, i) => { if (e.key == expenseKey) expenses[i] = editedExpense; });
    await storeData('expenses', expenses);

    clearData();

    navigation.jumpTo('MainTab', { screen: 'MainStack'});

    Alert.alert('Expense updated');
  };

  const handleDelete = async () => {
    updatedExps = expenses.filter(e => e.key !== expenseKey);
    setExpenses(updatedExps);
    await storeData('expenses', updatedExps);

    clearData();

    navigation.jumpTo('MainTab', { screen: 'MainStack'});

    Alert.alert('Expense deleted');
  };

  const Calendar = () => {
    if (Platform.OS == 'android') {
      if (!calendarOpen) {
        return <Button color="#2F2F2F" title={date.toDateString()} onPress={() => setCalendarOpen(true)} />
      } else {
        return <DateTimePicker value={date} onChange={(e, d) => {
          setCalendarOpen(false)
          setDate(d)
        }} />
      }
    } else {
      return <DateTimePicker value={date} onChange={(e, d) => setDate(d)} />
    }
  };

  return (
    <View style={styles.container}>

      <View style={{marginBottom: 10}}>
        <Pressable onPress={handleDelete}>
          <Ionicons name='trash' size={28} color='#2F2F2F' />
        </Pressable>
      </View>

        <Calendar />

        <View style={styles.amountContainer}>
            <Text style={{fontSize: 28}}>{'$'}</Text>
            <Text style={styles.amountText}>{input} </Text>
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
              <Picker.Item key={index} label={`${item.emoji} ${item.name}`} value={item.name} />))}
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
    marginTop: 20,
  },
});