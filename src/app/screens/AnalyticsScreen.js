import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { VictoryBar, VictoryLine, VictoryChart, VictoryTheme, VictoryTooltip, VictoryLabel } from 'victory-native';
import { multiGetData } from '../utils';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const AnalyticsScreen = () => {
    const [categories, setCategories] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = async () => {
        const data = await multiGetData(['expenses', 'categories']);
        setExpenses(data['expenses'] || []);
        setCategories(data['categories'] || []);
    };

    const monthlyExpenses = () => {
        let res = [];
        let sum = {};

        expenses.forEach((e) => {
            d = new Date(e.date);
            m = d.toDateString().slice(4, 7);

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

    return (
        <View style={styles.container}>
            <ScrollView>

                <Text style={styles.title}>Monthly expenses</Text>
                <VictoryChart>
                    <VictoryBar
                        data={monthlyExpenses()}
                        x='month'
                        y='expenses'
                        labelComponent={<VictoryTooltip renderInPortal={false}/>}
                        labels={({ datum }) => `$${datum.expenses}`}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                        cornerRadius={{ top: 3 }}
                    />
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
    marginTop: 20,
    padding: 10
  },
  title: {
    fontSize: 32
  }
});