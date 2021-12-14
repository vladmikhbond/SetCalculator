
class XSet {
    constructor(color, str) {
        this.color = color;
        this.str = str;
        this.innerSet = this.setInnerSet(str);
        this.x = this.y;
        // запасное поле 
        this.z = this.zr = 0;
    }

    setInnerSet(str) {
        str = str.toString();
        let arr = str.trim().split('').filter(c => c != ' ');
        this.innerSet = new Set(arr);
        this.adjustR();
        return this.innerSet;
    }

    adjustR() {
       this.r = this.innerSet.size * 10;
    }

    // SETS ======================

    setPos(x, y) {
        this.x = x; this.y = y;
    }

    belong(x, y) {
        let dx = this.x - x;   
        let dy2 = (this.y - y) ** 2; 
        if (dx * dx + dy2 < this.r * this.r) 
            return true;
        // есть запасное поле
        if (this.z) {
            dx = this.x + this.z - x;
            if (dx * dx + dy2 < this.zr * this.zr) 
                return true;           
        }
        return false;
    }

    getMatrix() {
        const res = new Array(ROWS);
        for (let row = 0; row < ROWS; row++) {
            res[row] = new Array(COLS);
            for (let col = 0; col < COLS; col++) {
                let x = col * Kx, y = row * Ky;
                res[row][col] = this.belong(x, y) ? 1 : 0;
            }
        }
        return res;
    }

    // NUMBERS =========================================

    // Если this.str содержит число, 
    // метод возвращает строку с его двоичным представлением
    getBinaryStr() {
        let n = Number.parseInt(this.str);
        return  n ? n.toString(2) : "0";
    }
}

class Convert {
    constructor() {
        this.map = new Map();
    }

    // В строках str - числа. Пустая строка - то же, что 0.
    // наименшее число: innerSets = "α", далее innerSets = "α,β" и innerSets = "α,β,γ"
    // в map сохраняем соответствие между греч буквами и разностями входных величин
    extremToSets(setA, setB, setC) {
        this.map.clear();
        let sets = [setA, setB, setC].sort( (x, y) => x.str - y.str);  
        sets.forEach( s => s.setInnerSet(""));
        if (sets[0].str > "") { 
            sets.forEach(s => {s.setInnerSet("α"); s.r = +sets[0].str;});
            this.map["α"] = +sets[0].str;
        }
        if (+sets[1].str > +sets[0].str ) {
            [sets[1], sets[2]].forEach(s => {s.setInnerSet("αβ"); s.r += +sets[1].str;});
            this.map["β"] = sets[1].str - sets[0].str;
        }
        if (+sets[2].str > +sets[1].str ) {
            [sets[2]].forEach(s => {s.setInnerSet("αβγ"); s.r += +sets[2].str;});
            this.map["γ"] = sets[2].str - sets[1].str;
        }  
    }

    setToExtrem(setR) {
        let sum = 0;
        for(let k of setR.innerSet.keys()) {
            if (this.map[k])  sum +=  this.map[k];
        }
        setR.str = sum; 
    }
    
    // NUMBERS =================================

    //  15 -> "0123",  5 -> "02"
    numberToSets(setA, setB, setC) { 
            function helper (set) { 
                let binArray = set.getBinaryStr().split('').reverse();
                let s = binArray
                   .map((c, i) => c == '0' ? -1 : String.fromCharCode(i + 48))
                   .filter(x => x != -1)
                   .join('');
                return s;                    
            }
        
        [setA, setB, setC].forEach(set => {
            let s = helper(set);
            set.setInnerSet(s);
        });  
    }

    setToNumber(setR) {  
        let n = [...setR.innerSet.keys()]
           .reduce((a, x) => a + 2**(x.codePointAt(0) - 48), 0);
        setR.str = n;
    }

}