class CalcController {
    constructor() {
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
    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {
            btn.addEventListener("click", e => {
                console.log(btn.className.baseVal.replace("btn-", ""));
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