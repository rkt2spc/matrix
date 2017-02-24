//=============================
const SYMBOL_SIZE = 23;
const WIDTH = window.screen.availWidth;
const HEIGHT = window.screen.availHeight;

//=============================
var matrix;

//=============================
function setup() {
    //--------------------------------------------------
    createCanvas(WIDTH, HEIGHT);
    textSize(Symbol.SIZE);
    //--------------------------------------------------
    matrix = new Matrix();
}

//=============================
function draw() {
    background(0, 150);
    matrix.render();
}

//=============================
// Symbol
class Symbol {

    constructor(x, y, highlight = false) {
        this.x = x;
        this.y = y;
        this.highlight = highlight;
        this.switchInterval = round(random(2, 20));

        this.value = null;
        this.setToRandomSymbol();
    }

    static get SIZE() { return SYMBOL_SIZE; }

    setToRandomSymbol() {
        this.value = String.fromCharCode(0x30A0 + round(random(0, 95)));
    }

    render() {
        if (this.highlight) {
            fill(198, 255, 0);
            text(this.value, this.x, this.y);
            if (frameCount % 45 === 0)
                this.setToRandomSymbol();
        }
        else {
            fill(0, 255, 70);
            text(this.value, this.x, this.y);
            if (frameCount % this.switchInterval === 0)
                this.setToRandomSymbol();
        }
    }

    fall(speed) {
        if (this.y > height) this.y = this.y - height + speed;
        else this.y += speed;
    }
}
//=============================
class Stream {

    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed || random(3, 20);

        this.symbols = [];
        this.generateSymbols();
    }

    generateSymbols() {
        this.symbols = [];
        var maxSymbols = height / Symbol.SIZE;
        var totalSymbols = round(random(maxSymbols / 5, 9 * maxSymbols / 10));
        for (let i = 0; i < totalSymbols; ++i)
            this.symbols.push(new Symbol(this.x, this.y + i * Symbol.SIZE));

        this.symbols[round(random(0, this.symbols.length - 1))].highlight = round(random(0, 3)) == 1;
    }

    fall() {
        this.symbols.forEach((symbol) => symbol.fall(this.speed));
    }

    render() {
        this.symbols.forEach((symbol) => symbol.render());
    }
}

//=============================
class Matrix {

    constructor() {
        this.streams = [];
        this.generateStreams();
    }

    generateStreams() {
        this.streams = [];
        var totalStreams = width / Symbol.SIZE;
        for (let i = 0; i < totalStreams; ++i)
            this.streams.push(new Stream(i * Symbol.SIZE, random(-500, 0)));
    }

    render() {
        this.streams.forEach((stream) => {
            stream.render();
            stream.fall();
        });
    }
}