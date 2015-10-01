/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * @constructor
	 * @param {string} title - Pixelator
	 * @param {string} author - Charlie Greenman
	 */

	"use strict";

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _utilsJs = __webpack_require__(1);

	var _utilsJs2 = _interopRequireDefault(_utilsJs);

	document.addEventListener("DOMContentLoaded", domLoaded, false);

	function domLoaded() {

	  var s,
	      elem,
	      x,
	      y,
	      z,
	      colorNum = 0,
	      arrMap = [],
	      c = document.getElementById("canvasGrid"),
	      ctx = c.getContext("2d"),
	      bitIllustrator = {
	    elements: {
	      codeBoxContainer: document.getElementById("code_box_container"),
	      headerContainer: document.getElementById("header-container"),
	      codeBox: document.getElementById("code_box"),
	      cssToggle: document.getElementById("css_toggle"),
	      sassToggle: document.getElementById("sass_toggle"),
	      lessToggle: document.getElementById("less_toggle"),
	      jsToggle: document.getElementById("js_toggle"),
	      viewButton: document.getElementById("view-button"),
	      drawButton: document.getElementById("draw-button"),
	      codeBoxToggle: document.getElementById("code_box_toggle"),
	      hexColor: document.getElementById("hex_color"),
	      colorBar: document.getElementById("color_bar"),
	      rgb: document.querySelectorAll(".rgb"),
	      red: document.getElementById("red"),
	      green: document.getElementById("green"),
	      blue: document.getElementById("blue")
	    },
	    settings: {
	      resetButton: document.getElementById("reset-button"),
	      chooseSizeContainer: document.getElementById("choose_size_container"),
	      canvas: document.getElementById("canvasGrid"),
	      createGrid: document.getElementById("create_grid"),
	      rowCount: document.getElementById("input-for-rows").value,
	      columnCount: document.getElementById("input-for-columns").value,
	      pixSize: document.getElementById("input-for-pixel-size").value,
	      codeBox: document.getElementById("code_box"),
	      storeValues: [],
	      storeColors: [],
	      sassColorVariables: [],
	      lessColorVariables: []
	    },

	    init: function init() {
	      elem = bitIllustrator.elements;
	      s = bitIllustrator.settings;
	      bitIllustrator.bindActions();
	    },

	    bindActions: function bindActions() {
	      s.createGrid.addEventListener("click", function () {
	        bitIllustrator.updatedSettings();
	        bitIllustrator.hideShow();
	        bitIllustrator.resizeGrid();
	        bitIllustrator.createGridIllustrator();
	      });
	      elem.viewButton.addEventListener("click", function () {
	        bitIllustrator.removeTiles();
	        bitIllustrator.addBackTiles();
	      });
	      elem.drawButton.addEventListener("click", function () {
	        bitIllustrator.redoGrid();
	      });
	      s.resetButton.addEventListener("click", bitIllustrator.resetButton, false);
	      c.addEventListener("click", function () {
	        bitIllustrator.handleClick();
	        bitIllustrator.addColors();
	        bitIllustrator.convertToArray();
	        bitIllustrator.convertToCss();
	      });
	      elem.cssToggle.addEventListener("click", function () {
	        bitIllustrator.convertToCss();
	      });
	      elem.sassToggle.addEventListener("click", function () {
	        bitIllustrator.addSassVariables();
	        bitIllustrator.convertToSass();
	      });
	      elem.lessToggle.addEventListener("click", function () {
	        bitIllustrator.addLessVariables();
	        bitIllustrator.convertToLess();
	      });
	      elem.hexColor.addEventListener("input", function () {
	        bitIllustrator.pickHexColor();
	      });
	      //consider revision
	      for (var i = 0; i < 3; i++) {
	        elem.rgb[i].addEventListener("input", bitIllustrator.pickRgbColor, false);
	      }
	      elem.jsToggle.addEventListener("click", function () {
	        bitIllustrator.addArrayMap();
	        bitIllustrator.convertToJs();
	      });
	      elem.codeBoxToggle.addEventListener("click", bitIllustrator.codeBoxToggle, false);
	    },

	    resetButton: function resetButton() {
	      location.reload();
	    },

	    updatedSettings: function updatedSettings() {
	      s.rowCount = document.getElementById("input-for-rows").value;
	      s.columnCount = document.getElementById("input-for-columns").value;
	      s.pixSize = document.getElementById("input-for-pixel-size").value;
	    },

	    hideShow: function hideShow() {
	      s.chooseSizeContainer.style.display = "none";
	      elem.headerContainer.style.display = "block";
	      s.canvas.style.display = "block";
	    },

	    resizeGrid: function resizeGrid() {
	      s.canvas.width = s.columnCount * s.pixSize;
	      s.canvas.height = s.rowCount * s.pixSize;
	      s.canvas.style.marginLeft = -(s.columnCount * s.pixSize) / 2 + "px";
	    },

	    pickHexColor: function pickHexColor() {
	      var newHexValue = elem.hexColor.value;
	      /*eslint-disable*/
	      elem.colorBar.style.background = newHexValue;

	      elem.red.value = _utilsJs2["default"].hexToRgb(newHexValue).r;
	      elem.green.value = _utilsJs2["default"].hexToRgb(newHexValue).g;
	      elem.blue.value = _utilsJs2["default"].hexToRgb(newHexValue).b;

	      /*eslint-enable*/
	    },

	    pickRgbColor: function pickRgbColor() {
	      /*eslint-disable*/
	      elem.hexColor.value = _utilsJs2["default"].rgbToHex(parseFloat(elem.red.value), parseFloat(elem.green.value), parseFloat(elem.blue.value));
	      elem.colorBar.style.background = elem.hexColor.value;
	      /*eslint-enable*/
	    },

	    //create grid and create boxes
	    createGridIllustrator: function createGridIllustrator() {
	      //module for creating a grid

	      for (var r = 0; r < s.columnCount; r++) {
	        for (var i = 0; i < s.rowCount; i++) {
	          ctx.strokeStyle = "#3e4649";
	          ctx.strokeRect(r * s.pixSize, i * s.pixSize, s.pixSize, s.pixSize);
	        }
	      }
	    },

	    //allow individual boxes to be clicked
	    // handleClick is still in prototyping phase
	    handleClick: function handleClick(e) {
	      e = e || window.event;
	      var newHexValue = elem.hexColor.value;
	      ctx.fillStyle = newHexValue;
	      var imgData = ctx.getImageData(Math.floor(e.offsetX / s.pixSize) * s.pixSize, Math.floor(e.offsetY / s.pixSize) * s.pixSize, s.pixSize, s.pixSize);
	      if (imgData.data[0] !== 62 && imgData.data[1] !== 71 && imgData.data[2] !== 74) {
	        ctx.fillStyle = "#333333";
	        ctx.strokeStyle = "#3e4649";
	        ctx.lineWidth = 2;
	        // each individual blank piece is now removed and added using canvas
	        // as opposed to how it is/was originally used, which is through
	        //
	        ctx.clearRect(Math.floor(e.offsetX / s.pixSize) * s.pixSize, Math.floor(e.offsetY / s.pixSize) * s.pixSize, s.pixSize, s.pixSize);
	        ctx.strokeRect(Math.floor(e.offsetX / s.pixSize) * s.pixSize, Math.floor(e.offsetY / s.pixSize) * s.pixSize, s.pixSize, s.pixSize);

	        return false;
	      }

	      ctx.fillRect(Math.floor(e.offsetX / s.pixSize) * s.pixSize, Math.floor(e.offsetY / s.pixSize) * s.pixSize, s.pixSize, s.pixSize);
	    },

	    /* create multi-dimensional array
	       that is sorted by x value */
	    convertToArray: function convertToArray(e) {
	      e = e || window.event;
	      var xVal = Math.floor(e.offsetX / s.pixSize) * s.pixSize;
	      var yVal = Math.floor(e.offsetY / s.pixSize) * s.pixSize;

	      s.storeValues.push([xVal, yVal, elem.hexColor.value]);

	      for (var i = 0; i < 2; i++) {
	        s.storeValues[s.storeValues.length - 1][i] += "px";
	      }

	      for (var io = 0; io < s.storeValues.length - 1; io++) {
	        //decided it made more sense to remove pushed value in array and then to parse through and remove value
	        //used this stackoverflow http://stackoverflow.com/questions/26635297/how-to-remove-an-array-from-a-multidimensional-array-if-it-exists-in-another-mul
	        if (JSON.stringify(s.storeValues[io]) === JSON.stringify(s.storeValues[s.storeValues.length - 1])) {
	          s.storeValues.splice(io, 1);
	          s.storeValues.splice(s.storeValues.length - 1, 1);
	        }
	      }
	      /*eslint-disable*/
	      s.storeValues.sort(_utilsJs2["default"].compare);
	      /*eslint-enable*/
	    },

	    //create a color array for sass variables
	    // in order to enable color1, color2, etc...
	    addColors: function addColors() {
	      //only add value if it is a new color
	      if (s.storeColors.length > 0 && s.storeColors.indexOf(elem.hexColor.value) > -1) {
	        return;
	      } else {
	        colorNum++;
	        s.storeColors.push(elem.hexColor.value);
	        s.sassColorVariables.push("$color" + colorNum);
	        s.lessColorVariables.push("$color" + colorNum);
	      }

	      //alert( s.storeColors);
	      // wip look at sass build variabls
	    },

	    codeBoxToggle: function codeBoxToggle() {
	      elem.codeBoxContainer.classList.toggle("open");
	      if (elem.codeBoxContainer.classList.contains("open")) {
	        elem.codeBoxToggle.innerHTML = " - ";
	      } else {
	        elem.codeBoxToggle.innerHTML = " + ";
	      }
	    },

	    removeTiles: function removeTiles() {

	      for (var r = 0; r < s.columnCount; r++) {
	        for (var i = 0; i < s.rowCount; i++) {
	          s.canvas.style.background = "none";
	          ctx.clearRect(r * s.pixSize, i * s.pixSize, s.pixSize, s.pixSize);
	        }
	      }
	    },

	    addBackTiles: function addBackTiles() {
	      for (var pw = 0; pw < s.storeValues.length; pw++) {

	        ctx.fillRect(parseFloat(s.storeValues[pw][0]), parseFloat(s.storeValues[pw][1]), s.pixSize, s.pixSize);
	        ctx.fillStyle = s.storeValues[pw][2];
	      }
	    },

	    redoGrid: function redoGrid() {
	      for (var r = 0; r < s.columnCount; r++) {
	        for (var i = 0; i < s.rowCount; i++) {
	          s.canvas.style.background = "rgba(0, 0, 0, 0.1)";
	          ctx.strokeStyle = "#3e4649";
	          ctx.strokeRect(r * s.pixSize, i * s.pixSize, s.pixSize, s.pixSize);
	        }
	      }

	      for (var pw = 0; pw < s.storeValues.length; pw++) {

	        ctx.fillRect(parseFloat(s.storeValues[pw][0]), parseFloat(s.storeValues[pw][1]), s.pixSize, s.pixSize);
	        ctx.fillStyle = s.storeValues[pw][2];
	      }
	    },
	    convertToCss: function convertToCss() {
	      elem.codeBox.classList.remove("sass_box", "less_box", "js_box");
	      elem.codeBox.classList.add("css_box");

	      /* reset value for elem.codeBox */
	      elem.codeBox.innerHTML = "box-shadow: ";
	      /* instead of re-inserting value, need to think of how to do this */
	      for (var abc = 0; abc < s.storeValues.length; abc++) {
	        if (abc === s.storeValues.length - 1) {
	          elem.codeBox.innerHTML += s.storeValues[abc].join(" ") + "; ";
	        } else {
	          elem.codeBox.innerHTML += s.storeValues[abc].join(" ") + ", ";
	        }
	      }
	    },

	    addSassVariables: function addSassVariables() {
	      elem.codeBox.classList.remove("css_box", "less_box", "js_box");
	      elem.codeBox.classList.add("sass_box");

	      elem.codeBox.innerHTML = "$num: " + s.pixSize + ";<br>";
	      for (var avi = 0; avi < s.storeColors.length; avi++) {
	        elem.codeBox.innerHTML += " $colors" + avi + ": " + s.storeColors[avi] + ";";
	      }

	      elem.codeBox.innerHTML += "<br>";

	      for (x = 0; x < s.columnCount; x++) {
	        elem.codeBox.innerHTML += "$X" + x + ": $num*" + x + "px; ";
	      }
	      elem.codeBox.innerHTML += "$num: " + s.pixSize + ";<br>";
	      for (y = 0; y < s.columnCount; y++) {
	        elem.codeBox.innerHTML += "$O" + x + ": $num*" + x + "px; ";
	      }
	      elem.codeBox.innerHTML += "<br><br>";
	    },

	    convertToSass: function convertToSass() {

	      elem.codeBox.innerHTML += "box-shadow: ";
	      for (var xyz = 0; xyz < s.storeValues.length; xyz++) {
	        elem.codeBox.innerHTML += " $X" + parseFloat(s.storeValues[xyz][0]) / s.pixSize;
	        elem.codeBox.innerHTML += " $O" + parseFloat(s.storeValues[xyz][1]) / s.pixSize;
	        //need to add support with name that color

	        for (var avi = 0; avi < s.storeColors.length; avi++) {
	          if (s.storeValues[xyz][2] === s.storeColors[avi]) {
	            elem.codeBox.innerHTML += " " + s.sassColorVariables[avi];
	          }
	        }
	        if (xyz === s.storeValues.length - 1) {
	          elem.codeBox.innerHTML += ";";
	        } else {
	          elem.codeBox.innerHTML += ",";
	        }
	      }
	    },

	    addLessVariables: function addLessVariables() {
	      elem.codeBox.classList.remove("css_box", "sass_box", "js_box");
	      elem.codeBox.classList.add("less_box");

	      elem.codeBox.innerHTML = "@num:" + s.pixSize + ";<br>";

	      for (var avi = 0; avi < s.storeColors.length; avi++) {
	        elem.codeBox.innerHTML += "@colors " + avi + ": " + s.storeColors[avi] + ";";
	      }

	      elem.codeBox.innerHTML += "<br>";

	      for (x = 0; x < s.columnCount; x++) {
	        elem.codeBox.innerHTML += "@X" + x + ": @num*" + x + "px; ";
	      }
	      elem.codeBox.innerHTML += "$num: " + s.pixSize + ";<br>";
	      for (y = 0; y < s.columnCount; y++) {
	        elem.codeBox.innerHTML += "@O" + x + ": @num*" + x + "px; ";
	      }
	      elem.codeBox.innerHTML += "<br><br>";
	    },

	    convertToLess: function convertToLess() {
	      elem.codeBox.innerHTML += "box-shadow: ";
	      for (var xyz = 0; xyz < s.storeValues.length; xyz++) {
	        elem.codeBox.innerHTML += " @X" + parseFloat(s.storeValues[xyz][0]) / s.pixSize;
	        elem.codeBox.innerHTML += " @O" + parseFloat(s.storeValues[xyz][1]) / s.pixSize;

	        for (var avi = 0; avi < s.storeColors.length; avi++) {
	          if (s.storeValues[xyz][2] === s.storeColors[avi]) {
	            elem.codeBox.innerHTML += " " + s.lessColorVariables[avi];
	          }
	        }

	        if (xyz === s.storeValues.length - 1) {
	          elem.codeBox.innerHTML += ";";
	        } else {
	          elem.codeBox.innerHTML += ",";
	        }
	      }
	    },

	    addArrayMap: function addArrayMap() {
	      //reset values, in case one decides to go back to the the js tab
	      elem.codeBox.innerHTML = "";
	      arrMap = [];
	      //initialize the array map
	      for (x = 0; x < s.columnCount; x++) {
	        arrMap.push([]);
	      }

	      for (x = 0; x < s.rowCount - 1; x++) {
	        for (y = 0; y < s.columnCount - 1; y++) {
	          arrMap[x].push(0);
	          for (z = 0; z < s.storeValues.length - 1; z++) {
	            if (x === parseFloat(s.storeValues[z][0]) / s.pixSize && y === parseFloat(s.storeValues[z][1]) / s.pixSize) {
	              arrMap[y][x] = 1;
	            }
	          }
	        }
	      }

	      //create a new line once the app continues to the next line
	      //test to see if I can change value of  arrMap[1][1] = 3;

	      arrMap[s.columnCount - 1] += "]";
	      elem.codeBox.innerHTML = "[";
	      elem.codeBox.innerHTML += arrMap.join("],<br />[");
	    },

	    convertToJs: function convertToJs() {
	      elem.codeBox.classList.remove("css_box", "sass_box", "less_box");
	      elem.codeBox.classList.add("js_box");
	    }
	  };

	  bitIllustrator.init();
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var utils = {
	  compare: function compare(a, b) {

	    if (parseFloat(a[0]) - parseFloat(b[0]) === 0) {
	      return parseFloat(a[1]) - parseFloat(b[1]);
	    } else {
	      return parseFloat(a[0]) - parseFloat(b[0]);
	    }
	  },
	  //used http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
	  hexToRgb: function hexToRgb(hex) {
	    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
	      return r + r + g + g + b + b;
	    });

	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    return result ? {
	      r: parseInt(result[1], 16),
	      g: parseInt(result[2], 16),
	      b: parseInt(result[3], 16)
	    } : null;
	  },
	  componentToHex: function componentToHex(c) {
	    var hex = c.toString(16);
	    return hex.length == 1 ? "0" + hex : hex;
	  },
	  rgbToHex: function rgbToHex(r, g, b) {
	    return "#" + utils.componentToHex(r) + utils.componentToHex(g) + utils.componentToHex(b);
	  }
	};

	exports["default"] = utils;
	module.exports = exports["default"];

/***/ }
/******/ ]);