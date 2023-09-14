import { useState, useEffect } from 'react';
import { View, TextInput, Button, SectionList, Text, StyleSheet } from 'react-native';
import { multiGetData, groupByDate, transformCategories } from '../utils';
import { ExpenseRow } from '../components/ExpenseRow';

export const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await multiGetData(['expenses', 'categories']);
    const cats = transformCategories(data['categories'] || []);
    const exps = data['expenses'] || [];
    setExpenses(exps);
    setCategories(cats);
    setSearchResults(groupByDate(exps, cats));
  };

  const searchExpense = (text) => {
    let filteredResults;
    if (text == '') {
        filteredResults = expenses;
    } else {
        filteredResults = expenses.filter(e =>
            e.description.toLowerCase().includes(searchText.toLowerCase())
        );
    }

    setSearchText(text);
    setSearchResults(groupByDate(filteredResults, categories));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search expenses..."
        onChangeText={searchExpense}
      />

      <SectionList
        sections={searchResults}
        extraData={searchText}
        renderItem={({ item }) =>
          <ExpenseRow
              emoji={item.emoji}
              text={item.description}
              number={item.amount}
              onPress={() => navigation.jumpTo('MainTab', { screen: 'Edit Expense', params: {expenseKey: item.key }})}

          />
        }
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionText}>{title}</Text>
          </View>
        )}
      />
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
    searchBar: {
        fontSize: 30,
        height: 40,
        width: 300,
        borderColor: '#93827F',
        borderWidth: 1,
        margin: 10,
        padding: 5,
        borderRadius: 10,
    },
    itemText: {
        fontSize: 21,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 2,
    },
    sectionContainer: {
        marginTop: 21,
        marginBottom: 5,
        width: 300,
        backgroundColor: '#92B4A7',
        borderRadius: 5,
        padding: 5,
    },
    sectionText: {
        fontSize: 21,
    }
});