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
        ["ab",   ""],
        ["a-ab", ""],
        ["abc",      ""],
        ["a-abc",    ""],
        ["ab-abc",   ""],
        ["a-ab-abc", ""],
        ["ab-ac",     "bx = -ar + br; cx = ar - cr;"],  // 12345  123  45
        ["a-ab-ac",   "bx = -ar + br; cx = ar - cr;"],  // 123456  123  45
        ["ab-abc-ac", "bx = -ar + br; cx = ar - cr;"],  // 123456  1234  3456
        ["a-ab-abc-ac",  "bx = -ar + br; cx = bx + br + cr - 2*bcr;"], // 1234567  1234  3456
        ["a-b", "bx = ar + br + 10;"],  //1234 5678    
        ["a-ab-b",  "bx = ar + br - 2*abr;"],   // 12345   34567
        ["a-abc-b", "bx = ar + br - 2*abr; cx = ar - cr;"], // 12345  3456  345
        ["a-ab-abc-b", "bx = ar + br - 2*abr; cx = ar - cr;"],  // 12345  34567  45         
        ["ac-b", "bx = ar + br + 10;"],  // 1234, 5678, 1234
        ["a-ac-b", "bx = ar + br + 10; cx = ar - cr;"],  // 1234, 5678, 123, 
        ["ab-ac-b", "bx = br - ar + 2 * cr; cx = cr - ar;"],  // 1234, 3456, 12,     
        ["a-ab-ac-b", "bx = ar + br - 2*abr; cx = cr-ar;"],  // 12345, 4567, 12 
        ["abc-ac-b", "bx = ar + br - 2*abr;"],  // 12345, 4567, 12345
        ["a-abc-ac-b", "bx = ar + br - 2*abr; cx = ar - cr;"],  // 12345, 4567, 2345
        ["ab-abc-ac-b", "bx = ar + br - 2*abr; cx = cr - ar;"],  // 123 45, 4567, 1234
        ["a-ab-abc-ac-b", "bx = ar + br - 2*abr; cx = ar - 2*abr - cr + 2*bcr;"],  // 12345, 4567, 234   
        ["ab-ac-bc", "bx = ar + br - 2*abr; czr = br-abr; cr -= czr; cx=-ar+cr; cz = ar + bx + br - cr - czr;"], // 123 45, 45 678, 123678    
        ["a-ab-ac-bc", "bx = ar + br - 2*abr; czr = br-abr; cr -= czr; cx=-ar+cr; cz = ar + bx + br - cr - czr;"],  // 012345, 45678, 123678   
        ["ab-abc-ac-bc", "bx = ar + br - 2*abr;  czr = br - abr/2;  cr -= czr;  cx = -ar+cr; cz = bx + br - czr - cx;"],  // 123 45, 45 678, 1235678    
        ["a-ab-abc-ac-bc", "bx = ar + br - 2*abr;  czr = br - abr/2;  cr -= czr;  cx = -ar+cr; cz = bx + br - czr - cx;"],  // 012 345, 345 678, 0145678
        ["a-ab-ac-b-bc", "bx = ar + br - 2*abr;  cr = acr;  czr = bcr;  cx = -ar+cr; cz = bx + br - czr - cx;"],  // 012 345, 345 678, 018
        ["a-ab-abc-ac-b-bc", "bx = ar + br - 2*abr;  czr = bcr - abcr; cr -= czr; cx = bx - br + abcr - cr; cz = ar + czr - cx;"],  // 012 345, 345 678, 2348
        ["a-abc-b-c", "bx = ar + br - 2*abr;  let t = abcr;  czr = cr - t; cr = t; cx = ar-cr; cz = bx + br + czr - cx;"],  // 012 345, 345 678, 3459a                        
        ["a-ab-abc-b-c", "bx = ar + br - 2*abr;  let t = abcr;  czr = cr - t; cr = t; cx = ar-cr; cz = bx + br + czr - cx;"],  // 012 345, 345 678, 349a
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


function fff(a, b, c,    x, y, f) {
    let ax, bx, cx, ay, by, cy, ar, br, cr;
    let az, bz, cz, azr, bzr, czr; 
    ax = bx = cx = 0; ay = by = cy = 0; 
    az = bz = cz = 0; 
    ar = a.r; br = b.r; cr = c.r;
    let abr = f(a,b), acr = f(a,c), bcr = f(b,c), abcr = f(a,b,c);
    //"a-ac-b-bc", "
    bx = ar + br; cx = ar + cr - 2*acr;
    ///
    a.x = ax + x; a.y = ay + y; a.r = ar; a.z = az; a.zr = azr;    
    b.x = bx + x; b.y = by + y; b.r = br; b.z = bz; b.zr = bzr;    
    c.x = cx + x; c.y = cy + y; c.r = cr; c.z = cz; c.zr = czr;        
}

function doStage(permut, stage) 
{
    function intersect(setX, setY, setZ) {
        let counter = 0;
        if (!setZ) 
            setZ = setY;
        for (let k of setX.innerSet.keys())
            if (setY.innerSet.has(k) && setZ.innerSet.has(k)) 
                counter++;
        return counter * 10;        
    }



    let params = "a, b, c, x, y, f";
    let body = `
    let ax, bx, cx, ay, by, cy, ar, br, cr;
    let az, bz, cz, azr, bzr, czr; 
    ax = bx = cx = 0; ay = by = cy = 0; 
    az = bz = cz = 0; 
    ar = a.r; br = b.r; cr = c.r;
    let abr = f(a,b), acr = f(a,c), bcr = f(b,c), abcr = f(a,b,c);
    ${stage[1]};
    a.x = ax + x; a.y = ay + y; a.r = ar; a.z = az; a.zr = azr;    
    b.x = bx + x; b.y = by + y; b.r = br; b.z = bz; b.zr = bzr;    
    c.x = cx + x; c.y = cy + y; c.r = cr; c.z = cz; c.zr = czr;        
    `;

    const func = new Function(params, body);

    let x = canvas.width / 2, y = canvas.height / 2;
    
    switch (permut) {
        case "abc": func(setA, setB, setC, x, y, intersect); break; 
        // обратные перестановки!  abc->acb ::: abc<-acb ::: a<-a, b<-c; c<-b  :::  ACB
        case "acb": func(setA, setC, setB, x, y, intersect); break; 
        case "bac": func(setB, setA, setC, x, y, intersect); break;  
        case "bca": func(setC, setA, setB, x, y, intersect); break;  
        case "cab": func(setB, setC, setA, x, y, intersect); break;  
        case "cba": func(setC, setB, setA, x, y, intersect); break;  
    }
}

