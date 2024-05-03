import { StyleSheet } from "react-native";

export default StyleSheet.create({
    color: "#bA807V",
    container: {
        flex: 1, // tres important
        backgroundColor: '#CDCDCD',
        justifyContent: "center"
      },
    
      nbQuestion: {
        marginTop: 20,
        fontSize: 20,
        alignItems: 'center',
      },

      bouton: {
        flex: 1,
        alignSelf: "center",
        marginTop: 30, // Espacement supplémentaire si nécessaire
        width: 100,
        backgroundColor: 'white',
        borderRadius: 8, // Bord arrondi du bouton
        marginBottom: 50,
      },

      questionSuivant: {
        flex: 1,
        alignSelf: "center",
        marginTop: 50, // Espacement supplémentaire si nécessaire
        width: 200,
        fontSize: 20,
        backgroundColor: 'white',
        borderRadius: 8, // Bord arrondi du bouton
        marginBottom: 50,
      },

      nextButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
      },
      nextButtonText: {
        color: 'white',
        fontSize: 16,
      },

      boutonContainer: {
        flex: 1,
        alignSelf: "center",
        marginTop: 180, // Espacement supplémentaire si nécessaire
        width: 100,
        backgroundColor: 'white',
        borderRadius: 8, // Bord arrondi du bouton
        marginBottom: 50,

      },


      picker: {
        fontSize: 18, // Reduit la taille de la police du Picker
      },

      title: {
        
        fontSize: 30,
        fontWeight: "bold",
        color: '#FFFFFF'
      },
      category: {
        marginTop: 200,
        fontSize: 15,
        backgroundColor: '#CDCDCD',
        alignItems: 'center',
      },

      input: {
        borderColor: '#bA807f',
        borderWidth: 1,
        width: 200,
        height: 40,
        padding: 5,
        marginTop: 25,
        marginBottom: 10,
        borderRadius: 8,
      },

      errorMessage: {
        flex: 1,
        alignSelf: "center",
        fontSize: 20,
        color: 'red', // Couleur du texte en rouge
        marginTop: 180, // Espace entre le bouton et le message d'erreur
      },

})