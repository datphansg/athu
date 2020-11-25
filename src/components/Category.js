import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import materialTheme from '../constants/Theme';

const { width } = Dimensions.get('screen');

const {widthCategory} = width/3;
class Category extends React.Component {
  render() {
    const { navigation, product, horizontal, full, style, priceColor, imageStyle } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];

    return (
      <Block style={[styles.product]}>
         <TouchableWithoutFeedback onPress={() => navigation.navigate('shop', { product: product })}>
           <Text style={styles.productTitle}>{product.name}</Text>
         </TouchableWithoutFeedback>  
      </Block>
    );
  }
}

export default withNavigation(Category);

const styles = StyleSheet.create({
  product: {
    margin: 2,
    borderWidth: 0,
    height:90,
    width: width / 2 - 10,
    borderRadius:3,
    backgroundColor:'#FE2472',
    justifyContent: 'center',
  },
  productTitle: {
    flexWrap: 'wrap',
    fontSize:14,
    fontWeight:'bold',
    paddingLeft: 10,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: 0,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});