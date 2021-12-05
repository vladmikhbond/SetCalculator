

function draw(matrix) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // fill circles startig from the smallest 
    let sets = [setA, setB, setC].sort((a,b) => b.r - a.r);   
    for (let set of sets) {
        ctx.fillStyle = set.color;
        ctx.beginPath();
        ctx.arc(set.x, set.y, set.r, 0, Math.PI*2, true); 
        ctx.fill()
    }   
    // current
    if (current) {
        let r = current.r;
        ctx.fillStyle = current.color;
        ctx.beginPath();
        ctx.arc(current.x, current.y, current.r, 0, Math.PI*2, true); 
        ctx.fill();
    }
    // matrix
    if (matrix) {
        const D = 1;
        for (let row = 0; row < N; row++) {
            for (let col = 0; col < N; col++) {
                if (matrix[row][col]) {  
                    let x = col * Kx, y = row * Ky;
                    ctx.fillStyle = row % 3 ? "black" : "white";
                    ctx.fillRect(x - Kx/2, y - Ky/2, D, D);                
                }
            }
        }
    }
    // sets stroke    
    ctx.strokeStyle = "white";
    for (let s of [setA, setB, setC]) {
        ctx.beginPath(); 
        ctx.arc(s.x, s.y, s.r, 0,Math.PI*2,true); 
        ctx.stroke();
    }   
    

}

