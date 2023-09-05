import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log("An error happened: ", error);
    }
};

const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log("An error happened: ", error);
    }
};

export { getData, storeData }