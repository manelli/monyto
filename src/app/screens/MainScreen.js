import { Text, View, SectionList, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { multiGetData, groupByDate, transformCategories } from '../utils';

export const MainScreen = ({ navigation }) => {
    const [period, setPeriod] = useState('all');
    const [amount, setAmount] = useState('0');
    const [expenses, setExpenses] = useState([]);
    const [allExpenses, setAllExpenses] = useState([]);
    const [categories, setCategories] = useState({});

    useEffect(() => {
        recalculateData();
    }, [period]);

    useFocusEffect(
        useCallback(() => {
            fetchData()
        }, [])
    );

    const fetchData = async () => {
        const data = await multiGetData(['expenses', 'categories']);
        const cats = transformCategories(data['categories'] || []);
        const exps = groupByDate(data['expenses'] || [], cats);
        for(i in exps)
            exps[i]['date'] = new Date(exps[i]['title'])
        exps.sort((a, b) => b.date - a.date)
        const amnt = calculateAmount(exps);

        setAmount(amnt);
        setExpenses(exps);
        setAllExpenses(exps);
        setCategories(cats);
    };

    const recalculateData = () => {
        const newExpenses = filterExpenses(period, allExpenses);
        const newAmount = calculateAmount(newExpenses);

        setAmount(newAmount);
        setExpenses(newExpenses);
    };

    const filterExpenses = (p, ae) => {
        const today = new Date();
        let filtered;

        if (p == 'today') {
            filtered = ae.filter((e) => e.title == today.toDateString())
        } else if (p == 'week') {
            const startWeek = new Date(today.setDate(today.getDate() - today.getDay()));
            const endofWeek = new Date(today.setDate(today.getDate() - today.getDay()+6));
            filtered = ae.filter((e) => e.date >= startWeek && e.date <= endofWeek)
        } else if (p == 'month') {
            filtered = ae.filter((e) =>
                (e.date.getMonth() == today.getMonth()) && (e.date.getFullYear() == today.getFullYear())
            )
        } else if (p == 'year') {
            filtered = ae.filter((e) => e.date.getFullYear() == today.getFullYear())
        } else {
            filtered = ae;
        }

        return filtered;
    };

    const calculateAmount = (exps) => {
        let sum = 0;
        exps.forEach((exp) => {
            exp.data.forEach((e) => {
                sum += e.amount;
            });
        });
        return sum.toFixed(2);
    };

    return (
        <View style={styles.container}>
            <View style={styles.linksContainer}>
                <View style={{marginLeft: 50}}>
                    <Pressable onPress={() => navigation.navigate('Search')}>
                        <Ionicons name='search' size={28} color='#2F2F2F' />
                    </Pressable>
                </View>
                <View style={{marginRight: 50}}>
                <Pressable onPress={() => navigation.navigate('Categories')}>
                        <Ionicons name='settings' size={28} color='#2F2F2F' />
                    </Pressable>
                </View>
            </View>

            <View style={styles.periodContainer}>
                <Picker
                    mode='dialog'
                    style={{width: 250}}
                    selectedValue={period}
                    onValueChange={(itemValue, itemIndex) => setPeriod(itemValue)}>
                        <Picker.Item label='ALL TIME' value='all' />
                        <Picker.Item label='TODAY' value='today' />
                        <Picker.Item label='THIS WEEK' value='week' />
                        <Picker.Item label='THIS MONTH' value='month' />
                        <Picker.Item label='THIS YEAR' value='year' />


                </Picker>
            </View>

            <View style={styles.amountContainer}>
                <Text style={styles.amountText}>{amount}</Text>
            </View>

            <View style={styles.listContainer}>
                <SectionList
                    sections={expenses}
                    extraData={period}
                    renderItem={({ item }) =>
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>{item.emoji}</Text>
                            <Text style={styles.itemText}>{item.description}</Text>
                            <Text style={styles.itemText}>-${item.amount}</Text>
                        </View>
                    }
                    renderSectionHeader={({section: {title}}) => (
                        <View style={styles.sectionContainer}>
                            <Text style={styles.itemText}>{title}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    linksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    periodContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    amountContainer: {
        marginTop: -20,
        alignItems: 'center',
    },
    amountText: {
        fontSize: 96
    },
    listContainer: {
        alignItems: 'center',
        fontSize: 21
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
    itemText: {
        fontSize: 20,
    },
});
