import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
        flex: 1,
        alignItems:"center",
    },
	 row:{
	    width:'95%',
      marginTop:10,
      flexDirection:"column",
      alignSelf:"center",   
    },
    lable:{
      fontSize:18,
    },
    input:{
      backgroundColor:'#FFF',
      fontSize:18,
      borderRadius:5,
      marginTop:5
    },
    photos:{ 
      margin:10, 
      height:130,
      padding:5,
      width:'90%',  
      alignItems:"center",
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: "#20232a", 
    },
    button:{
      width:'90%',      
      backgroundColor:'red',
      alignItems:"center",
      justifyContent: 'center',
      height:45,
      borderRadius:5
    },
    text:{
      fontWeight:'bold',
      color:'white',
      fontSize:16
    }
})
