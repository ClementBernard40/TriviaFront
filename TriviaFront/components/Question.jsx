import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { useFocusEffect } from '@react-navigation/native'; 
import style from '../style';

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

  const fetchQuestions = async () => {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    console.log(difficulty)
    console.log(category)
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

    if (difficulty !== 'any' && category !== 'any') {
        console.log("y'a tout")
        try {
            console.log("hjklmù")
            const url = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
            const response = await fetch( url );
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
    } else if (difficulty === 'any' && category !== 'any') {
        console.log("y'a que catego")

        try {
            const url =  `https://opentdb.com/api.php?amount=5&category=${category}&type=multiple`
            console.log(url)
            const response = await fetch( url );
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
        
    } else if ( difficulty !== 'any' &&  category === 'any') {
        console.log("y'a que difficulté")

        try {
            const url = `https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&type=multiple`
            console.log(url)
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
        
    } else {
        console.log("y'a r")

        try {
            const url = `https://opentdb.com/api.php?amount=5&type=multiple`
            console.log('vhjgggvhvghsxdcfgvbhnj,knbvcxdsdcfvgbhnjbvcxwsxdcfvgbhnj')
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
    <ScrollView>
      <View style={style.container}>
        <Text style={{ marginVertical: 15, fontSize: 30, alignSelf: "center" }}>{nbCorrectAnswers}/{nbQuestionPast}</Text>
        <Text style={{ marginVertical: 15, fontSize: 20, marginBottom: 20, alignSelf: "center" }}>{currentQuestion.question}</Text>
        <Text> reponse :</Text>
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
              padding: 12,
              marginVertical: 6,
              borderRadius: 4,
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 16, color: 'white' }}>{answer}</Text>
          </TouchableOpacity>
        ))}
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
