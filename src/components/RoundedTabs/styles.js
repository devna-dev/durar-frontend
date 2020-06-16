import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';
import common from '../../styles/common.style';
import theme from '../../styles/theme.style';

export default StyleSheet.create({
  bar: {
     height: 60,
    margin: 1,
    borderTopWidth: 1,
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
  //  paddingVertical: 6,

  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',


  },
  activeItem: {
    //backgroundColor: colors.white,
   // color:colors.grey3,
   // borderBottomColor:colors.primary,
   // borderBottomWidth:1,
    ...common.SemiBoldFont,
    fontSize: 14,
      height:60,
      textAlignVertical:'center',
    //  backgroundColor:"red"
  },
  activeItem1: {
      color:colors.primary,
    borderBottomColor:colors.primary,
    borderBottomWidth:3,
    ...common.BlackFont,
    fontSize: 14,
      height:60,
      textAlignVertical:'center',
      marginHorizontal:5
  }
})
