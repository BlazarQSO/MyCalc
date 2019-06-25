﻿(function () {
    window.onload = function () {
        
        var firstArg = undefined;       // First argument of arithmetic operation.
        var secondArg = undefined;      // Second argument of arithmetic operation.
        var firstArgDiff = undefined;   // First argument of difficult arithmetic operation.
        
        var sign = "";                  // This argument contains a sign of an arithmetic operation.
        var signAct = "";               // This argument contains an arithmetic action.
        var signActDiff = "";           // This argument contains a difficult arithmetic action.
        var signTrue = 0;               // An arithmetic operation has been pushed or not.
        var signMark = "";
        
        var memory = undefined;         
            
        var signPrevScr = "";           // This argument is a previous sign for correct data input.
        var rScrOperation = "";         // This argument is a writing of arithmetic operation. 

        // This is Array of objects buttons
        var buttons = {

            "result": {
                title: "=",                
                onClickHandler: function (e) {                    
                    return function () {
                        if ((firstArg != undefined && signAct != "") || firstArgDiff != undefined) {
                            if (secondArg == undefined) {
                                secondArg = getId("screen").textContent.replace(/\s/g, "");;
                            } 
                            
                            if (signActDiff == "") {
                                firstArg = count(firstArg, secondArg, signAct)
                                getId("screen").innerHTML = triad(firstArg);
                                binOctHex(firstArg);
                                signTrue = 1;
                                signMark = "=";
                            }
                            else {
                                if (firstArg != undefined && signAct != "") {
                                    secondArg = count(firstArgDiff, getId("screen").textContent.replace(/\s/g, ""), signActDiff);
                                    firstArg = count(firstArg, secondArg, signAct);
                                    getId("screen").innerHTML = triad(firstArg);
                                    binOctHex(firstArg);
                                    firstArgDiff = undefined;
                                    signActDiff = "";                                    
                                    signTrue = 1;
                                    signMark = "=";
                                }
                                else {
                                    firstArgDiff = count(firstArgDiff, secondArg, signActDiff)
                                    getId("screen").innerHTML = triad(firstArgDiff);
                                    binOctHex(firstArgDiff);
                                    signTrue = 1;
                                    signMark = "=";
                                }                                
                            }
                        }
                        getId("repeatScreen").innerHTML = "";
                        signPrevScr = "";
                        rScrOperation = "";                        
                    };
                }
            },

            //#region region №1 These Buttons only add or remove a value on the calculator screen.
            
            "b1": {
                title: "1",
                value: 1,
                onClickHandler: function (e) {
                    var self = this.value
                    return function () {
                        addSign(self);
                    };
                }
            },
            "b2": {
                title: "2",
                value: 2,
                onClickHandler: function (e) {
                    var self = this.value
                    return function () {
                        addSign(self);
                    };
                }
            },
            "b3": {
                title: "3",
                value: 3,
                onClickHandler: function (e) {
                    var self = this.value
                    return function () {
                        addSign(self);
                    };
                }
            },
            "b4": {
                title: "4",
                value: 4,
                onClickHandler: function (e) {
                    var self = this.value
                    return function () {
                        addSign(self);
                    };
                }
            },
            "b5": {
                title: "5",
                value: 5,
                onClickHandler: function (e) {
                    var self = this.value
                    return function () {
                        addSign(self);
                    };
                }
            },
            "b6": {
                title: "6",
                value: 6,
                onClickHandler: function (e) {
                    var self = this.value
                    return function () {
                        addSign(self);
                    };
                }
            },
            "b7": {
                title: "7",
                value: 7,
                onClickHandler: function (e) {
                    var self = this.value
                    return function () {
                        addSign(self);
                    };
                }
            },
            "b8": {
                title: "8",
                value: 8,
                onClickHandler: function (e) {
                    var self = this.value
                    return function () {
                        addSign(self);
                    };
                }
            },
            "b9": {
                title: "9",
                value: 9,
                onClickHandler: function (e) {
                    var self = this.value
                    return function () {
                        addSign(self);
                    };
                }
            },
            "b0": {
                title: "0",
                value: 0,
                onClickHandler: function (e) {
                    var self = this.value
                    return function () {
                        addSign(self);
                    };
                }
            },
            "dot": {
                title: ".",                
                onClickHandler: function (e) {
                    var self = this.title
                    return function () {
                        if (getId("screen").textContent.indexOf(".") == -1 && signTrue == 0) {
                            addSign(self);
                        } 
                    };
                }
            },
            "DEL": {
                title: "DEL",                
                onClickHandler: function (e) {                    
                    return function () {                        
                        if (signTrue == 0 && rScrOperation == "") {

                            var val = getId("screen").textContent;
                            val = val.replace(/\s/g, "");
                            val = val.slice(0, val.length - 1);
                            if (val != "") {
                                getId("screen").innerHTML = triad(val);
                            } else {
                                getId("screen").innerHTML = "0";
                            }
                            
                            binOctHex(val);
                        }
                    };
                }
            },
            "C": {
                title: "C",                
                onClickHandler: function (e) {                    
                    return function () {
                        getId("screen").innerHTML = "0";                        
                        getId("repeatScreen").innerHTML = "";
                        firstArg = undefined;
                        secondArg = undefined;
                        firstArgDiff = undefined;
                        sign = "";
                        signAct = "";
                        signActDiff = "";
                        signMark = "";
                        signTrue = 0;                        
                        signPrevScr = "";
                        rScrOperation = "";
                        binOctHex(0);
                    };
                }
            },
            "bπ": {
                title: "π",
                value: 3.14159265358979323846,
                onClickHandler: function (e) {
                    var self = this.value
                    var title = this.title
                    return function () {
                        addSign(self, title);                        
                    };
                }
            },

            //#endregion

            //#region region №2 These are buttons of arithmetic operations.
     
            "sum": {
                title: "+",                
                onClickHandler: function (e) {
                    var self = this.title
                    return function () {
                        arithmetic(self);
                    };
                }
            },
            "sub": {
                title: "-",
                onClickHandler: function (e) {
                    var self = this.title
                    return function () {                        
                        arithmetic(self);
                    };
                }
            },
            "mult": {
                title: "*",                
                onClickHandler: function (e) {
                    var self = this.title
                    return function () {
                        arithmetic(self);
                    };
                }
            },
            "div": {
                title: "÷",                
                onClickHandler: function (e) {
                    var self = this.title
                    return function () {
                        arithmetic(self);
                    };
                }
            },

            //#endregion
            
            //#region region №3 These are buttons of functions.                      

            "Xdeg2": {
                title: "x^2",                
                onClickHandler: function (e) {
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self, "sqr");
                    };
                }
            },
            "Xdeg3": {
                title: "x^3",
                onClickHandler: function (e) {                    
                    var self = this.title;                    
                    return function () {
                        arithmeticFunc(self, "cube");
                    };
                }
            },
            "√": {
                title: "√",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self, "√");
                    };
                }
            },
            "b10degX": {
                title: "10^x",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self, "10^");
                    };
                }
            },
            "b1divX": {
                title: "1/x",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self, "1/");
                    };
                }
            },            
            "nfactr": {
                title: "n!",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self, "fact");
                    };
                }
            },
            "log": {
                title: "log",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self, "log");
                    };
                }
            },
            "ln": {
                title: "ln",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self, "ln");
                    };
                }
            },
            "edegX": {
                title: "e^x",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self, "e^");
                    };
                }
            },         
            "sin": {
                title: "sin",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self, "sin");
                    };
                }
            },
            "cos": {
                title: "cos",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self, "cos");
                    };
                }
            },
            "tan": {
                title: "tan",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self, "tan");
                    };
                }
            },
            "perc": {
                title: "%",
                onClickHandler: function (e) {
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self, "%");
                    }
                }
            },

            //#endregion

            //#region region №4 These are buttons of difficult functions

            "XdegY": {
                title: "x^y",
                onClickHandler: function (e) {
                    var self = this.title;
                    return function () {
                        arithmeticFuncDiff(self, "^");
                    };
                }
            },
            "xSqrtY": {
                title: "y√x",
                onClickHandler: function (e) {
                    var self = this.title;
                    return function() {
                        arithmeticFuncDiff(self, "y√x");
                    }
                }
            },
            "mod": {
                title: "mod",
                onClickHandler: function (e) {
                    var self = this.title;
                    return function () {
                        arithmeticFuncDiff(self, "mod");
                    };
                }
            },

            //#endregion
            
            //#region region №5 These are service functions.

            "MC": {
                title: "MC",
                onClickHandler: function (e) {                    
                    return function () {
                        memory = undefined;
                        getId("M").innerHTML = "0";
                    };
                }
            },
            "MR": {
                title: "MR",
                onClickHandler: function (e) {                    
                    return function () {
                        if (memory != undefined) {
                            getId("screen").innerHTML = triad(memory);
                            binOctHex(memory);
                            signTrue = 0;
                            secondArg = undefined;                            
                        }
                    };
                }
            },
            "Msum": {
                title: "M+",
                onClickHandler: function (e) {                    
                    return function () {
                        if (memory == undefined) {
                            memory = Number(getId("screen").textContent.replace(/\s/g, ""));
                            getId("M").innerHTML = triad(memory);
                        } else {
                            memory = Number(memory) + Number(getId("screen").textContent.replace(/\s/g, ""));
                            getId("M").innerHTML = triad(memory);
                        }
                    };
                }
            },
            "Msub": {
                title: "M-",
                onClickHandler: function (e) {                    
                    return function () {
                        if (memory == undefined) {
                            memory = Number(0) - Number(getId("screen").textContent.replace(/\s/g, ""));
                            getId("M").innerHTML = triad(memory);
                        } else {
                            memory = Number(memory) - Number(getId("screen").textContent.replace(/\s/g, ""));
                            getId("M").innerHTML = triad(memory);
                        }
                    };
                }
            },
            "MS": {
                title: "MS",
                onClickHandler: function (e) {                    
                    return function () {
                        memory = Number(getId("screen").textContent.replace(/\s/g, ""));
                        getId("M").innerHTML = triad(memory);
                    };
                }
            },

            "btn": {
                title: "btn",
                onClickHandler: function (e) {
                    return function () {
                        extendedMode();
                    }
                }
            },
            "hide": {
                title: "hide",
                onClickHandler: function (e) {
                    return function () {
                        hideInfScr();
                    }
                }
            },
            //#endregion
            
        }
               
        // Add a sign to screen of calculator (region №1)
        function addSign(val) {            
            if ((getId("screen").textContent != "0" || val == ".")
                && signTrue == 0 && arguments[1] != "π")
            {
                if (rScrOperation != "") {
                    getId("screen").innerHTML = triad(val);
                    var temp = getId("repeatScreen").textContent;
                    temp = temp.slice(0, temp.length - rScrOperation.length);
                    getId("repeatScreen").innerHTML = temp;
                    rScrOperation = "";
                }
                else {
                    var temp = getId("screen").textContent + val;                    
                    temp = temp.replace(/\s/g, "");                    
                    getId("screen").innerHTML = triad(temp);
                    binOctHex(temp);
                }
            }
            else {
                getId("screen").innerHTML = val;
                binOctHex(val);
                signTrue = 0;
            }
                        
            secondArg = undefined;
        }

        // These are arithmetic operations (region №2)
        function arithmetic(sign) {
            if (signMark == "=") {
                firstArg = undefined;
                firstArgDiff = undefined;
                signActDiff = "";        
                signAct = "";
                signMark = "";
            }

            if (signTrue == 1 && secondArg == undefined && signActDiff == "") {
                funRScreen(signAct, sign);
                signAct = sign;
                return;
            }            
            
            var scr = getId("screen").textContent.replace(/\s/g, "");

            if (firstArg == undefined || secondArg != undefined) {
                if (signActDiff == "") {
                    funRScreenSimple(scr, sign, signAct);
                    
                    firstArg = scr;
                    signAct = sign;
                    signTrue = 1;
                    secondArg = undefined;
                }
                else {
                    if (signTrue != 1) {
                        firstArg = count(firstArgDiff, scr, signActDiff);
                        getId("screen").innerHTML = triad(firstArg);
                        funRScreenSimple(scr, sign, signAct);

                        signAct = sign;
                        signTrue = 1;
                        signActDiff = "";
                        firstArgDiff = undefined;
                    } else {
                        funRScreen(signAct, sign, signActDiff);
                        firstArg = scr;
                        signActDiff = "";
                        firstArgDiff = undefined;
                        signAct = sign;
                    }
                }
            }
            else if ((signAct != "" && signActDiff == "") || (signTrue == 1 && signActDiff != "")) {
                if (signTrue == 1 && signActDiff != "") {
                    funRScreen(signAct, sign, signActDiff);
                } else {
                    funRScreenSimple(scr, sign, signAct);
                }                

                firstArg = count(firstArg, scr, signAct);
                getId("screen").innerHTML = triad(firstArg);
                signAct = sign;
                signTrue = 1;
                signActDiff = "";
                firstArgDiff = undefined;                
            }
            else if (signActDiff != "") {
                firstArgDiff = count(firstArgDiff, scr, signActDiff);
                funRScreenSimple(scr, sign, signAct);

                firstArg = count(firstArg, firstArgDiff, signAct);
                getId("screen").innerHTML = triad(firstArg);
                firstArgDiff = undefined;
                signActDiff = "";
                signAct = sign;                
                signTrue = 1;
            }
                        
            binOctHex(getId("screen").textContent.replace(/\s/g, ""));
        }

        // These are arithmetic functions (region №3)
        function arithmeticFunc(func, signScr) {
            var src = getId("screen").textContent.replace(/\s/g, "");
            var result = count(src, firstArg, func);                   
            getId("screen").innerHTML = triad(result);
            signTrue = 0;

            funRScreenArith(signScr, src);
            binOctHex(result);
        }

        // These are difficult arithmetic functions (region №4 x^y, mod, y√x)
        function arithmeticFuncDiff(sign, signScr) {
            if (signMark == "=") {
                firstArg = undefined;
                firstArgDiff = undefined;
                signAct = "";
                signActDiff = "";                
                signMark = "";
            }

            var scr = getId("screen").textContent.replace(/\s/g, "");
            if (signActDiff == "" || (signTrue == 1 && secondArg == undefined)) {
                firstArgDiff = scr                
                if (signActDiff == "" && signTrue != 1) {
                    funRScreenSimple(firstArgDiff, signScr, signAct);
                }
                else if (signActDiff == "" && signTrue == 1) {
                    funRScreenDiff(firstArgDiff, signScr, signAct);
                    firstArg = 0;
                }                
                signActDiff = sign;                
                signTrue = 1;
            }
            else if (signActDiff != "") {
                funRScreenSimple(scr, signScr, "");

                firstArgDiff = count(firstArgDiff, scr, signActDiff);
                getId("screen").innerHTML = triad(firstArgDiff);
                signActDiff = sign;
                signTrue = 1;
            }

            binOctHex(getId("screen").textContent.replace(/\s/g, ""));
        }
        
        function count(x, y, sign) {
            switch (sign) {
                case "+": {
                    return cleanUp(Number(x) + Number(y));                    
                }
                case "-": {
                    return cleanUp(Number(x) - Number(y));
                }
                case "*": {
                    return cleanUp(Number(x) * Number(y));
                }
                case "÷": {
                    if (y != 0) {
                        return cleanUp(Number(x) / Number(y)); 
                    } else {                        
                        return undefined;
                    }
                }
                case "x^2": {                    
                    return Number(myCleanUp(Number(x) * Number(x)));
                }
                case "x^3": {
                    return cleanUp(Number(x) * Number(x) * Number(x));
                }
                case "x^y": {
                    return cleanUp(Math.pow(x, y));
                }
                case "√": {
                    return Math.sqrt(Number(x));
                }
                case "10^x": {
                    return Math.pow(10, x); 
                }
                case "1/x": {
                    if (x != 0) {
                        return cleanUp(1 / Number(x));
                    } else {
                        return undefined;
                    }
                }
                case "n!": {
                    return cleanUp(factorial(Number(x)));
                }
                case "log": {
                    return cleanUp(Math.log10(x));
                }
                case "ln": {
                    return cleanUp(Math.log(x));
                }
                case "e^x": {
                    return cleanUp(Math.exp(x));
                }                
                case "sin": {
                    return trigonSin(x);
                }
                case "cos": {
                    return trigonCos(x);
                }
                case "tan": {
                    return trigonTan(x);
                }
                case "y√x": {
                    if (x < 0 && x % 2 == 1) {
                        return -Math.pow(-x, 1 / y);
                    }
                    else {
                        return Math.pow(x, 1 / y);
                    }
                }
                case "mod": {
                    return x % y;
                }
                case "%": {
                    if (y == undefined) {
                        y = x;
                        firstArg = x;
                    }
                    return y * x / 100;
                }
            }
        }
        
        // #region n!        
        function factorial(n) {            
            if (n % 1 == 0 && n < 0) {
                return n;
            }
            else {
                return gamma(n + 1);
            }            
        }

        // Gamma function (exact calculation)
        var g = 7;
        var C = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];

        function gamma(z) {
            if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
            else {
                z -= 1;

                var x = C[0];
                for (var i = 1; i < g + 2; i++)
                    x += C[i] / (z + i);

                var t = z + g + 0.5;
                return Math.sqrt(2 * Math.PI) * Math.pow(t, (z + 0.5)) * Math.exp(-t) * x;
            }
        }

        /* These other variants
        
        // Approximate calculation
        function gamma2(z) {
            return Math.sqrt(2 * Math.PI / z) * Math.pow((1 / Math.E) * (z + 1 / (12 * z - 1 / (10 * z))), z);
        }

        // This function counts whole numbers only.
        function factWholeNumber(n) {
            if ((n > 0) && (n % 1 == 0)) {
                var res = 1;
                for (var i = 2; i <= n; i++) {
                    res = res * i;
                }
                return res;
            }
            else if (n == 0) {
                return 1;
            }
            else {
                return n;
            }
        }
        */

        //#endregion

        //#region sin, cos, tan

        function trigonSin(x) {
            if (x % 180 == 0) {
                return 0;
            }
            return Math.sin(Math.PI / 180 * x);
        }

        function trigonCos(x) {
            if ((x - 90) % 180 == 0) {
                return 0;
            }
            return Math.cos(Math.PI / 180 * x);
        }

        function trigonTan(x) {
            if (x % 180 == 0) {
                return 0;
            } else if ((x - 90) % 180 == 0) {
                return x;
            }
            return Math.tan(Math.PI / 180 * x);
        }

        //#endregion
        
        //#region These functions add operations to the second screen.
        
        function funRScreenSimple(val, sign, signPrev) {
            if (val[val.length - 1] == ".") {
                val = val.slice(0, val.length - 1);
            }            
            
            if (rScrOperation != "") {
                val = "";
                rScrOperation = "";
            }

            if ((sign == "*" || sign == "÷") && (signPrev == "+" || signPrev == "-")) {
                var temp = "(" + getId("repeatScreen").textContent + val +")" +  sign;
                getId("repeatScreen").innerHTML = temp;
                signPrevScr = ")";
            }
            else {
                getId("repeatScreen").innerHTML += val + sign;
                signPrevScr = signPrev;
            }
        }

        function funRScreen(symbol, change) {
            var count = 1;
            if (arguments[2] != undefined && arguments[2] != "x^y") {
                count = 3;                
            }
            
            if ((signPrevScr == "+" || signPrevScr == "-") && (change == "*" || change == "÷")) {
                var temp = getId("repeatScreen").textContent;
                if (temp[temp.length - 2] != ")") {
                    temp = "(" + temp.slice(0, temp.length - count) + ")" + change;
                } else {
                    temp = temp.slice(0, temp.length - count) + change;
                }
                getId("repeatScreen").innerHTML = temp;
                signPrevScr = ")";
            }
            else
                if (signPrevScr == ")" && (symbol == "*" || symbol == "÷") && (change == "+" || change == "-")) {
                    var temp = getId("repeatScreen").textContent;
                    temp = temp.slice(1, temp.length - count - 1) + change;
                    getId("repeatScreen").innerHTML = temp;
                }
                else
                    if ((symbol == "+" || symbol == "-") && (change == "*" || change == "÷") && signPrevScr == ")") {
                        var temp = getId("repeatScreen").textContent;
                        if (temp[temp.length - 2] != ")") {
                            temp = "(" + temp.slice(0, temp.length - count) + ")" + change;
                        } else {
                            temp = temp.slice(0, temp.length - count) + change;
                        }
                        getId("repeatScreen").innerHTML = temp;
                    }
                    else {
                        var temp = getId("repeatScreen").textContent;
                        temp = temp.slice(0, temp.length - count) + change;
                        getId("repeatScreen").innerHTML = temp;
                    }
        }
        
        function funRScreenDiff(val, change, signPrev) {
            var temp = getId("repeatScreen").textContent;
            if (temp[temp.length - 2] != ")") {
                temp = "(" + temp.slice(0, temp.length - 1) + ")" + change;
            } else {
                temp = temp.slice(0, temp.length - 1) + change;
            }
            getId("repeatScreen").innerHTML = temp;
        }

        function funRScreenArith(symbol, x) {
            if (x[x.length - 1] == ".") {
                x = x.slice(0, x.length - 1);
            }
            
            if (symbol == "%") {
                if (rScrOperation == "") {
                    getId("repeatScreen").innerHTML += x + symbol + "(" + firstArg + ")";
                    rScrOperation = x + symbol + "(" + firstArg + ")";
                }
                else {
                    var temp = getId("repeatScreen").textContent;
                    temp = temp.slice(0, temp.length - rScrOperation.length);
                    getId("repeatScreen").innerHTML = temp + x + symbol + "(" + firstArg + ")";
                    rScrOperation = x + symbol + "(" + firstArg + ")";
                }
                return;
            }            

            if (rScrOperation == "") {
                getId("repeatScreen").innerHTML += symbol + "(" + x + ")";
                rScrOperation = symbol + "(" + x + ")";
            }
            else {
                var temp = getId("repeatScreen").textContent;
                temp = temp.slice(0, temp.length - rScrOperation.length);
                getId("repeatScreen").innerHTML = temp + symbol + "(" + rScrOperation + ")";
                rScrOperation = symbol + "(" + rScrOperation + ")";
            }
        }        

        //#endregion

        //#region These are auxiliary functions 
        
        // This function divides number to triad 
        function triad(val) {            
            var part = "";
            var k = 3;            
            var minus = "";
            val = val.toString();
            if (val[0] == "-") {
                val = val.slice(1, val.length);
                minus = "-";
            }
            if (val.indexOf(".") > 0) {
                part = val.slice(val.indexOf("."), val.length);
                val = val.slice(0, val.indexOf("."));
            }
            
            if (arguments[1] == "4") {
                k = 4;
            }
            
            var count = val.length;
            var index = 0;
            for (var i = count - 1; i > 0; i--) {
                index++;
                if (index % k == 0) {
                    var temp = val.slice(0, i) + " " + val.slice(i, val.length);
                    val = temp;
                }                
            }            
            return minus + val + part;
        }

        // Extended mode
        function extendedMode() {            
            var btn = getId("btn");            
            if (btn.className == "extended") {
                btn.className = "notExtended";
                btn.style.width = "168px";
                btn.innerHTML = "Extended";
                
                getId("screen").style.width = "223px";
                getId("repeatScreen").style.width = "223px";
                getId("moveDiv").style.width = "223px";
                getId("mod").style.display = "none";
                var info = getId("info");
                info.style.height = "0";
                info.style.width = "0";
                info.style.border = "none";
                var hide = getId("hide");
                hide.style.height = "0";
                hide.style.widows = "0";
                hide.style.border = "none";

                var list = document.getElementsByClassName("extended-mode");
                for (var i = 0; i < list.length; i++) {
                    list[i].style.display = "none";
                }
            }
            else {
                btn.className = "extended";
                btn.style.width = "345px";
                btn.innerHTML = "Simply";
                
                getId("moveDiv").style.width = "458px";
                getId("mod").style.display = "block";
                var info = getId("info");
                info.style.height = "122px";
                info.style.width = "222px";
                info.style.border = "2px solid #927e14";
                var hide = getId("hide");
                hide.style.height = "25px";
                hide.style.width = "25px";
                hide.style.border = "2px solid #927e14";
                hide.innerHTML = ">>";
                if (hide.className[hide.className.length - 1] == "|") {
                    hide.className = hide.className.slice(0, hide.className.length - 2);
                }

                var list = document.getElementsByClassName("extended-mode");
                for (var i = 0; i < list.length; i++) {
                    list[i].style.display = "block";
                }
            }
        }

        // This function hides the info screen.
        function hideInfScr() {            
            var hide = getId("hide");
            if (hide.className[hide.className.length - 1] != "|") {                
                getId("info").style.width = "103px";
                getId("screen").style.width = "342px";
                getId("repeatScreen").style.width = "342px";
                hide.innerHTML = "<<";
                hide.className = hide.className + " |";
            }
            else {
                getId("info").style.width = "222px";
                getId("screen").style.width = "223px";
                getId("repeatScreen").style.width = "223px";
                hide.innerHTML = ">>";
                hide.className = hide.className.slice(0, hide.className.length - 2);
            }            
        }

        // Add a data to fields Bin Oct Hex.
        function binOctHex(val) {
            let numDec = Number(val);
            getId("Bin").innerHTML = triad(+(numDec).toString(2), "4");
            getId("Oct").innerHTML = triad(+(numDec).toString(8));
            getId("Hex").innerHTML = triad(numDec.toString(16));
        }       
 
        var getId = function (id) {
            return document.getElementById(id);
        }

        // This is binding handlers to buttons.
        for (var key in buttons) {
            document.querySelector("#" + key).onclick = buttons[key].onClickHandler();
        }
        
        // This is function for correcting existing problems with floating point.
        function cleanUp(number) {            
            return parseFloat((parseFloat(number).toPrecision(16)));
        }
        
        function myCleanUp(number) {
            var temp = number.toString();
            if (temp.indexOf(".") > 0) {
                var num = temp.slice(0, temp.indexOf("."));
                temp = temp.slice(temp.indexOf("."), temp.length);
                var index = temp.search(/0{8,}/);
                if (index != -1) {
                    return num;
                }
                index = temp.search(/9{8,}/);
                if (index != -1) {                    
                    return Number(num) + Number(1);
                }
            }
            return number;
        }

        //#endregion

        //#region Move the Calculator

        getId("moveCalc").onmousedown = function (e) {
            var self = this;
            getId("moveDiv").onmousedown = function (e) {
                moveCalc(self, e);
            }            
        }

        function moveCalc(elem, event) {
            var startX = event.clientX;
            var startY = event.clientY;

            var elemX = elem.offsetLeft;
            var elemY = elem.offsetTop;

            var deltaX = startX - elemX;
            var deltaY = startY - elemY;

            document.addEventListener("mousemove", moveHandler, true);
            document.addEventListener("mouseup", upHandler, true);

            function moveHandler(e) {
                if (!e) e = window.event;
                
                elem.style.left = (e.clientX - deltaX) + "px";                
                elem.style.top = (e.clientY - deltaY) + "px";
            }

            function upHandler(e) {
                if (!e) e = window.event;

                document.removeEventListener("mouseup", upHandler, true);
                document.removeEventListener("mousemove", moveHandler, true);
            }
        }

        //#endregion
    }
})();