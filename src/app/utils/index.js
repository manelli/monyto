import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('An error happened: ', e);
    }
};

const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log('An error happened: ', e);
    }
};

const multiGetData = async (keys) => {
  try {
    const jsonValues = await AsyncStorage.multiGet(keys);
    let values = {};
    for (let i = 0; i < jsonValues.length; i++) { 
      values[jsonValues[i][0]] = JSON.parse(jsonValues[i][1]);
    };
    return values;
  } catch (e) {
    console.log('An error happened: ', e);
  }
};

const randKey = () => (Math.random().toString(36).slice(2, 8))

export { getData, storeData, multiGetData, randKey }