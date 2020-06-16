const { AsyncStorage } = require("react-native")

import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value)=>{
    try{
        await AsyncStorage.setItem(key,JSON.stringify(value))
    }catch(e){

    }
}

export const getData = async (key) => {
    try{
        await AsyncStorage.getItem(key)
        if(value !== null ){
            return JSON.parse(value);
        }
    }catch(e){

    }
}