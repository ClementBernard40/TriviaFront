import React from "react";
import {View } from "react-native";
import Home from "../components/Home";
import style from '../style';

const HomeScreen = () => {
  return (
    <View style={style.container}>
        <Home />
    </View>
  );

};

export default HomeScreen;