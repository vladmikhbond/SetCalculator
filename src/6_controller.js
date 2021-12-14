
btnGo.addEventListener('click', refresh);

function refresh() {
    // get inputs                                      todo анализ корректности входов
    setA = new XSet("red",   inputA.value);
    setB = new XSet("green", inputB.value);
    setC = new XSet("blue",  inputC.value);
    let matrixR = setR = null;
    let convert = new Convert();

    switch (STATE) {
        case 0: // SETS
        setR = calcSetExpression(setA, setB, setC, $expr.value);
        // drawing
        setStage(setA, setB, setC);
        drawSets(); 
        matrixR = calcSetMatrix(setA, setB, setC, $expr.value);
        drawSets(matrixR);   
        break;

        case 1: // NUMBERS
        convert.numberToSets(setA, setB, setC);
        setR = calcSetExpression(setA, setB, setC, $expr.value);
        convert.setToNumber(setR);
        // drawing
        drawNumbers(setR);
        break;

        case 2: // EXTREMS
        convert.extremToSets(setA, setB, setC); 
        setR = calcSetExpression(setA, setB, setC, $expr.value);
        convert.setToExtrem(setR);
        // drawing
        drawExtrems(setR);
        // setStage(setA, setB, setC);
        // drawSets(); 
        // matrixR = calcSetMatrix(setA, setB, setC, $expr.value);
        // drawSets(matrixR);  
        break;
    }
    $exprRes.innerHTML = setR.str;
}


// SETS ============================================

// test for sets 
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
