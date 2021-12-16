
btnGo.addEventListener('click', refresh);

function refresh() {
    // get inputs                                    //  todo анализ корректности входов
    setA = new XSet("red",   inputA.value);
    setB = new XSet("green", inputB.value);
    setC = new XSet("blue",  inputC.value);
    setU = new XSet("",  "");
    let matrixR = setR = null;
    let convert = new Convert();

    switch (STATE) {
        case 0: // SETS
        convert.fromSet();    
        setR = calcExpression(setA, setB, setC, $expr.value);
        // drawing
        setStage(setA, setB, setC);
        drawSets(); 
        matrixR = calcSetMatrix(setA, setB, setC, $expr.value);
        drawSets(matrixR);   
        break;

        case 1: // NUMBERS
        convert.fromNumber();
        setR = calcExpression(setA, setB, setC, $expr.value);
        convert.toNumber(setR);
        drawNumbers(setR);
        break;

        case 2: // EXTREMS
        convert.fromExtrem(); 
        setR = calcExpression(setA, setB, setC, $expr.value);
        convert.toExtrem(setR);
        drawExtrems(setR);
        break;
    }
    if (STATE != -1) $exprRes.innerHTML = setR.str;
}


// test for sets only
btnTest.addEventListener('click', function(e) {
    let i = +inputTest.value;
    let [a,b,c] = stages[i][2].split('-');
    inputA.value = a ? a : "";
    inputB.value = b ? b : "";
    inputC.value = c ? c : "";
    setStage(setA, setB, setC);
    drawSets();
    inputTest.value = i + 1;  
})
