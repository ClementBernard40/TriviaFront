import React from "react";
import {View } from "react-native";
import Question from "../components/Question";
import style from '../style';

const QuestionScreen = ({route}) => {

  return (
    <View style={style.container}>
        <Question route={route}/>
    </View>
  );

};

export default QuestionScreen;