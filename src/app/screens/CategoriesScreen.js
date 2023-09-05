import { useState, useEffect } from 'react';
import { View, Text, FlatList, Modal, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, storeData } from '../utils';

const defaultCategories = [
    { emoji: '🍽️', name: 'Restaurant' },
    { emoji: '🚗', name: 'Transportation' },
    { emoji: '🛒', name: 'Groceries' },
    { emoji: '🏠', name: 'Housing' },
    { emoji: '🏥', name: 'Healthcare' },
    { emoji: '🎓', name: 'Education' },
    { emoji: '💻', name: 'Technology' },
    { emoji: '🛍️', name: 'Shopping' },
    { emoji: '📚', name: 'Books' },
    { emoji: '✈️', name: 'Travel' },
    { emoji: '🎁', name: 'Gifts' },
    { emoji: '🏋️‍♂️', name: 'Fitness' },
    { emoji: '🌲', name: 'Outdoor' },
    { emoji: '🎥', name: 'Entertainment' },
];

const CategoryView = ({item}) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', height: 44, padding: 10 }}>
        <Text style={{ fontSize: 24 }}>{item.emoji}</Text>
        <Text style={{ fontSize: 18, marginLeft: 10 }}>{item.name}</Text>
    </View>
)

const SeparatorView = () => (<View style={{ height: 0.5, width: '100%', backgroundColor: '#bcbcbc' }} />)

export const CategoriesScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryEmoji, setNewCategoryEmoji] = useState('');

    useEffect(() => {
        fetchCategories();
      }, []);

    const fetchCategories = async () => {
        const currentCategories = await getData('categories');
        setCategories(currentCategories || defaultCategories);
    };

    const addCategory = async () => {
        setModalVisible(!modalVisible);
        let currentCategories = await getData('categories') || defaultCategories;
        currentCategories.push({emoji: newCategoryEmoji, name: newCategoryName});
        await storeData('categories', currentCategories);
        setCategories(currentCategories);
    };

    return (
        <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 10, marginTop: 20}}>
            <View >

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(!modalVisible)}>
                        <View>
                            <View style={{
                                margin: 20,
                                backgroundColor: 'white',
                                borderRadius: 20,
                                padding: 35,
                                alignItems: 'center',
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5,
                            }}>
                                <TextInput
                                    style={{padding: 10, fontSize: 21}}
                                    placeholder='Category name'
                                    onChangeText={cn => setNewCategoryName(cn)}
                                />
                                <TextInput
                                    style={{padding: 10, fontSize: 21}}
                                    placeholder='Category emoji'
                                    onChangeText={ce => setNewCategoryEmoji(ce)}
                                    maxLength={2}
                                />

                                <Button
                                    title="Add"
                                    color="black"
                                    onPress={addCategory}>
                                </Button>
                            </View>
                    </View>
                </Modal>

                <Button
                    title="Add category"
                    color="black"
                    onPress={() => setModalVisible(true)}>
                </Button>
            </View>

            <SeparatorView/>

            <FlatList
                data={categories}
                ItemSeparatorComponent={SeparatorView}
                renderItem={CategoryView}
                keyExtractor={(category) => category.name}
            />
        </View>
    )
};