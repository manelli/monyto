import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { VictoryBar, VictoryLine, VictoryChart, VictoryTooltip, VictoryPie, VictoryAxis } from 'victory-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { multiGetData } from '../utils';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const AnalyticsScreen = () => {
    const [categories, setCategories] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = async () => {
        const data = await multiGetData(['expenses', 'categories']);
        const exps = data['expenses'] || [];
        const cats = (data['categories'] || []).reduce(
            (obj, item) => Object.assign(obj, { [item.name]: item.emoji }), {});

        let years = [];
        [...new Set(exps.map((e) => (new Date(e.date)).getFullYear()))].sort().forEach((y) => {
            years.push({label: y, value: y});
        });

        setItems(years);
        setValue((new Date()).getFullYear());
        setExpenses(exps);
        setCategories(cats);
    };

    const monthlyExpenses = () => {
        let res = [];
        let sum = {};

        expenses.forEach((e) => {
            d = new Date(e.date);
            m = d.toDateString().slice(4, 7);

            if (d.getFullYear() !== value)
                return;

            if (sum[m])
                sum[m] = sum[m] + e.amount;
            else
                sum[m] = e.amount;
        });

        months.forEach((m) => {
            res.push({ month: m, expenses: sum[m] || 0 });
        });

        return res;
    };

    const yearlyExpensesByCategory = () => {
        let sum = {};
        let res = [];
        expenses.forEach((e) => {
            d = new Date(e.date);

            if (d.getFullYear() !== value)
                return;

            if (sum[e.category])
                sum[e.category] = sum[e.category] + 1;
            else
                sum[e.category] = 1;
        });

        Object.entries(sum).forEach((e) => {
            const [cat, count] = e;
            res.push({x: cat, y: count})
        });

        return res;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder='Select a year'
                />
            </View>

            <ScrollView>

                <Text style={styles.title}>Monthly expenses</Text>
                <VictoryChart>
                    <VictoryBar
                        data={monthlyExpenses()}
                        x='month'
                        y='expenses'
                        labelComponent={<VictoryTooltip renderInPortal={false}/>}
                        labels={({ datum }) => `$${datum.expenses}`}
                        cornerRadius={{ top: 3 }}
                    />
                </VictoryChart>

                <Text style={styles.title}>Yearly expenses by category</Text>
                <VictoryChart height={370}>
                    <VictoryPie data={yearlyExpensesByCategory()}/>
                      <VictoryAxis style={{ axis: {stroke: 'transparent'}, ticks: {stroke: 'transparent'}, tickLabels: { fill: 'transparent'} }} />
                </VictoryChart>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  title: {
    fontSize: 32
  },
  header: {
    flexDirection: 'row',
    width: 250,
    marginTop: 10,
    marginBottom: 20,
  },
});