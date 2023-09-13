import { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Modal, Button, TextInput, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getData, storeData } from '../utils';

const CategoryView = ({item}) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', height: 44, padding: 10 }}>
        <Text style={{ fontSize: 24 }}>{item.emoji}</Text>
        <Text style={{ fontSize: 18, marginLeft: 10 }}>{item.name}</Text>
    </View>
)

const SeparatorView = () => (<View style={{ height: 0.5, width: '100%', backgroundColor: '#BDC4A7' }} />)

export const CategoriesScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryEmoji, setNewCategoryEmoji] = useState('');

    useEffect(() => {
        fetchCategories();
    }, [newCategoryName, newCategoryEmoji]);

    useFocusEffect(
        useCallback(() => {
            fetchCategories()
        }, [])
    );

    const fetchCategories = async () => {
        const currentCategories = await getData('categories');
        setCategories(currentCategories);
    };

    const addCategory = async () => {
        setModalVisible(!modalVisible);

        if (newCategoryName == '' || newCategoryEmoji == '') {
            setNewCategoryName('');
            setNewCategoryEmoji('');
            Alert.alert('Category name and emoji must be set');
            return;
        }
        let currentCategories = await getData('categories');
        const currentCatNames = currentCategories.map((c) => c.name);
        if (currentCatNames.includes(newCategoryName)) {
            Alert.alert(`Duplicated expense name '${newCategoryName}'`);
        } else {
            currentCategories.push({emoji: newCategoryEmoji, name: newCategoryName});
            await storeData('categories', currentCategories);
            setCategories(currentCategories);
        }
        setNewCategoryName('');
        setNewCategoryEmoji('');
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
                                    title="Close"
                                    color="#2F2F2F"
                                    onPress={() => setModalVisible(false)}>
                                </Button>

                                <Button
                                    title="Add"
                                    color="#2F2F2F"
                                    onPress={addCategory}>
                                </Button>

                            </View>
                    </View>
                </Modal>

                <Button
                    title="Add category"
                    color="#2F2F2F"
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