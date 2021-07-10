/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ui/Header.ts":
/*!**************************!*\
  !*** ./src/ui/Header.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Header)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/ui/utils.ts\");\n\nclass Header extends HTMLElement {\n  constructor() {\n    super();\n    this.attachShadow({\n      mode: \"open\"\n    });\n    const template = document.createElement(\"template\");\n    template.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.html`\n      <div class=\"container\" part=\"container\">\n        <nav id=\"nav\">\n          <a href=\"#\">codercat</a>\n          <a href=\"#\">about</a>\n        </nav>\n      </div>\n    `.toString();\n    const styleString = _utils__WEBPACK_IMPORTED_MODULE_0__.css`\n      .container {\n        position: absolute;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        height: 20px;\n        width: 100%;\n      }\n\n      @media screen and (max-width: 768px) {\n\n      }\n    `;\n    const style = document.createElement(\"style\");\n    style.textContent = styleString[0];\n    this.shadowRoot?.append(style, template.content.cloneNode(true));\n  }\n\n}\n\n//# sourceURL=webpack://three-ecs/./src/ui/Header.ts?");

/***/ }),

/***/ "./src/ui/LoadingScreen.ts":
/*!*********************************!*\
  !*** ./src/ui/LoadingScreen.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ LoadingScreen)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/ui/utils.ts\");\n\nclass LoadingScreen extends HTMLElement {\n  constructor() {\n    super();\n    this.attachShadow({\n      mode: \"open\"\n    });\n    const template = document.createElement(\"template\");\n    template.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__.html`\n      <div id=\"loading-screen\">\n        <div class=\"load-container\">\n          <div id=\"progress\">\n            <div id=\"bar\"></div>\n          </div>\n          <div id=\"load-log\">loading social affirmation</div>\n        </div>\n      </div>\n    `.toString();\n    const styleString = _utils__WEBPACK_IMPORTED_MODULE_0__.css`\n      #loading-screen {\n        display: none;\n        position: fixed;\n        top: 0;\n        bottom: 0;\n        left: 0;\n        right: 0;\n        background-color: rgb(255, 255, 255);\n        justify-content: center;\n        align-items: center;\n        z-index: 50;\n      }\n\n      .load-container {\n        display: flex;\n        flex-direction: column;\n        font-family: Courier New, Courier, monospace;\n        font-size: 12px;\n        width: 240px;\n      }\n\n      #progress {\n        width: 100%;\n        border-style: solid;\n        border-width: 1px;\n        border-color: black;\n        margin-bottom: 5px;\n      }\n\n      #bar {\n        width: 1%;\n        height: 10px;\n        background-color: rgb(14, 14, 14);\n      }\n\n      @media screen and (max-width: 768px) {\n      }\n    `;\n    const style = document.createElement(\"style\");\n    style.textContent = styleString[0];\n    this.shadowRoot?.append(style, template.content.cloneNode(true));\n    const loadingScreenEl = this.shadowRoot?.querySelector(\"#loading-screen\");\n    const barEl = this.shadowRoot?.getElementById(\"bar\");\n    const loadLogEl = this.shadowRoot?.getElementById(\"load-log\");\n    window.addEventListener(\"on-item-load-start\", e => {\n      const {\n        src\n      } = e.detail;\n\n      if (loadLogEl) {\n        loadLogEl.innerHTML = `loading ${src}`;\n      }\n    });\n    window.addEventListener(\"on-item-load-end\", e => {\n      const {\n        total,\n        idx\n      } = e.detail;\n      const itemsLoaded = total - (total - (idx + 1));\n      const width = itemsLoaded / total * 100;\n\n      if (barEl) {\n        barEl.style.width = width + \"%\";\n      }\n    });\n    window.addEventListener(\"on-load-start\", () => {\n      if (loadingScreenEl) {\n        loadingScreenEl.style.display = 'flex';\n      }\n    });\n    window.addEventListener(\"on-load-end\", () => {\n      if (loadingScreenEl) {\n        loadingScreenEl.style.display = 'none';\n      }\n    });\n  }\n\n}\n\n//# sourceURL=webpack://three-ecs/./src/ui/LoadingScreen.ts?");

/***/ }),

/***/ "./src/ui/index.ts":
/*!*************************!*\
  !*** ./src/ui/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Header */ \"./src/ui/Header.ts\");\n/* harmony import */ var _LoadingScreen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LoadingScreen */ \"./src/ui/LoadingScreen.ts\");\n\n // Register web components\n\ncustomElements.define(\"cc-header\", _Header__WEBPACK_IMPORTED_MODULE_0__.default);\ncustomElements.define(\"loading-screen\", _LoadingScreen__WEBPACK_IMPORTED_MODULE_1__.default);\n\n//# sourceURL=webpack://three-ecs/./src/ui/index.ts?");

/***/ }),

/***/ "./src/ui/utils.ts":
/*!*************************!*\
  !*** ./src/ui/utils.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"html\": () => (/* binding */ html),\n/* harmony export */   \"css\": () => (/* binding */ css)\n/* harmony export */ });\nconst html = strings => strings;\nconst css = strings => strings;\n\n//# sourceURL=webpack://three-ecs/./src/ui/utils.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ui/index.ts");
/******/ 	
/******/ })()
;