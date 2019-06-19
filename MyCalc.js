(function () {
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
                            
                            console.log(signAct[0]);
                            console.log(firstArg);
                            console.log(secondArg);
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
                        if (getId("screen").textContent.indexOf(".") == -1) {
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
                    return function () {
                        getId("screen").innerHTML = self;
                    };
                }
            },

            //#endregion

            //#region region №2 These are buttons of arithmetic operations.
            
            // После нажатия этих кнопок введённое число на экран запоминается в параметре first
            // после чего начинается набор второго числа для выражения в параметр second.
            // Но если уже вводилось второе число и была нажата кнопка арифметических операций
            // тогда она выполняет функции клавиши "=" - происходит вычисление операции и в параметр 
            // first записывается результат и набирается уже значение второго параметра second.

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

            // По нажатию этих кнопок проиходт вычесление аргумента first (содержимого экрана)
            // Получается результат и он же записывается обратно в аргумент first.

            "Xdeg2": {
                title: "x^2",                
                onClickHandler: function (e) {                    
                    return function () {
                        
                    };
                }
            },
            "Xdeg3": {
                title: "x^3",
                onClickHandler: function (e) {                    
                    return function () {
                    };
                }
            },
            
            "XdegY": {
                title: "x^y",
                onClickHandler: function (e) {                   
                    return function () {

                    };
                }
            },
            
            "√": {
                title: "√",
                onClickHandler: function (e) {                    
                    return function () {

                    };
                }
            },
            "b10degX": {
                title: "10^x",
                onClickHandler: function (e) {                    
                    return function () {

                    };
                }
            },
            "b1divX": {
                title: "1/x",
                onClickHandler: function (e) {                    
                    return function () {

                    };
                }
            },            
            "nfactr": {
                title: "n!",
                onClickHandler: function (e) {                    
                    return function () {

                    };
                }
            },
            "log": {
                title: "log",
                onClickHandler: function (e) {                    
                    return function () {

                    };
                }
            },
            "ln": {
                title: "ln",
                onClickHandler: function (e) {                    
                    return function () {

                    };
                }
            },
            "edegX": {
                title: "e^x",
                onClickHandler: function (e) {                    
                    return function () {

                    };
                }
            },
            "mod": {
                title: "mod",
                onClickHandler: function (e) {                    
                    return function () {

                    };
                }
            },
            "sin": {
                title: "sin",
                onClickHandler: function (e) {                    
                    return function () {

                    };
                }
            },
            "cos": {
                title: "cos",
                onClickHandler: function (e) {                    
                    return function () {

                    };
                }
            },
            "tan": {
                title: "tan",
                onClickHandler: function (e) {                    
                    return function () {

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

        var getId = function (id) {
            return document.getElementById(id);
        }

        // This is binding handlers to buttons.
        for (var key in buttons) {
            document.querySelector("#" + key).onclick = buttons[key].onClickHandler();
        }

        // Add a sign to screen of calculator (region №1)
        function addSign(val) {
            if ((getId("screen").textContent != "0" || val == ".") && signTrue == 0) {
                document.getElementById("screen").innerHTML += val;
            } else {
                document.getElementById("screen").innerHTML = val;
                signTrue = 0;
            }
            secondArg = undefined;
        }

        // These are arithmetic functions (region №2)
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
                    if (y == 0) {
                        return undefined;
                    } else {                        
                        return cleanUp(Number(x) / Number(y));
                    }
                }
            }
        }

        // This is function for correcting existing problems with floating point.
        function cleanUp(number) {
            return parseFloat((parseFloat(number).toPrecision(12)));
        }
    }
})();