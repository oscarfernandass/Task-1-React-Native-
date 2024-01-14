import { View, Text ,Image} from "react-native";
import React from "react";
import checker from '../assets/check.png'
import wronger from '../assets/cross.png'



const Choice = ({ type })=>{
    return (
        <>
            <Image style={{ width: 100, height: 100 }} source={type}/>
        </>
    )
}

export default Choice