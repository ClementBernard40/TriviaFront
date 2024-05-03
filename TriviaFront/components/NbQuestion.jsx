import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import { Picker } from '@react-native-picker/picker';
import style from '../style';

const NbQuestion = () => {
  const navigation = useNavigation();
  const [difficulty, setDifficulty] = useState('any');
  const [category, setCategory] = useState('any');
  const [errorMessage, setErrorMessage] = useState('');


  const handleDifficultyChange = (itemValue) => {
    setDifficulty(itemValue);
  };

  const handleSubmit = () => {
      console.log('Difficulté sélectionnée :', difficulty);
      console.log('Catégorie sélectionnée :', category);
      setErrorMessage('');

      // Naviguer vers la page des questions
      navigation.navigate('Question', {
        difficulty: difficulty,
        category: category,
      });

  };

  return (
    <ScrollView contentContainerStyle={style.scrollViewContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={style.container}>
          <View style={style.nbQuestion}>
            <Text>Choisir la difficulté :</Text>
            <Picker
              selectedValue={difficulty}
              style={{ height: 50, width: 200 }}
              itemStyle={style.picker}
              onValueChange={handleDifficultyChange}>
              <Picker.Item label="Any Difficulty" value="any" />
              <Picker.Item label="Easy" value="easy" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="Hard" value="hard" />
            </Picker>
          </View>
          <View style={style.category}>
            <Text>Choisir la catégorie :</Text>
            <Picker
                selectedValue={category}
                style={{ height: 100, width: 400 }}
                itemStyle={style.picker}
                onValueChange={(itemValue) => setCategory(itemValue)}>
                <Picker.Item label="Any Category" value="any" />
                <Picker.Item label="General Knowledge" value="9" />
                <Picker.Item label="Entertainment: Books" value="10" />
                <Picker.Item label="Entertainment: Film" value="11" />
                <Picker.Item label="Entertainment: Music" value="12" />
                <Picker.Item label="Entertainment: Musicals & Theatres" value="13" />
                <Picker.Item label="Entertainment: Television" value="14" />
                <Picker.Item label="Entertainment: Video Games" value="15" />
                <Picker.Item label="Entertainment: Board Games" value="16" />
                <Picker.Item label="Science & Nature" value="17" />
                <Picker.Item label="Science: Computers" value="18" />
                <Picker.Item label="Science: Mathematics" value="19" />
                <Picker.Item label="Mythology" value="20" />
                <Picker.Item label="Sports" value="21" />
                <Picker.Item label="Geography" value="22" />
                <Picker.Item label="History" value="23" />
                <Picker.Item label="Politics" value="24" />
                <Picker.Item label="Art" value="25" />
                <Picker.Item label="Celebrities" value="26" />
                <Picker.Item label="Animals" value="27" />
                <Picker.Item label="Vehicles" value="28" />
                <Picker.Item label="Entertainment: Comics" value="29" />
                <Picker.Item label="Science: Gadgets" value="30" />
                <Picker.Item label="Entertainment: Japanese Anime & Manga" value="31" />
                <Picker.Item label="Entertainment: Cartoon & Animations" value="32" />
              </Picker>
          </View>
          <View>
            {errorMessage ? <Text style={style.errorMessage}>{errorMessage}</Text> : null}
          </View>
          <View style={errorMessage ? style.bouton : style.boutonContainer}>
            <Button title="Valider" onPress={handleSubmit} />
          </View>

        </View>

      </TouchableWithoutFeedback>
    </ScrollView>
  );
};


export default NbQuestion;
