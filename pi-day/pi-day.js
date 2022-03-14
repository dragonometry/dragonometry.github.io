// **********************************
// Computing PI with Leibniz formula.
// Converges slowly.
// This is the JavaScript Version.
// **********************************

var digitsToFind = 9;
var p = 0;
var cycles = 0;
var sign = 1;

var digits = 0;

var pDigits = Math.floor(p * Math.pow(10, digits));
var previousDigits;

document.write("Finding " + digitsToFind + " digits. <br><br>");

while (digits < digitsToFind) {
    previousDigits = pDigits;

    p = p + sign * (4 / (2 * cycles + 1));
    pDigits = Math.floor(p * Math.pow(10,digits));

    // When a new digit is
    // in place, print.
    if (pDigits - previousDigits === 0) {

        document.write(pDigits / Math.pow(10, digits) +
            "  (Cycles = " + cycles + ")<br>");
            
        digits++;
    }

    sign *= -1;
    cycles++;
}

document.write("<br>Code is finished computing.");
