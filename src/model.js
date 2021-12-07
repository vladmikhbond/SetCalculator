

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
        ["a-ab-b",  "bx = ar + br - 2*abr; by = 0;"],   // 12345   34567
        ["a-abc-b", "bx = ar + br - 2*abr; by = 0; cx = ar - cr; cy = 0;"], // 12345, 3456, 345
        ["a-ab-abc-b", "bx = ar + br - 2*abr; by = 0; cx = ar-cr; cy = 0;"],  // 12 345, 345 67,  45 
        ["ac-b", "bx = ar + br + 10; by = 0; cx = 0; cy = 0;"],  // 1234, 5678, 1234,        
        ["a-ac-b", "bx = ar + br + 10; by = 0; cx = ar - cr; cy = 0;"],  // 1234, 5678, 123, 
        ["ab-ac-b", "bx = br - ar + 2 * cr; by = 0; cx = cr - ar; cy = 0;"],  // 1234, 3456, 12,     
        ["a-ab-ac-b", "bx = ar + br - 2*abr; by = 0; cx = cr-ar; cy = 0;"],  // 12345, 4567, 12 
        ["abc-ac-b", "bx = ar + br - 2*abr; by = 0; cx = 0; cy = 0;"],  // 12345, 4567, 12345 
        ["a-abc-ac-b", "bx = ar + br - 2*abr; by = 0; cx = ar - cr; cy = 0;"],  // 12345, 4567, 2345
        ["ab-abc-ac-b", "bx = ar + br - 2*abr; by = 0; cx = cr - ar; cy = 0;"],  // 123 45, 4567, 1234
        ["a-ab-abc-ac-b", "bx = ar + br - 2*abr; by = 0; cx = ar - 2*abr - cr  +2*bcr; cy = 0;"],  // 12345, 4567, 234
        // ["ab-ac-bc", [x, y], [x, y], [x, y]],
        // ["a-ab-ac-bc", [x, y], [x, y], [x, y]],
        // ["ab-abc-ac-bc", [x, y], [x, y], [x, y]],
        // ["a-ab-abc-ac-bc", [x, y], [x, y], [x, y]],
        // ["a-ab-ac-b-bc", [x, y], [x, y], [x, y]],
        // ["a-ab-abc-ac-b-bc", [x, y], [x, y], [x, y]],
        // ["a-abc-b-c", [x, y], [x, y], [x, y]],
        // ["a-ab-abc-b-c", [x, y], [x, y], [x, y]],
        // ["a-ab-abc-ac-b-c", [x, y], [x, y], [x, y]],
        // ["a-ab-ac-b-bc-c", [x, y], [x, y], [x, y]],
        ["a-ac-b-bc", "bx = ar + br; by = 0; cx = ar + cr- 2*acr; cy = 0;"],  // 12345, 6789, 4567
        ["a-abc-ac-b-bc", "bx = ar + br -2*abr; by = 0; cx = ar + cr- 2*acr; cy = 0;"],  // 12 345, 345 678, 234567    
        ["a-b-c", "bx = ar + br; by = 0; cx = -ar - cr; cy = 0;"],  // 12345, 6789, 0asdf
        ["a-ab-b-c", "bx = ar + br -2*abr; by = 0; cx = -ar - cr; cy = 0;"],  // 12345, 45678, 0asdf
        ["a-ab-ac-b-c", "bx = ar + br -2*abr; by = 0; cx = 2*acr - ar - cr; cy = 0;"],  // 123 45, 45678, 0a12
        
        ["a-ab-abc-ac-b-bc-c", "bx = ar + br - 2*abr; by = 0; cx = ar - abr; cy = ar + cr - acr - bcr;"],  // 1267, 2347, 4567
        

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
    function f(setX, setY) {
        let counter = 0;
        for (let k of setX.innerSet.keys())
           if (setY.innerSet.has(k)) counter++;
        return counter * 10;
    }

    let params = "a, b, c, x, y, f";
    let body = "ax = bx = cx = x; ay = by = cy = y; ar = a.r; br = b.r; cr = c.r; "
    body += "abr = f(a,b); acr = f(a,c); bcr = f(b,c); "
    body += stage[1].replace(/=/g, '+='); // "bx += abr: by += 0; ... "
    body += "a.x=ax; a.y=ay; a.r=ar;   b.x=bx; b.y=by; b.r=br;   c.x=cx; c.y=cy; c.r=cr;";
    const func = new Function(params, body);

    let x = canvas.width / 2, y = canvas.height / 2;
    
    switch (permut) {
        case "abc": func(setA, setB, setC, x, y, f); break; 
        // обратные перестановки!  abc->acb ::: abc<-acb ::: a<-a, b<-c; c<-b  :::  ACB
        case "acb": func(setA, setC, setB, x, y, f); break; 
        case "bac": func(setB, setA, setC, x, y, f); break;  
        case "bca": func(setC, setA, setB, x, y, f); break;  
        case "cab": func(setB, setC, setA, x, y, f); break;  
        case "cba": func(setC, setB, setA, x, y, f); break;  
    }
}

