
btnGo.addEventListener('click', refresh);

function refresh() {
    // get inputs                                    //  todo анализ корректности входов
    setA = new XSet("red",   inputA.value);
    setB = new XSet("green", inputB.value);
    setC = new XSet("blue",  inputC.value);
    setU = new XSet("",  "");
    let setR = null;
    let matrixR = null;
    let convert = new Convert();
    
    let expression = $expr.value;
    if (expression != "") {
        expression = replaceAll(expression.toLowerCase(), "*+~uo", ['&','|','!','1','0']);
        if ($oper.value.trim() != "") {
            expression = substOperators($oper.value, expression);
        }
    }
    

    switch (STATE) {
        case 0: // SETS
        convert.fromSet();    
        setR = calcExpression(setA, setB, setC, expression);
        // drawing
        setStage(setA, setB, setC);
        drawSets(); 
        matrixR = calcMatrix(setA, setB, setC, expression);
        drawSets(matrixR);   
        break;

        case 1: // NUMBERS
        convert.fromNumber();
        setR = calcExpression(setA, setB, setC, expression);
        convert.toNumber(setR);
        drawNumbers(setR);
        break;

        case 2: // EXTREMS
        convert.fromExtrem(); 
        setR = calcExpression(setA, setB, setC, expression);
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
