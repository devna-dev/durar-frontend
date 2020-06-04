import {Platform} from "react-native";
import common from "../../config/common.style";

const styles = StyleSheet.create({

  MainContainer :{

    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: (Platform.OS == 'ios') ? 20 : 0,
    margin:10

  },

  animatedToastView:
    {
      marginHorizontal: 30,
      paddingHorizontal: 25,
      paddingVertical: 10,
      borderRadius: 25,
      zIndex: 9999,
      position: 'absolute',
      justifyContent: 'center'
    },

  ToastBoxInsideText:
    {
      fontSize: 15,
      alignSelf: 'stretch',
      textAlign: 'center',
        ...common.RegularFont,
    }

});
