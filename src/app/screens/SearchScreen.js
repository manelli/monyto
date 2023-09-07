import { useState, useEffect } from 'react';
import { View, TextInput, Button, SectionList, Text, StyleSheet } from 'react-native';
import { multiGetData } from '../utils';

const groupByDate = (expenses, categories) => {
    const groupedExpenses = {};
    expenses.forEach((e) => {
      const title = new Date(e.date).toDateString()
      e['emoji'] = categories[e.category];
      if (groupedExpenses[title]) {
        groupedExpenses[title].data.push(e);
      } else {
        groupedExpenses[title] = { title, data: [e] };
      }
    });
    return Object.values(groupedExpenses);
};

const transformCategories = (cats) => {
    const descriptionEmoji = {};
    for (const c of cats) {
        descriptionEmoji[c.name] = c.emoji;
    }
    return descriptionEmoji;
};

export const SearchScreen = () => {
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
            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.emoji}</Text>
                <Text style={styles.itemText}>{item.description}</Text>
                <Text style={styles.itemText}>-${item.amount}</Text>
            </View>
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