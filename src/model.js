function calcMatrix(setA, setB, setC) {
    const op = new Function("a","b","c", "return " + expr.value);
    const a = setA.getMatrix();   
    const b = setB.getMatrix();   
    const c = setC.getMatrix();   

    for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
            a[y][x] = op(a[y][x], b[y][x], c[y][x]);
        }
    }
    return a;
}

//---------------- Stage suit ----------------------

function setStage(setA, setB, setC) {
    let a = setA.setInnerSet(inputA.value);
    let b = setB.setInnerSet(inputB.value);
    let c = setC.setInnerSet(inputC.value);

    decode(getVariants(a,b,c));
}

// Получает три множества и находит формулу их взаимного расположения
// "a-ac-b-c"
// Формула находится в разных вариантах с точностью до перестановок имен множеств
// Возвращает массив из пар: формула + перестановка
function getVariants(a,b,c) {
    let arr = Array.from(a).concat(Array.from(b)).concat(Array.from(c));
    let items = new Set(arr);
    let variants = [];
    let permuts = ["abc", "acb",  "bac",  "bca",  "cab",  "cba"];
    for (let permut of permuts) {
        let formula = new Set(); // 
        for (let item of items) {
            let s = ""; 
            if (a.has(item)) s += permut[0];
            if (b.has(item)) s += permut[1];
            if (c.has(item)) s += permut[2];
            
            if (s !="") {
                s = s.split('').sort().join('');
                formula.add(s);
            }
        }
        formula = [...formula].sort().join("-");
        variants.push({formula, permut});
    }
    return variants; 
}

// variants = [{formula:"a-ac-b-c", permut: "acb"}, ...]
//
function decode(variants) {
    let x = canvas.width / 2, y = canvas.height / 2;
    let R = Math.max(setA.r, setB.r, setC.r);       // max radius
    let r = Math.min(setA.r, setB.r, setC.r);       // min radius
    let rR = setA.r + setB.r + setC.r - R - r;      // middle radius
     
    const stages = [
        ["a-b-c", [x - R, y-R], [x + R, y-R], [x, y+R]],
        ["a-ac-b-c", [x - r/2, y-R], [x, y + R], [x + r/2, y-R]],
        ["a-ac-b", [x - r/2, y-R], [x, y + R], [x - r/2, y-R]],
        ["a-ac-b-bc-c", [x - R, y], [x+R, y], [x, y]],
        ["a-ac-b-bc",   [x - R, y], [x+r, y], [x, y]],

        ["a-ab-ac", [x, y], [x-rR, y], [x+r, y]],
        ["ab-ac",   [x, y], [x-R + rR, y], [x+R-r, y]],
        ["a-ab-abc-ac", [x, y], [x-r, y], [x+r, y]],
        ["a-ab-abc", [x,y], [x,y], [x,y]],
        ["a-ab-abc-ac-c", [x,y], [x,y], [x + R - r,y]],
        ["a-ab-ac-c", [x,y], [x,y], [x + R, y]],
        
        ["a-ab-abc-ac-b-bc-c", [x - rR, y], [x + r, y], [x, y]],
        ["a-abc-b-c",  [x - R/2, y], [x + rR/2, y], [x, y]],
        ["a-ab-abc-b",  [x - rR, y], [x + r, y], [x, y]],
    ];


    let formulas = variants.map(x => x.formula);
    for (let stage of stages) 
    {        
        let i = formulas.indexOf(stage[0]);
        if (i != -1) {
            info.innerHTML = stage[0];  // for debug          
            doStage(variants[i].permut, stage);
            return;
        } 
    }
    console.log(variants);
    throw new Error( "Stage not finded.");    
}

function doStage(permut, stage) 
{
    // permut -> [0,2,1]
    let permutInds = permut.split('').map(x => x == 'a' ? 0 : x == 'b' ? 1 : 2 );

    for (let i = 0; i < 3; i++) {
        let xSet = [setA, setB, setC][permutInds[i]];
        xSet.x = stage[i+1][0];
        xSet.y = stage[i+1][1];   
    }
}




