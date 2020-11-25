import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
       flex: 1,
       alignItems: 'center'
    },
    slide:{
       alignItems:"center",
       justifyContent: 'center',
    },
    category:{
       paddingLeft:20,
       alignItems:"center"
    },
    categories:{
      paddingTop:20,
      height:130 
    },
    products: {
      paddingTop:10,
      width:"100%",
      flex:1
    }, 
    item:{
      padding:10,
      margin:10,
      height:240,    
      borderRadius:10,
      backgroundColor:"#FFF",
      flexDirection:"column",
      alignItems:"center",   
      justifyContent: 'center',
    },
    column: {
      flexShrink: 1,
    },
    button:{
      padding:10,
      backgroundColor:'red',
      borderRadius:10,
      fontWeight:"bold",
      height:30,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:10
    },
    cartButton:{
      width:'100%',
      alignItems: 'center',
    },
    vButton:{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'red',
      width:'99%',     
      height:45,
      borderRadius:5,
    },
    cAmount:{
      width:'100%'
    }
})  
