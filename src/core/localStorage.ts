import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async <T>(key: string): Promise<T | null> => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (err) {
        console.error(`getItem error [${key}]`, err);
        return null;
    }
};

export const setItem = async <T>(key: string, value: T) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        console.error(`setItem error [${key}]`, err);
    }
};

export const removeItem = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (err) {
        console.error(`removeItem error [${key}]`, err);
    }
};
export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (err) {
        console.error('clearStorage error', err);
    }
};
