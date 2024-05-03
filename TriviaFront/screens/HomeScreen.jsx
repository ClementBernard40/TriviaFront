import React from "react";
import {View } from "react-native";
import NbQuestion from "../components/NbQuestion";
import style from '../style';

const HomeScreen = () => {
  return (
    <View style={style.container}>
        <NbQuestion />
    </View>
  );

};

export default HomeScreen;