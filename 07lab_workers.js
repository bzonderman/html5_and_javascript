queue = [];

addEventListener('message', function(e) {
	//get relevant values out of message
	//create a job that computes the solution to these values
	//and send the solution back to the main web page
	//put this job in the queue	  
	
	//call "compute(a, b, c)" to calculate the solutions to x^3 + ax^2 + bx + c = 0
	//it will return an object with fields "a", "b", and "c" that correspond to the solution coefficients
	}, false);

setInterval(function() {
	//check the queue for tasks ... if there is a task, run it
}, 3000);

function compute(A, B, C) // x^3 + ax^2 + bx + c = 0
{    
    if (isNaN(A)||isNaN(B)||isNaN(C))
    {
        throw new Error("Invalid input!");
        return;
    }

    Im = cubic(A, B, C);
    if (Im == 0.0)                              // real roots
    {
        return  { a: frealstr(X1, 7, 6), b: frealstr(X2, 7, 6), c: frealstr(X3, 7, 6)};
    }
    else                                        // real and complex pair
    {
		return { a: frealstr(X1, 7, 6),
			b: frealstr(X2, 7, 6) + " + " + frealstr(Im, 7, 6) + "j",
			c: frealstr(X3, 7, 6) + " - " + frealstr(Im, 7, 6) + "j"};
    }
}

// compute real or complex roots of cubic polynomial
function cubic( A, B, C )
{
    var Q, R, D, S, T, Im;
    var Q = (3*B - Math.pow(A, 2))/9;
    var R = (9*A*B - 27*C - 2*Math.pow(A, 3))/54;
    var D = Math.pow(Q, 3) + Math.pow(R, 2);    // polynomial discriminant
    if (D >= 0)                                 // complex or duplicate roots
    {
        var S = sgn(R + Math.sqrt(D))*Math.pow(Math.abs(R + Math.sqrt(D)),(1/3));
        var T = sgn(R - Math.sqrt(D))*Math.pow(Math.abs(R - Math.sqrt(D)),(1/3));
        X1 = -A/3 + (S + T);                    // real root
        X2 = -A/3 - (S + T)/2;                  // real part of complex root
        X3 = -A/3 - (S + T)/2;                  // real part of complex root
        Im = Math.abs(Math.sqrt(3)*(S - T)/2);  // complex part of root pair
    }
    else                                        // distinct real roots
    {
        var th = Math.acos(R/Math.sqrt(-Math.pow(Q, 3)));
        X1 = 2*Math.sqrt(-Q)*Math.cos(th/3) - A/3;
        X2 = 2*Math.sqrt(-Q)*Math.cos((th + 2*Math.PI)/3) - A/3;
        X3 = 2*Math.sqrt(-Q)*Math.cos((th + 4*Math.PI)/3) - A/3;
        Im = parseFloat("0.0");
    }
    return Im;                                  // 0.0 if real roots
}

// sign of number
function sgn( x )
{
    if (x < 0.0) return -1;
    return 1;
}

// format a floating point number
function frealstr( num, width, fract )
{
    var str = num.toFixed(fract);
    var len = str.length;
    var real = "";
    var i;

    for (i = 0; i < width - len; i++)           // append leading spaces
        real += ' ';


    for (i = 0; i < len; i++)                   // append digits
        real += str.charAt(i);

    return real;
}
