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

// ax = 0; ay = 0;   - по умолчанию    
// ax, bx, cx - центры кругов, ar, br, cr - радиусы кругов
// cz - расстояние по гориз до запасного поля, , czr - радиус
// ab, bc, ac, abc - размеры пересечений множеств 
const stages = [
    
["a", "", "12345"],
["ab",   "", "12345-12345"],
["a-ab", "", "12345-345"],
["abc",      "", "12345-12345-12345"],
["a-abc",    "", "12345-345-345"],
["ab-abc",   "", "12345-12345-345"],    // 5
["a-ab-abc", "", "12345-2345-345"],
["ab-ac",     "bx = -ar + br; cx = ar - cr;", "12345-123-45"],
["a-ab-ac",   "bx = -ar + br; cx = ar - cr;", "123456-123-45"],
["ab-abc-ac", "bx = -ar + br; cx = ar - cr;", "123456-1234-3456"],
["a-ab-abc-ac",  "bx = -ar + br; cx = bx + br + cr - 2*bc;", "1234567-1234-3456"],  // 10
["a-b", "bx = ar + br;", "1234-5678"],
["a-ab-b",  "bx = ar + br - ab; ", "12345-34567"],
["a-abc-b", "bx = ar + br - ab; cx = ar - cr;", "12345-3456-345"],
["a-ab-abc-b", "bx = ar + br - ab; cx = ar - cr;", "12345-34567-45"],
["ac-b", "bx = ar + br; cy = 2;",  "1234-5678-1234"],   // 15
["a-ac-b", "bx = ar + br; cx = ar - cr;", "1234-5678-123"],
["ab-ac-b", "bx = br - ar + 2 * cr; cx = cr - ar;", "1234-3456-12"],
["a-ab-ac-b", "bx = ar + br - ab; cx = cr-ar;", "12345-4567-12"],
["abc-ac-b", "bx = ar + br - ab; cy = 2", "12345-4567-12345"],
["a-abc-ac-b", "bx = ar + br - ab; cx = ar - cr;", "12345-4567-2345"], // 20
["ab-abc-ac-b", "bx = ar + br - ab; cx = cr - ar;", "12345-4567-1234"],
["a-ab-abc-ac-b", "bx = ar + br - ab; cx = a_b + abc - ar - cr;", "12345-4567-234"],
["ab-ac-bc", "bx = ar + br - ab; czr = br-ab/2; cr -= czr; cx=-ar+cr; cz =bx+br-czr-cx;", "12345-45678-123678"],
["a-ab-ac-bc", "bx = ar + br - ab; czr = b_a/2; cr -= czr; cx = cr - ar; cz = bx + br - cr - cx;", "012345-45678-123678"],
["ab-abc-ac-bc", "bx = ar + br - ab; czr = (b_a + abc)/2; cr -= czr; cx = -ar + cr; cz = bx + br - czr - cx;", "12345-45678-1235678"], //25
["a-ab-abc-ac-bc", "bx = ar + br - ab;  czr = b_a/2; cr -= czr; cx = bx - br+abc/2-cr;  cz = bx + br - czr - cx;", "012345-345678-0145678"],
["a-ab-ac-b-bc", "bx = ar + br - ab;  czr = bc/2; cr -= czr; cx = -ar + ac - cr;  cz = bx + br - czr - cx;", "012345-345678-018"],
["a-ab-abc-ac-b-bc", "bx = ar + br - ab; cr=ac/2; czr=(bc-abc)/2; cx = bx-br+abc- cr; cz = ar + czr - cx;", "012345-345678-2348"],
["a-abc-b-c", "bx = ar + br - ab;  let t = abc/2;  czr = cr - t; cr = t; cx = ar-cr; cz = bx + br + czr - cx;", "012345-345678-3459a"],

/*30*/["a-ab-abc-b-c", "bx = ar + br - ab;  let t = abc;  czr = cr - t; cr = t; cx = ar-cr; cz = bx + br + czr - cx;", "012345-345678-349a"],
["a-ab-abc-ac-b-c", "bx = ar + br - ab; czr = abc; cr -= czr; cx = -ar + ac - abc - cr; cz = bx - br + czr - cx;", "12345-345678-ab134"], 
["a-ab-ac-b-bc-c", "bx = ar + br - ab; czr = abc; cr -= czr; cx = -ar + ac - abc - cr; cz = bx - br + czr - cx;", "12345-345678-01278"],  //
["a-ac-b-bc", "bx = ar + br; by = 0; cx = ar + cr- 2*ac; cy = 0;", "12345-6789-4567"],
["a-abc-ac-b-bc", "bx = ar + br - ab; by = 0; cx = ar + cr- 2*ac; cy = 0;", "12345-345678-234567"],
["a-b-c", "bx = ar + br; by = 0; cx = -ar - cr; cy = 0;", "12345-6789-0asdf"],
["a-ab-b-c", "bx = ar + br - ab; by = 0; cx = -ar - cr; cy = 0;", "12345-45678-0asdf"],
["a-ab-ac-b-c", "bx = ar + br - ab; by = 0; cx = 2*ac - ar - cr; cy = 0;", "12345-45678-0a12"],

["a-ab-abc-ac-b-bc-c", "bx = ar + br - ab; by = 0; cx = ar - ab; cy = ar + cr - ac - bc;", "1267-2347-4567"],
];
// alert()

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


function fffff(a, b, c,    x, y, f) {
    let ax, bx, cx, ay, by, cy, ar, br, cr;
    let az, bz, cz, azr, bzr, czr; 
    ax = bx = cx = 0; ay = by = cy = 0; 
    az = bz = cz = 0; 
    ar = a.r; br = b.r; cr = c.r;
    let ab = f(a,b), ac = f(a,c), bc = f(b,c), abc = f(a,b,c);
    let a_b = g(a,b), b_a = g(b, a);
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
            if (!setZ) setZ = setY;
            for (let k of setX.innerSet.keys())
                if (setY.innerSet.has(k) && setZ.innerSet.has(k)) 
                    counter++;
            return counter * 20;        
        }

        function differ(setX, setY) {
            let counter = 0;
            for (let k of setX.innerSet.keys())
                if (setY.innerSet.has(k)) 
                    counter++;
            return (setX.innerSet.size - counter) * 20;
        }

    let params = "a, b, c, x, y, f, g";
    let body = `
    let ax, bx, cx, ay, by, cy, ar, br, cr;
    let az, bz, cz, azr, bzr, czr; 
    ax = bx = cx = 0; ay = by = cy = 0; 
    az = bz = cz = 0; 
    ar = a.r; br = b.r; cr = c.r;
    let ab = f(a,b), ac = f(a,c), bc = f(b,c), abc = f(a,b,c);
    let a_b = g(a,b), b_a = g(b, a);
    ${stage[1]};
    a.x = ax + x; a.y = ay + y; a.r = ar; a.z = az; a.zr = azr;    
    b.x = bx + x; b.y = by + y; b.r = br; b.z = bz; b.zr = bzr;    
    c.x = cx + x; c.y = cy + y; c.r = cr; c.z = cz; c.zr = czr;        
    `;

    const func = new Function(params, body);

    let x = canvas.width / 2, y = canvas.height / 2;
    
    switch (permut) {
        case "abc": func(setA, setB, setC, x, y, intersect, differ); break; 
        // обратные перестановки!  abc->acb ::: abc<-acb ::: a<-a, b<-c; c<-b  :::  ACB
        case "acb": func(setA, setC, setB, x, y, intersect, differ); break; 
        case "bac": func(setB, setA, setC, x, y, intersect, differ); break;  
        case "bca": func(setC, setA, setB, x, y, intersect, differ); break;  
        case "cab": func(setB, setC, setA, x, y, intersect, differ); break;  
        case "cba": func(setC, setB, setA, x, y, intersect, differ); break;  
    }
}

