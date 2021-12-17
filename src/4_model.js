//======================= Subst Operations Suit =========================

// Подстановка всех операций
function substOperators(definitions, expr) {
    let ds = definitions.replace(/\s/g, '').split(';');
    for (let d of ds) {
        expr = substOperator(d, expr);
    }
    return expr;
}

// Подстановка определения новой бинарной операции в выражение
//   ! считается, что приоритет новой операции наивысший !
// newOp("L > R = !L+R",      "(a + b) > (c * d)")
// newOp("L = R = !L*!R+L*R", "(a * b) = (c = d)")
//
function substOperator(definition, expr) 
{    
    // устранить пробелы
    let d = definition.replace(/\s/g, '');
    expr = expr.replace(/\s/g, '');
    // разобрать определение на 4 части: L O R = T
    let p = d.indexOf('=', 3); 
    let [L, O, R, T] = [d[0], d.slice(1, p-1), d[p-1], d.slice(p+1) ];
        
    while(expr.indexOf(O) != -1) {  
        // гранцы операндов в выражении: p1===p2 (оператор) p3===p4
        let p2 = expr.indexOf(O);
        if (p2 == -1) return;
        let p1 = p2 - 1;
        if (expr[p1] == ')') {
           p1 = posOfParentheses(expr, p1);
        }
        let p3 = p2 + O.length;
        let p4 = p3 + 1;
        if (expr[p3] == '(') {
            p4 = posOfParentheses(expr, p3) + 1;
        } 
        let L1 = `(${expr.slice(p1, p2)})`;
        let R1 = `(${expr.slice(p3, p4)})`;
        
        console.log("operands", L1, R1)   // DEBUG

        // изготовить подстановку
        // заместить L
        let substitution = T.replace(new RegExp(L, 'g'), L1);
        // заместить R
        substitution = substitution.replace(new RegExp(R, 'g'), R1); 
        // вставить подстановку в выражение
        expr = expr.slice(0, p1) + '(' + substitution + ')' + expr.slice(p4);   
        console.log("expression",  expr);   // DEBUG  
    }
    return expr;
}

// Возвращает позицию парной скобки в строке expr
// pos - позиция исходной скобки 
function posOfParentheses(expr, pos) {
    let step = expr[pos] == '(' ? 1 : -1;
    let goal = expr[pos] == '(' ? ')' : '(';    
    let counter = 1;
    for (let i = pos + step; ; i += step) {
        if (expr[i] == goal) counter--;
        if (expr[i] == expr[pos]) counter++;
        if (counter == 0) 
           return i;
    }
}  

// Делает подстановки в str: вместо всех вхождений символа xs[i] подставляет строку y[i].
// xs - строка или массив символов, ys - строка или массив строк. 
function replaceAll(str, xs, ys) 
{
    return str.split('').map(c => {
        let p = xs.indexOf(c);
        return p > -1 ? ys[p] : c;
    }).join(''); 
}

//======================= Set Calculation Suit =========================

function calcMatrix(setA, setB, setC, expr) {
    if (!expr)
       return null;
    const op = new Function("a,b,c", "return " + expr);
    const a = setA.getMatrix();   
    const b = setB.getMatrix();   
    const c = setC.getMatrix();   

    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            a[y][x] = op(a[y][x], b[y][x], c[y][x]);
        }
    }
    return a;
}

function calcExpression(setA, setB, setC, expr) {
    if (!expr)
        return new XSet("",  "");
    expr = replaceAll(expr.toLowerCase(), "*+~uo", ['&','|','!','1','0']);

    const op = new Function("a,b,c", "return " + expr);
    const uKeys = [...setU.innerSet.keys()].map(x => x.toString()); 

    const res = new Set()
    for (let k of uKeys) {
        let a = setA.innerSet.has(k);
        let b = setB.innerSet.has(k);
        let c = setC.innerSet.has(k);
        if (op(a,b,c)) {
           res.add(k);
        }
    }
    let str = [...res.keys()].sort().join('');
    return new XSet("white", str);
}


//======================= Set Stage Suit =========================

// Описание сцен: [формула, алгоритм, тестовый_пример]
// ax = 0; ay = 0;   - по умолчанию    
// ax, bx, cx - центры кругов, ar, br, cr - радиусы кругов
// cz - расстояние по гориз до запасного поля, , czr - радиус
// ab, bc, ac, abc - размеры пересечений множеств 
const stages = [
    
["", "", ""],
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
["a-ab-abc-b-c", "bx = ar + br - ab;  czr = abc/2;  cr -= czr;  cx = -ar -cr;  cz = bx-br+czr-cx;", "012345-345678-349a"], // 30
["a-ab-abc-ac-b-c", "bx = ar + br - ab;  czr = abc/2;  cr -= czr;  cx = -ar +ac/2 -cr;  cz = bx-br+czr-cx;", "12345-345678-ab134"], 
["a-ab-ac-b-bc-c", "bx = ar + br - ab; czr = bc/2;  cr -= czr;  cx = -ar +ac/2 -cr;  cz = bx+br-czr-cx;", "12345-345678-0178"],  
["a-ac-b-bc", "bx = ar + br; cx = ar + cr - ac;", "12345-6789-4567"], 
["a-abc-ac-b-bc", "bx = ar + br - ab; cx = ar - ac + cr;", "012345-456789-23456"],
["a-b-c", "bx = ar + br; cx = -ar - cr;", "12345-6789-0asdf"],  // 35
["a-ab-b-c", "bx = ar + br - ab; cx = -ar - cr;", "12345-45678-0abcd"],
["a-ab-ac-b-c", "bx = ar + br - ab; cx = -ar + ac - cr;", "12345-345678-0a12"],
// ["a-ab-abc-ac-b-bc-c", "bx = ar + br - ab; let t = ab/2; cx = ar - t; ay=by = -t; cy = t;", "1267-2347-4567"],  // 38
["a-ab-abc-ac-b-bc-c", "bx = ar + br - ab; czr=bc/2; cr-=czr; cx=-ar+ac-abc-cr; cz=ar-abc+czr-cx;", "1267-2347-4567"],  // 38
];

function setStage(setA, setB, setC) {
    decode(getVariants(setA.innerSet, setB.innerSet, setC.innerSet));
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
    let formulasFromVariants = variants.map(x => x.formula);
    for (let stage of stages) 
    {       
        let formula = stage[0]; 
        let i = formulasFromVariants.indexOf(formula);
        if (i != -1) {
            info.innerHTML = formula;  // for debug          
            doStage(variants[i].permut, stage);
            return;
        } 
    }
    info.innerHTML = " Not found";
    throw new Error( "Stage not finded.");    
}

// Создает сцену
//
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

        function difference(setX, setY) {
            let counter = intersect(setX, setY);
            return (setX.innerSet.size - counter) * 20;
        }

    // Устанавливает геометрические свойства экземпляров XSet
    //
    const func = new Function (  
    `a, b, c, x, y, f, g`
    ,
    `let ax, bx, cx, ay, by, cy, ar, br, cr;
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
    `);
     
    const x = canvas.width / 2, y = canvas.height / 2;

    switch (permut) {
        case "abc": func(setA, setB, setC, x, y, intersect, difference); break; 
        // обратные перестановки!  abc->acb ::: abc<-acb ::: a<-a, b<-c; c<-b  :::  ACB
        case "acb": func(setA, setC, setB, x, y, intersect, difference); break; 
        case "bac": func(setB, setA, setC, x, y, intersect, difference); break;  
        case "bca": func(setC, setA, setB, x, y, intersect, difference); break;  
        case "cab": func(setB, setC, setA, x, y, intersect, difference); break;  
        case "cba": func(setC, setB, setA, x, y, intersect, difference); break;  
    }
}


