class CalcController {
    constructor() {

       this._lastOperator = "";
       this._lastNumber = "";
       this._operation = [];
       this._locale = "pt-BR";
       this._displayCalcEl = document.querySelector("#display");
       this._dateCalcEl = document.querySelector("#data");
       this._timeCalcEl = document.querySelector("#hora");
       this._currentDate;
       this.initialize();
       this.initButtonsEvents();
    }

    initialize(){
        this.setDisplayDateTime();

        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);

        this.setLasNumberToDisplay();
    }

    addEventListenerAll(element, events, fn){
        events.split(" ").forEach(event => {
            element.addEventListener(event, fn, false);
        });

    }

    clearAll(){
        this._operation = [];
        this._lastNumber = "";
        this._lastOperator = "";
        this.setLasNumberToDisplay();
    }

    clearEntry(){
        this._operation.pop();
        this.setLasNumberToDisplay();
    }

    getLastOperation(){
        return this._operation[this._operation.length - 1];
    }

    setlastOperation(value){
        this._operation[this._operation.length - 1] = value;

    }

    isOperator(value){
        return (["+", "-", "*", "%", "/"].indexOf(value) > -1);
    }

    pushOperation(value){
        this._operation.push(value);

        if (this._operation.length > 3){

            this.calc();

        }
    }

    getResult(){
        return eval(this._operation.join(""));;

    }

    calc(){

        let last = "";

        this._lastOperator = this.getLastItem();

        if(this._operation.length < 3){

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if(this._operation.length > 3) {

            last = this._operation.pop();
            this._lastNumber = this.getResult();
        }

else if(this._operation.length == 3){
    this._lastNumber = this.getLastItem(false);
}

        console.log(this._lastNumber, this._lastOperator);

        let result = this.getResult();

        if (last == "%"){
           result /= 100;

           this._operation = [result];

        } else {

            this._operation = [result];

            if(last) this._operation.push(last);

        }

        this.setLasNumberToDisplay();

    }
 
    getLastItem(isOperator = true){
        let lastItem;

        for(let i = this._operation.length - 1; i >= 0; i--){

            if(this.isOperator(this._operation[i]) === isOperator){
                lastItem = this._operation[i];
                break;
            }
        }

        if(!lastItem){
        lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
     }

        return lastItem;
    }

    setLasNumberToDisplay(){

        let lastNumber = this.getLastItem(false);

        if(!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    }

    addOperation(value){

        if(isNaN(this.getLastOperation())){

        if(this.isOperator(value)){
            this.setlastOperation(value);

        } else if(isNaN(value)){
            console.log(value);

        } else {

            this.pushOperation(value);
            this.setLasNumberToDisplay();
        }

        } else {

           if(this.isOperator(value)){
            this.pushOperation(value);

           } else {

           let newValue = this.getLastOperation().toString() + value.toString();
           this.setlastOperation(parseInt(newValue));

            this.setLasNumberToDisplay();

           }

        }

    }

    execBtn(value){
        switch(value){
            case "ac":
                this.clearAll();

                break;
            case "ce":
                this.clearEntry();

                break;

            case "soma":
                this.addOperation("+");
                break;
    
            case "subtracao":
                this.addOperation("-");
                break;

            case "divisao":
                this.addOperation("/"); 
                break;

            case "multiplicacao":
                this.addOperation("*");
                break;

            case "igual":
                this.calc();
                break;

            case "porcento":
                this.addOperation("%");   
                break;

            case "ponto":
                this.addOperation(".");
                break;
            
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.addOperation(parseInt(value));
                break;
        }
    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, "click drag", e => {

            console.log(btn.className.baseVal.replace("btn-", ""));
            let textBtn = btn.className.baseVal.replace("btn-", "");
            this.execBtn(textBtn);

            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
            
        });

    }

    setDisplayDateTime(){
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
    }

    get displayTime(){
        return this._timeCalcEl.innerHTML;
    }

    set displayTime(value){
        this._timeCalcEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateCalcEl.innerHTML;
    }

    set displayDate(value){
        this._dateCalcEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }
}