import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    alignItems: 'center'
  },
  slide:{
       alignItems:"center",
       justifyContent: 'center',
  },
  dashboard:{
    width:'90%',
    height:90,
    margin:10,
    borderRadius:10,
    backgroundColor:'white',
    alignSelf:"center",
    justifyContent:"center",
  },
  listItem:{
    marginTop:10,
    padding:10,
    backgroundColor:"#FFF",
    width:"90%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5
  },
  welcome:{
    paddingLeft:20,
    fontSize:12
  } 
})
