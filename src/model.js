

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
function decode(variants) 
{     
    const stages = [
         // ax = 0; ay = 0;   - по умолчанию
        ["a", ""],
        ["ab",   "bx = 0; by = 0;"],
        ["a-ab", "bx = 0; by = 0;"],
        ["abc",      "bx = 0; by = 0; cx = 0; cy = 0;"],
        ["a-abc",    "bx = 0; by = 0; cx = 0; cy = 0;"],
        ["ab-abc",   "bx = 0; by = 0; cx = 0; cy = 0;"],
        ["a-ab-abc", "bx = 0; by = 0; cx = 0; cy = 0;"],
        ["ab-ac",     "bx = -ar + br; by = 0; cx = ar - cr; cy = 0;"],
        ["a-ab-ac",   "bx = -ar + br; by = 0; cx = ar - cr; cy = 0;"], 
        ["ab-abc-ac", "bx = -ar + br; by = 0; cx = ar - cr; cy = 0;"], 
        ["a-ab-abc-ac",  "bx = -ar + br; by = 0; cx = ar - cr; cy = 0;"], 
        ["a-b", "bx = ar + br + 10; by = 0;"],      
        ["a-ab-b",  "bx = (ar + br)/2; by = 0;"],   // 12345   3456
        ["a-abc-b", "bx = ar -(2*cr - br); by = 0; cx = ar-cr; cy = 0;"], // 12345, 3456, 345
        ["a-ab-abc-b", "bx = br; by = 0; cx = ar-cr; cy = 0;"],  // 12 345, 345 67,  45 
        ["ac-b", "bx = ar + br + 10; by = 0; cx = 0; cy = 0;"],  // 1234, 5678, 1234, 
        ["a-ac-b", "bx = ar + br + 10; by = 0; cx = ar - cr; cy = 0;"],  // 1234, 5678, 123, 
        ["ab-ac-b", "bx = -br + ar -2* cr; by = 0; cx = ar - cr; cy = 0;"],  // 1234, 3456, 12, 
        // ["a-ab-ac-b", [x, y], [x, y], [x, y]],
        // ["abc-ac-b", [x, y], [x, y], [x, y]],
        // ["a-abc-ac-b", [x, y], [x, y], [x, y]],
        // ["ab-abc-ac-b", [x, y], [x, y], [x, y]],
        // ["a-ab-abc-ac-b", [x, y], [x, y], [x, y]],
        // ["ab-ac-bc", [x, y], [x, y], [x, y]],
        // ["a-ab-ac-bc", [x, y], [x, y], [x, y]],
        // ["ab-abc-ac-bc", [x, y], [x, y], [x, y]],
        // ["a-ab-abc-ac-bc", [x, y], [x, y], [x, y]],
        // ["a-ac-b-bc", [x, y], [x, y], [x, y]],
        // ["a-ab-ac-b-bc", [x, y], [x, y], [x, y]],
        // ["a-abc-ac-b-bc", [x, y], [x, y], [x, y]],
        // ["a-ab-abc-ac-b-bc", [x, y], [x, y], [x, y]],
        // ["a-b-c", [x, y], [x, y], [x, y]],
        // ["a-ab-b-c", [x, y], [x, y], [x, y]],
        // ["a-abc-b-c", [x, y], [x, y], [x, y]],
        // ["a-ab-abc-b-c", [x, y], [x, y], [x, y]],
        // ["a-ab-ac-b-c", [x, y], [x, y], [x, y]],
        // ["a-ab-abc-ac-b-c", [x, y], [x, y], [x, y]],
        // ["a-ab-ac-b-bc-c", [x, y], [x, y], [x, y]],
        // ["a-ab-abc-ac-b-bc-c", [x, y], [x, y], [x, y]],
        

    ];


    let formulaVariants = variants.map(x => x.formula);
    let formula; 
    for (let stage of stages) 
    {       
        formula = stage[0]; 
        let i = formulaVariants.indexOf(formula);
        if (i != -1) {
            info.innerHTML = formula;  // for debug          
            doStage(variants[i].permut, stage);
            return;
        } 
    }
    info.innerHTML = " Not found";
    throw new Error( "Stage not finded.");    
}

function doStage(permut, stage) 
{
    let params = "a, b, c, x, y";
    let body = "ax = bx = cx = x; ay = by = cy = y; ar = a.r; br = b.r; cr = c.r;"
    body += stage[1].replace(/=/g, '+=');
    body += "a.x=ax; a.y=ay; a.r=ar;   b.x=bx; b.y=by; b.r=br;   c.x=cx; c.y=cy; c.r=cr;";
    const func = new Function(params, body);

    let x = canvas.width / 2, y = canvas.height / 2;
    // обратная перестановка!
    switch (permut) {
        case "abc": func(setA, setB, setC, x, y); break;   
        // abc->acb ::: abc<-acb ::: a<-a, b<-c; c<-b  :::  ACB
        case "acb": func(setA, setC, setB, x, y); break; 
        case "bac": func(setB, setA, setC, x, y); break;  
        case "bca": func(setC, setA, setB, x, y); break;  
        case "cab": func(setB, setC, setA, x, y); break;  
        case "cba": func(setC, setB, setA, x, y); break;  
    }
}

