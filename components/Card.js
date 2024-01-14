import { View , Text, Image, StyleSheet, Dimensions, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
const { width , height } = Dimensions.get("screen");
import { Fragment, useCallback } from "react";
import Choice from "./Choice";
import checker from '../assets/check.png'
import wronger from '../assets/cross.png'

const Card = ({color,isFirst, swipe, titlSign, ...rest })=>{

    
    const rotate = Animated.multiply(swipe.x,titlSign).interpolate({
        inputRange: [-100,0,100],
        outputRange: ['8deg', '0deg', '-8deg']
    });

    
    const animatedCardStyle = {
        transform: [...swipe.getTranslateTransform(), { rotate }]
    }

    
    const likeOpacity = swipe.x.interpolate({
        inputRange: [25, 100],
        outputRange: [0,1],
        extrapolate: 'clamp'
    });

    
    const nopeOpacity = swipe.x.interpolate({
        inputRange: [-100, -25],
        outputRange: [1,0],
        extrapolate: 'clamp'
    });

   
    const renderChoice = useCallback(()=>{
        return (
           <Fragment>
              <Animated.View
               style={[
                styles.choiceContainer, 
                styles.likeContainer,
                { opacity: likeOpacity }
                ]}>
                 <Choice type={checker}/>
              </Animated.View>
              <Animated.View 
                style={[
                    styles.choiceContainer, 
                    styles.nopeContainer,
                { opacity: nopeOpacity }
                    ]}>
                 <Choice type={wronger}/>
              </Animated.View>
           </Fragment>
        )
    },[likeOpacity, nopeOpacity])

    return (
        <Animated.View style={[
            styles.container,
            isFirst && animatedCardStyle
            ]} {...rest}>
            
              <View style={[styles.userContainer, { backgroundColor: color }]}>
                
              </View>
            {isFirst && renderChoice()}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        top: 120,
        left:28,

    },
    image: {
        width: width * 0.9,
        height: height * 0.78,
        borderRadius: 20
    },
    gradient: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        borderRadius:  20
    },
    userContainer:{
        borderRadius:10,
        alignSelf:'center',
        height:500,
        width:300,
    },
    name: {
        fontSize: 30,
        color: "#FFFFFF",
        fontWeight: "400"
    },
    choiceContainer: {
       position: 'absolute',
       top: 100
    },
    likeContainer:{
        top:10,
      left: 10,
      transform: [{ rotate: '-30deg' }]
    },
    nopeContainer:{
        top:10,
        right: 10,
      transform: [{ rotate: '30deg' }]
    },
})

export default Card