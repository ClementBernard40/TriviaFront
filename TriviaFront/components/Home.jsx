import React, { useState } from 'react';
import { View, Text, Button, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import style from '../style';

const Home = () => {
  const navigation = useNavigation();
  const [difficulty, setDifficulty] = useState('any');
  const [category, setCategory] = useState('any');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('any');  

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

  // Liste des catégories avec leurs valeurs correspondantes
  const categories = [
    { label: "Any Category", value: "any" },
    { label: "General Knowledge", value: "9" },
    { label: "Entertainment: Books", value: "10" },
    { label: "Entertainment: Film", value: "11" },
    { label: "Entertainment: Music", value: "12" },
    { label: "Entertainment: Musicals & Theatres", value: "13" },
    { label: "Entertainment: Television", value: "14" },
    { label: "Entertainment: Video Games", value: "15" },
    { label: "Entertainment: Board Games", value: "16" },
    { label: "Science & Nature", value: "17" },
    { label: "Science: Computers", value: "18" },
    { label: "Science: Mathematics", value: "19" },
    { label: "Mythology", value: "20" },
    { label: "Sports", value: "21" },
    { label: "Geography", value: "22" },
    { label: "History", value: "23" },
    { label: "Politics", value: "24" },
    { label: "Art", value: "25" },
    { label: "Celebrities", value: "26" },
    { label: "Animals", value: "27" },
    { label: "Vehicles", value: "28" },
    { label: "Entertainment: Comics", value: "29" },
    { label: "Science: Gadgets", value: "30" },
    { label: "Entertainment: Japanese Anime & Manga", value: "31" },
    { label: "Entertainment: Cartoon & Animations", value: "32" }
  ];

  return (
    <ScrollView contentContainerStyle={style.scrollViewContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={style.container}>
          <View style={style.nbQuestion}>
            <Text style={{marginTop: 25, fontSize: 20}} >Choisissez la difficulté :</Text>
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
            <Text style={{fontSize: 20}}>Choisissez la catégorie :</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20}}>
              {/* Mapping des catégories pour afficher les cartes */}
              {categories.map((cat, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    style.categoryCard,
                    cat.value === selectedCategory ? style.selectedCategoryCard : null, // Appliquer le style sélectionné si la catégorie est sélectionnée
                  ]}
                  onPress={() => {
                    setCategory(cat.value);
                    setSelectedCategory(cat.value); // Mettre à jour la catégorie sélectionnée
                  }}
                >
                  <Text style={[
                    style.categoryCardText,
                    cat.value === selectedCategory ? style.selectedCategoryCardText : null, // Appliquer le style sélectionné si la catégorie est sélectionnée
                  ]}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
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

export default Home;
