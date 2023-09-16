jest.useFakeTimers();

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('./src/app/utils', () => {
  return {
    multiGetData: async (_keys) => ({expenses: [], categories: []}),
    getData: async (_key) => ([]),
    storeData: async (_key, _data) => {},
    transformCategories: (_cats) => ({}),
    groupByDate: (_exps, _cats) => ([]),
  };
});
