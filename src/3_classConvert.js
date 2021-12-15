// Преобразует строку str в множество innerSet и обратно.
// Другие члены не затрагивает.
class Convert {
    constructor() {
        this.map = new Map();
    }

    // 5 -> {α},   11 -> {α β},   25 -> {α β γ}   
    // для наименшего числа: innerSets = "α", далее innerSets = "α,β" и innerSets = "α,β,γ"
    // в map сохраняем соответствие: α:5,  β:6,  γ:14
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


    //  15 (1111) -> "0123",  5 (101)-> "02"
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