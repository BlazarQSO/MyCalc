(function () {
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
        var screen = document.getElementById("screen");
        var repeatScreen = document.getElementById("repeatScreen");

        function attachArithmetic (e) {              
            return () => arithmetic(this.title);
        }
        function attachSign (e) {            
                return () =>  addSign(this.value)                
        }
        function buildAttachArithmeticFunc(operation) {
            return function (e) {
                return () => arithmeticFunc(this.title, operation);
            }
        }
        function buildAttachArithmeticFuncDiff(operation) {
            return function (e) {
                return () => arithmeticFunc(this.title, operation);
            }
        }
        
        // This is Array of objects buttons
        var buttons = {

            "result": {
                title: "=",
                onClickHandler: function(e) {
                    return function() {
                        if ((firstArg != undefined && signAct != "") || firstArgDiff != undefined) {
                            if (secondArg == undefined) {
                                secondArg = screen.textContent.replace(/\s/g, "");;
                            }

                            if (signActDiff == "") {
                                firstArg = count(firstArg, secondArg, signAct)
                                screen.innerHTML = triad(firstArg);
                                binOctHex(firstArg);
                                signTrue = 1;
                                signMark = "=";
                            }
                            else {
                                if (firstArg != undefined && signAct != "") {
                                    secondArg = count(firstArgDiff, screen.textContent.replace(/\s/g, ""), signActDiff);
                                    firstArg = count(firstArg, secondArg, signAct);
                                    screen.innerHTML = triad(firstArg);
                                    binOctHex(firstArg);
                                    firstArgDiff = undefined;
                                    signActDiff = "";
                                    signTrue = 1;
                                    signMark = "=";
                                }
                                else {
                                    firstArgDiff = count(firstArgDiff, secondArg, signActDiff)
                                    screen.innerHTML = triad(firstArgDiff);
                                    binOctHex(firstArgDiff);
                                    signTrue = 1;
                                    signMark = "=";
                                }
                            }
                        }
                        repeatScreen.innerHTML = "";
                        signPrevScr = "";
                        rScrOperation = "";
                    };
                }
            },

            //#region region №1 These Buttons only add or remove a value on the calculator screen.

            "b1": {
                title: "1",
                value: 1,
                onClickHandler: attachSign
            },
            "b2": {
                title: "2",
                value: 2,
                onClickHandler: attachSign
            },
            "b3": {
                title: "3",
                value: 3,
                onClickHandler: attachSign
            },
            "b4": {
                title: "4",
                value: 4,
                onClickHandler: attachSign
            },
            "b5": {
                title: "5",
                value: 5,
                onClickHandler: attachSign
            },
            "b6": {
                title: "6",
                value: 6,
                onClickHandler: attachSign
            },
            "b7": {
                title: "7",
                value: 7,
                onClickHandler: attachSign
            },
            "b8": {
                title: "8",
                value: 8,
                onClickHandler: attachSign
            },
            "b9": {
                title: "9",
                value: 9,
                onClickHandler: attachSign
            },
            "b0": {
                title: "0",
                value: 0,
                onClickHandler: attachSign
            },
            "dot": {
                title: ".",
                onClickHandler: function (e) {
                    var self = this.title
                    return function () {
                        if (!screen.textContent.includes(".")) {
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

                            var val = screen.textContent;
                            val = val.replace(/\s/g, "");
                            val = val.slice(0, val.length - 1);
                            if (val != "") {
                                screen.innerHTML = triad(val);
                            } else {
                                screen.innerHTML = "0";
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
                        screen.innerHTML = "0";
                        repeatScreen.innerHTML = "";
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
                        hideBtn("C");
                        binOctHex(0);
                    };
                }
            },
            "bPi": {
                title: "Pi",
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
                onClickHandler: attachArithmetic
            },
            "sub": {
                title: "-",
                onClickHandler: attachArithmetic
            },
            "mult": {
                title: "*",
                onClickHandler: attachArithmetic
            },
            "div": {
                title: "÷",
                onClickHandler: attachArithmetic
            },

            //#endregion

            //#region region №3 These are buttons of functions.                      

            "Xdeg2": {
                title: "x^2",
                onClickHandler: buildAttachArithmeticFunc("sqr")
            },
            "Xdeg3": {
                title: "x^3",
                onClickHandler: buildAttachArithmeticFunc("cube")
            },
            "sqrt": {
                title: "√",
                onClickHandler: buildAttachArithmeticFunc("√")
            },
            "b10degX": {
                title: "10^x",
                onClickHandler: buildAttachArithmeticFunc("10^")
            },
            "b1divX": {
                title: "1/x",
                onClickHandler: buildAttachArithmeticFunc("1/")
            },
            "nfactr": {
                title: "n!",
                onClickHandler: buildAttachArithmeticFunc("fact")
            },
            "log": {
                title: "log",
                onClickHandler: buildAttachArithmeticFunc("log")
            },
            "ln": {
                title: "ln",
                onClickHandler: buildAttachArithmeticFunc("ln")
            },
            "edegX": {
                title: "e^x",
                onClickHandler: buildAttachArithmeticFunc("e^")
            },
            "sin": {
                title: "sin",
                onClickHandler: buildAttachArithmeticFunc("sin")
            },
            "cos": {
                title: "cos",
                onClickHandler: buildAttachArithmeticFunc("cos")
            },
            "tan": {
                title: "tan",
                onClickHandler:buildAttachArithmeticFunc("tan")
            },
            "perc": {
                title: "%",
                onClickHandler: buildAttachArithmeticFunc("%")
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
                    return function () {
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
                            screen.innerHTML = triad(memory);
                            binOctHex(memory);
                            if (rScrOperation != "") {
                                var temp = repeatScreen.textContent;
                                temp = temp.slice(0, temp.length - rScrOperation.length);
                                repeatScreen.innerHTML = temp;
                                rScrOperation = "";
                            }
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
                            memory = Number(screen.textContent.replace(/\s/g, ""));
                            getId("M").innerHTML = triad(memory);
                        } else {
                            memory = cleanUp(Number(memory) + Number(screen.textContent.replace(/\s/g, "")));
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
                            memory = cleanUp(Number(0) - Number(screen.textContent.replace(/\s/g, "")));
                            getId("M").innerHTML = triad(memory);
                        } else {
                            memory = cleanUp(Number(memory) - Number(screen.textContent.replace(/\s/g, "")));
                            getId("M").innerHTML = triad(memory);
                        }
                    };
                }
            },
            "MS": {
                title: "MS",
                onClickHandler: function (e) {
                    return function () {
                        memory = Number(screen.textContent.replace(/\s/g, ""));
                        getId("M").innerHTML = triad(memory);
                    };
                }
            },
            "btn": {
                title: "btn",
                onClickHandler: function (e) {
                    return () => extendedMode();
                }
            },
            "hide": {
                title: "hide",
                onClickHandler: function (e) {
                    return () => hideInfScr();
                }
            },
            //#endregion
        }

        // Add a sign to screen of calculator (region №1)
        function addSign(val) {
            var temp = screen.textContent.replace(/\s/g, "");
            secondArg = undefined;
            
            if (rScrOperation != "") {
                var t = repeatScreen.textContent;
                t = t.slice(0, t.length - rScrOperation.length);
                repeatScreen.innerHTML = t;
                rScrOperation = "";

                if (val != ".") {
                    screen.innerHTML = val;
                    binOctHex(triad(val));
                } else {
                    screen.innerHTML = "0.";
                    binOctHex(0);
                }
                
                signTrue = 0;
                return;
            }

            if ((temp == "0" || signTrue == 1) && val == ".") {
                screen.innerHTML = "0.";
                signTrue = 0;
                
                binOctHex(0);
                return;
            }

            if (arguments[1] == "Pi") {
                if (rScrOperation != "") {
                    temp = temp.slice(0, temp.length - rScrOperation.length);
                    repeatScreen.innerHTML = temp;
                    rScrOperation = "";
                }
                screen.innerHTML = val;
                binOctHex(val);
                signTrue = 0;

                return;
            }

            if (temp != "0" && signTrue == 0) {
                temp = temp + val;
                temp = temp.replace(/\s/g, "");
                screen.innerHTML = triad(temp);
            } else {                
                screen.innerHTML = val;
            }
            signTrue = 0;
            temp = screen.textContent.replace(/\s/g, "");
            binOctHex(screen.textContent.replace(/\s/g, ""));
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
                     
            var scr = screen.textContent.replace(/\s/g, "");
            
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
                        screen.innerHTML = triad(firstArg);
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
            else
                if ((signAct != "" && signActDiff == "") || (signTrue == 1 && signActDiff != "")) {
                    if (signTrue == 1 && signActDiff != "") {
                        if (signAct == "-") {
                            signAct = "+";
                        }
                        funRScreen(signAct, sign, signActDiff);
                    } else {
                        funRScreenSimple(scr, sign, signAct);
                    }
                    firstArg = count(firstArg, scr, signAct);
                    screen.innerHTML = triad(firstArg);

                    signAct = sign;
                    signTrue = 1;
                    signActDiff = "";
                    firstArgDiff = undefined;
                }
                else
                    if (signActDiff != "") {                        
                        if (signActDiff == "mod" && (signAct == "*" || signAct == "÷")) {
                            firstArg = count(firstArg, firstArgDiff, signAct);  
                            firstArg = count(firstArg, scr, signActDiff);                           
                        }
                        else {
                            firstArgDiff = count(firstArgDiff, scr, signActDiff);
                            firstArg = count(firstArg, firstArgDiff, signAct);                            
                        }

                        funRScreenSimple(scr, sign, signAct);
                        screen.innerHTML = triad(firstArg);

                        firstArgDiff = undefined;
                        signActDiff = "";
                        signAct = sign;
                        signTrue = 1;
                    }
                    else {
                        funRScreenSimple(scr, sign, signAct);
                        firstArg = screen.textContent.replace(/\s/g, "");
                        signAct = sign;
                        signTrue = 1;
                        rScrOperation = "";
                    }

            binOctHex(screen.textContent.replace(/\s/g, ""));
        }

        // These are arithmetic functions (region №3)
        function arithmeticFunc(func, signScr) {
            var src = screen.textContent.replace(/\s/g, "");
            var result = count(src, firstArg, func);
            screen.innerHTML = triad(result);
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

            var scr = screen.textContent.replace(/\s/g, "");
            if (signActDiff == "" || (signTrue == 1 && secondArg == undefined)) {

                firstArgDiff = scr
                
                if (signActDiff == "" && signTrue != 1) {
                    funRScreenSimple(firstArgDiff, signScr, signAct);
                }
                else if (signActDiff == "" && signTrue == 1) {
                    funRScreenDiff(firstArgDiff, signScr, signAct);
                    firstArg = 0;
                    signAct = "+";                    
                } else if (signActDiff != "" && signTrue == 1) {
                    funRScreenDiff("", signScr, signScr);                    
                }

                if (sign == "mod" && (signAct == "*" || signAct == "÷")) {                  
                    var temp = repeatScreen.textContent;
                    temp = temp.slice(0, temp.length - sign.length);
                    temp = "(" + temp + ")" + sign;
                    repeatScreen.innerHTML = temp;
                }          

                signActDiff = sign;
                signTrue = 1;
            }
            else if (signActDiff != "") {
                if (signTrue != 1) {
                    funRScreenSimple(scr, signScr, signAct);
                } else {
                    funRScreenDiff("", signScr, signScr)
                }

                firstArgDiff = count(firstArgDiff, scr, signActDiff);
                screen.innerHTML = triad(firstArgDiff);
                signActDiff = sign;
                signTrue = 1;
            }

            binOctHex(screen.textContent.replace(/\s/g, ""));
        }

        function count(x, y, sign) {
            switch (sign) {
                case "+": {
                    return Number(x) + Number(y);
                }
                case "-": {
                    return Number(x) - Number(y);
                }
                case "*": {
                    return myCleanUp(Number(x) * Number(y));
                }
                case "÷": {
                    if (y != 0) {
                        return myCleanUp(Number(x) / Number(y));
                    } else {
                        hideBtn();
                        return undefined;
                    }
                }
                case "x^2": {
                    return Number(myCleanUp(Number(x) * Number(x)));
                }
                case "x^3": {
                    return myCleanUp(Number(x) * Number(x) * Number(x));
                }
                case "x^y": {
                    return myCleanUp(Math.pow(x, y));
                }
                case "√": {
                    if (x > 0) {
                        return myCleanUp(Math.sqrt(Number(x))); 
                    } else {
                        hideBtn();
                        return undefined;
                    }                    
                }
                case "10^x": {
                    return myCleanUp(Math.pow(10, x));
                }
                case "1/x": {
                    if (x != 0) {
                        return myCleanUp(1 / Number(x));
                    } else {
                        hideBtn();
                        return undefined;
                    }
                }
                case "n!": {
                    return myCleanUp(factorial(Number(x)));
                }
                case "log": {
                    if (x != 0) {
                        return myCleanUp(Math.log10(x));
                    } else {
                        hideBtn();
                        return undefined;
                    }
                }
                case "ln": {
                    if (x != 0) {
                        return myCleanUp(Math.log(x));
                    } else {
                        hideBtn();
                        return undefined;
                    }
                }
                case "e^x": {
                    return myCleanUp(Math.exp(x));
                }
                case "sin": {
                    return trigonSin(x);
                }
                case "cos": {
                    return trigonCos(x);
                }
                case "tan": {
                    return myCleanUp(trigonTan(x));
                }
                case "y√x": {
                    if (x < 0 && x % 2 == 1) {
                        return myCleanUp(- Math.pow(-x, 1 / y));
                    }
                    else {
                        return myCleanUp(Math.pow(x, 1 / y));
                    }
                }
                case "mod": {
                    return myCleanUp(x % y);
                }
                case "%": {
                    if (y == undefined) {
                        y = x;
                        firstArg = x;
                    }
                    return myCleanUp(y * x / 100);
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
                var temp = "(" + repeatScreen.textContent + val + ")" + sign;
                repeatScreen.innerHTML = temp;
                signPrevScr = ")";
            }
            else {
                repeatScreen.innerHTML += val + sign;
                signPrevScr = signPrev;
            }
        }

        function funRScreen(symbol, change) {
            var count = 1;
            if (arguments[2] != undefined && arguments[2] != "x^y") {
                count = 3;
            }
            
            var temp = repeatScreen.textContent;
            if (signTrue == 1 && signActDiff != "" && temp[temp.length - count - 1] == ")") {
                if (change == "*" || change == "÷") {
                    temp = temp.slice(0, temp.length - count) + change;
                    repeatScreen.innerHTML = temp;            
                } else {
                    temp = temp.slice(1, temp.length - count - 1) + change;
                    repeatScreen.innerHTML = temp;                    
                }
                return;
            } else if (signTrue == 1 && signActDiff != "") {
                if (change == "*" || change == "÷") {
                    temp = "(" + temp.slice(0, temp.length - count) + ")" + change;
                    repeatScreen.innerHTML = temp;                    
                } else {
                    temp = temp.slice(0, temp.length - count) + change;
                    repeatScreen.innerHTML = temp;                    
                }
                return;
            }

            if ((signPrevScr == "+" || signPrevScr == "-") && (change == "*" || change == "÷")) {
                if (temp[temp.length - 2] != ")") {
                    temp = "(" + temp.slice(0, temp.length - count) + ")" + change;
                } else {
                    temp = temp.slice(0, temp.length - count) + change;
                }
                repeatScreen.innerHTML = temp;
                signPrevScr = ")";                
            }
            else
                if (signPrevScr == ")" && (symbol == "*" || symbol == "÷") && (change == "+" || change == "-")) {
                    temp = temp.slice(1, temp.length - count - 1) + change;
                    repeatScreen.innerHTML = temp;                    
                }
                else
                    if ((symbol == "+" || symbol == "-") && (change == "*" || change == "÷") && signPrevScr == ")") {
                        if (temp[temp.length - 2] != ")") {
                            temp = "(" + temp.slice(0, temp.length - count) + ")" + change;
                        } else {
                            temp = temp.slice(0, temp.length - count) + change;
                        }
                        repeatScreen.innerHTML = temp;
                    }
                    else {
                        if ((change == "+" || change == "-") && (symbol == "*" || symbol == "÷")
                            && temp[temp.length - 2] != "}" && temp[temp.length - 2] == ")") {
                            temp = temp.slice(1, temp.length - count - 1) + change;                            
                            repeatScreen.innerHTML = temp;                            
                        }
                        else {
                            temp = temp.slice(0, temp.length - count) + change;
                            repeatScreen.innerHTML = temp;
                        }
                    }
        }

        function funRScreenDiff(val, change, signPrev) {
            var temp = repeatScreen.textContent;
            var count = 1;
            if (signActDiff == "mod" || signActDiff == "y√x") {
                count = 3;
            }

            if (signActDiff == "") {
                if (temp[temp.length - 2] != ")" && temp != "") {
                    temp = "(" + temp.slice(0, temp.length - 1) + ")" + change;
                } else if (temp != "") {
                    temp = temp.slice(0, temp.length - 1) + change;
                } else if (temp == "") {
                    temp = screen.textContent + change;
                }
            } else {
                temp = temp.slice(0, temp.length - count) + change;
            }
            repeatScreen.innerHTML = temp;
        }

        function funRScreenArith(symbol, x) {
            if (x[x.length - 1] == ".") {
                x = x.slice(0, x.length - 1);
            }

            if (symbol == "%") {
                if (rScrOperation == "") {
                    repeatScreen.innerHTML += x + symbol + "{" + firstArg + "}";
                    rScrOperation = x + symbol + "{" + firstArg + "}";
                }
                else {
                    var temp = repeatScreen.textContent;
                    temp = temp.slice(0, temp.length - rScrOperation.length);
                    repeatScreen.innerHTML = temp + x + symbol + "{" + firstArg + "}";
                    rScrOperation = x + symbol + "{" + firstArg + "}";
                }
                return;
            }

            if (rScrOperation == "") {
                repeatScreen.innerHTML += symbol + "{" + x + "}";
                rScrOperation = symbol + "{" + x + "}";
            }
            else {
                var temp = repeatScreen.textContent;
                temp = temp.slice(0, temp.length - rScrOperation.length);
                repeatScreen.innerHTML = temp + symbol + "{" + rScrOperation + "}";
                rScrOperation = symbol + "{" + rScrOperation + "}";
            }
        }

        //#endregion

        //#region These are auxiliary functions 

        // This function divides number to triad 
        function triad(val) {
            if (val == undefined || val == Infinity || val == -Infinity) {
                return val;
            }
            else {
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
        }

        // Extended mode
        function extendedMode() {
            var btn = getId("btn");
            if (btn.className == "extended") {
                btn.className = "notExtended";
                btn.style.width = "168px";
                btn.innerHTML = "Extended";

                screen.style.width = "223px";
                repeatScreen.style.width = "223px";
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
                screen.style.width = "342px";
                repeatScreen.style.width = "342px";
                hide.innerHTML = "<<";
                hide.className = hide.className + " |";
            }
            else {
                getId("info").style.width = "222px";
                screen.style.width = "223px";
                repeatScreen.style.width = "223px";
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

        // This function hides buttons when incorrect data.
        function hideBtn(val) {
            if (val != "C") {
                for (var key in buttons) {
                    if (key != "C") {
                        document.getElementById(key).disabled = true;                        
                    }
                }
                document.getElementById("C").style.border = "3px solid red";
            } else {
                for (var key in buttons) {                 
                        document.getElementById(key).disabled = false;                                                
                }
                document.getElementById("C").style.border = "2px solid #927e14";
            }
        }

        // This is function for correcting existing problems with floating point.
        function cleanUp(number) {
            return parseFloat((parseFloat(number).toPrecision(14)));
        }

        function myCleanUp(number) {
            var temp = number.toString();
            var indexPoint = temp.indexOf(".");

            if (indexPoint > 0) {
                var num = temp.slice(0, indexPoint);
                temp = temp.slice(indexPoint, temp.length);
                
                var indexCut = temp.search(/0{8,}/);                
                if (indexCut != -1) {
                    temp = "0" + temp.slice(0, indexCut);
                    
                    return cleanUp(Number(num) + Number(temp));
                }
                indexCut = temp.search(/9{8,}/);
                if (indexCut != -1) {
                    temp = "0" + temp.slice(0, indexCut);
                    if (indexCut >= 2) {
                        return cleanUp(Number(num) + Number(temp) + 1 / Math.pow(10, indexCut - 1));
                    }
                    else {
                        return cleanUp(Number(num) + Number(temp));
                    }
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