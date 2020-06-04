import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';
import common from '../../styles/common.style';
import theme from '../../styles/theme.style';

export default StyleSheet.create({
  bar: {
     height: 45,
    margin: 1,
    borderBottomWidth: 1,
    borderColor: colors.grey0,
    flexDirection: 'row',
    alignSelf:'flex-end',
    justifyContent: 'space-around',
  },
  tabName: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    paddingVertical: 6,

  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',


  },
  activeItem: {
    backgroundColor: colors.white,
    color:colors.primary,
    borderBottomColor:colors.primary,
    borderBottomWidth:2,
    ...common.RegularFont,
    fontSize: 15,
    height:'100%'
  },
  activeItem1: {
    //backgroundColor: colors.twitter,
    color:colors.white,
    borderBottomColor:colors.white,
    borderBottomWidth:2,
    ...common.RegularFont,
    fontSize: 15,
    height:'100%',


  }
})
