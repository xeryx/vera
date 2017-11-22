import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import merge from 'lodash.merge';
var _colors = require('material-ui/styles/colors');
var _colorManipulator = require('material-ui/utils/colorManipulator');

const muiTheme = {
  palette: {
    primary1Color: '#0f4d2e',
    primary2Color: _colors.cyan700,
    primary3Color: _colors.grey600,
    accent1Color: _colors.greenA200,
    //accent2Color: _colors.greenA400,
    //accent2Color: '#00994f',
    accent2Color: '#004d28',
    accent3Color: _colors.greenA100,
    textColor: _colors.fullWhite,
    secondaryTextColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.7),
    alternateTextColor: '#abb3af',
    canvasColor: '#303030',
    borderColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.3),
    disabledColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.3),
    pickerHeaderColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.12),
    clockCircleColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.12)
  
},

};

const theme = merge(darkBaseTheme, muiTheme)
export default theme;