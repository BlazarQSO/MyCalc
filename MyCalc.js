﻿(function () {
    window.onload = function () {
        
        var firstArg = undefined;   // First argument of arithetic operation.
        var secondArg = undefined;  // Second argument of arithetic operation.
        var data_screen;             
        var sign = "";              // This argument contains a sign of an arithmetic operation.
        var signAct = "";           // This argument contains an arithmetic action.
        var signTrue = 0;           // An arithmetic operation has been pushed or not.

        // This is Array of objects buttons
        var buttons = {

            "result": {
                title: "=",                
                onClickHandler: function (e) {                    
                    return function () {
                        if (firstArg != undefined && signAct != "") {
                            if (secondArg == undefined) {
                                secondArg = getId("screen").textContent;
                            } 
                            
                            firstArg = count(firstArg, secondArg, signAct)
                            getId("screen").innerHTML = firstArg;                            
                            signTrue = 1;                            
                        }
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
                        if (signTrue == 0) {
                            var val = getId("screen").textContent;
                            val = val.slice(0, val.length - 1);
                            if (val != "") {
                                getId("screen").innerHTML = val;
                            } else {
                                getId("screen").innerHTML = "0";
                            }
                        }
                    };
                }
            },
            "C": {
                title: "C",                
                onClickHandler: function (e) {                    
                    return function () {
                        getId("screen").innerHTML = "0";
                        firstArg = undefined;
                        secondArg = undefined;
                        sign = "";
                        signAct = "";                           
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
                title: "/",                
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
                        arithmeticFunc(self);
                    };
                }
            },
            "Xdeg3": {
                title: "x^3",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self);
                    };
                }
            },
            
            "XdegY": {
                title: "x^y",
                onClickHandler: function (e) {                   
                    var self = this.title;
                    return function () {
                        arithmeticFuncDiff(self);
                    };
                }
            },
            
            "√": {
                title: "√",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self);
                    };
                }
            },
            "b10degX": {
                title: "10^x",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self);
                    };
                }
            },
            "b1divX": {
                title: "1/x",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self);
                    };
                }
            },            
            "nfactr": {
                title: "n!",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self);
                    };
                }
            },
            "log": {
                title: "log",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self);
                    };
                }
            },
            "ln": {
                title: "ln",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self);
                    };
                }
            },
            "edegX": {
                title: "e^x",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self);
                    };
                }
            },
            "mod": {
                title: "mod",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self);
                    };
                }
            },
            "sin": {
                title: "sin",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self);
                    };
                }
            },
            "cos": {
                title: "cos",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self);
                    };
                }
            },
            "tan": {
                title: "tan",
                onClickHandler: function (e) {                    
                    var self = this.title;
                    return function () {
                        arithmeticFunc(self);
                    };
                }
            },

            //#endregion
            
            //#region region №4 These are service functions.

            "MC": {
                title: "MC",
                onClickHandler: function (e) {                    
                    return function () {

                    };
                }
            },
            "MR": {
                title: "MR",
                onClickHandler: function (e) {                    
                    return function () {

                    };
                }
            },
            "Msum": {
                title: "M+",
                onClickHandler: function (e) {                    
                    return function () {

                    };
                }
            },
            "Msub": {
                title: "M-",
                onClickHandler: function (e) {                    
                    return function () {

                    };
                }
            },
            "MS": {
                title: "MS",
                onClickHandler: function (e) {                    
                    return function () {

                    };
                }
            },

            //#endregion
            
        }
               
        // Add a sign to screen of calculator (region №1)
        function addSign(val) {            
            if ((getId("screen").textContent != "0" || val == ".")
                && signTrue == 0 && arguments[1] != "π")
            {
                document.getElementById("screen").innerHTML += val;
            } else {
                document.getElementById("screen").innerHTML = val;
                signTrue = 0;
            }
            secondArg = undefined;
        }

        // These are arithmetic operations (region №2)
        function arithmetic(sign) {
            if (signTrue == 1 && secondArg == undefined) {
                signAct = sign;
                return;
            }

            var scr = getId("screen").textContent;

            if (firstArg == undefined || secondArg != undefined) {   
                firstArg = scr;                
                signAct = sign;
                signTrue = 1;
                secondArg = undefined;
            }
            else if (signAct != "") {
                firstArg = count(firstArg, scr, signAct);
                getId("screen").innerHTML = firstArg;                
                signAct = sign;
                signTrue = 1;
            }
        }

        // These are arithmetic functions (region №3)
        function arithmeticFunc(func) {
            var src = getId("screen").textContent;
            var result = count(src, undefined, func);
            getId("screen").innerHTML = result;
        }

        // These are difficult arithmetic functions (region №3 x^y, mod, y√x, %)
        function arithmeticFuncDiff(sign) {
            if (firstArg == undefined || signAct == 1) {
                arithmetic(sign);
            }
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
                case "/": {
                    if (y != 0) {
                        return cleanUp(Number(x) / Number(y)); 
                    } else {                        
                        return undefined;
                    }
                }
                case "x^2": {
                    return cleanUp(Number(x) * Number(x));
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
                case "mod": {
                    return;
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
        
        //#region These are auxiliary functions 

        var getId = function (id) {
            return document.getElementById(id);
        }

        // This is binding handlers to buttons.
        for (var key in buttons) {
            document.querySelector("#" + key).onclick = buttons[key].onClickHandler();
        }

        // This is function for correcting existing problems with floating point.
        function cleanUp(number) {
            return parseFloat((parseFloat(number).toPrecision(12)));
        }

        //#endregion
    }
})();