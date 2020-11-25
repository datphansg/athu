import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item:{
        marginTop:5,
        padding:5,
        backgroundColor:"#FFF",
        width:"95%",
        alignSelf:"center",
        flexDirection:"row",
        borderRadius:5
    },
    column: {
      flexShrink: 1,
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
