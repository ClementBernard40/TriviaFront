import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { useFocusEffect } from '@react-navigation/native'; 
import style from '../style';
import he from 'he';


const Question = ({ route }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [nbCorrectAnswers, setNbCorrectAnswers] = useState(0);
  const [nbQuestion, setNbQuestion] = useState(0);
  const [nbQuestionPast, setNbQuestionPast] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [allAnswers, setAllAnswers] = useState([]);
  const [answerChosen, setAnswerChosen] = useState(false);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const { difficulty, category } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      resetState();
      fetchQuestions();
    }, [route.params])
  );

  const getApiUrl = () => {
    let apiUrl = 'https://opentdb.com/api.php?amount=5';
  
    if (difficulty !== 'any') {
      apiUrl += `&difficulty=${difficulty}`;
    }
  
    if (category !== 'any') {
      apiUrl += `&category=${category}`;
    }
  
    apiUrl += '&type=multiple';
  
    return apiUrl;
  };
  
  const fetchQuestions = async () => {
    const url = getApiUrl();
  
    try {
      const response = await fetch(url);
      const json = await response.json();
      const fetchedQuestions = json.results;
      const shuffledAnswers = fetchedQuestions.map((question) => shuffleArray([...question.incorrect_answers, question.correct_answer]));
      
      setQuestions(fetchedQuestions);
      setAllAnswers(shuffledAnswers);
      setCurrentQuestionIndex(0);
      setLoading(false);
      setNbQuestion(nbQuestion + 5);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleAnswer = (answer) => {
    if (!answerChosen) {
      const correct = answer === questions[currentQuestionIndex].correct_answer;
      setSelectedAnswer(answer);
      setNbQuestionPast(nbQuestionPast + 1);

      if (correct) {
        setNbCorrectAnswers((prev) => prev + 1);
      }
      setAnswerChosen(true);
    }
  };

  const resetState = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setNbCorrectAnswers(0)
    setLoading(true);
    setSelectedAnswer('');
    setAllAnswers([]);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Aucune question disponible.</Text>
      </View>
    );
  }


  const resetAnswer = () => {
    setSelectedAnswer('');
    setAnswerChosen(false);
  };



  const currentQuestion = questions[currentQuestionIndex];
  const answers = allAnswers.length > 0 ? allAnswers[currentQuestionIndex] : [];
  

  return (
    <ScrollView >
      <View style={style.container}>
        <Text style={{ marginVertical: 15, fontSize: 30, alignSelf: "center" }}>{nbCorrectAnswers}/{nbQuestionPast}</Text>
        <Text style={{ marginVertical: 15, fontSize: 20, alignSelf: "center" }}>{he.decode(currentQuestion.question)}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 30 }}>
          {answers.map((answer, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handleAnswer(answer)}
              style={{
                backgroundColor: selectedAnswer
                  ? answer === currentQuestion.correct_answer
                    ? "green"
                    : answer == selectedAnswer
                    ? "red"
                    : "#B8C0FF"
                  : "#B8C0FF",
                paddingVertical: 20, // Augmente la marge intérieure verticale pour ajouter de l'espace au-dessus et en dessous du texte
                marginHorizontal: 8,// Augmente la marge intérieure horizontale pour ajouter de l'espace à gauche et à droite du texte
                marginVertical: 7, // Augmente la marge verticale entre chaque réponse
                width: '45%', // Ajuste la largeur pour afficher deux réponses par ligne
                aspectRatio: 1, // Maintient chaque réponse carrée
                borderRadius: 4, // Garantit que chaque réponse reste carrée
              }}
            >
              <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>{he.decode(answer)}</Text>
              </TouchableOpacity>
          ))}
        </View>
        {currentQuestionIndex < questions.length - 1 ? (
          <View style={style.questionSuivant}>
            <TouchableOpacity style={style.nextButton} onPress={() => {setCurrentQuestionIndex(currentQuestionIndex + 1); resetAnswer()}}>
              <Text style={style.nextButtonText}>Question suivante</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={style.questionSuivant}>
            <TouchableOpacity style={style.nextButton} onPress={() => {fetchQuestions(); resetAnswer()}}>
              <Text style={style.nextButtonText}>Question suivante</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
  
  
};

export default Question;
