var mybuffer = new Buffer(26);
var len;

//len = mybuffer.write("I'm a buffer!");

//console.log(len.toString());

for(var i = 0; i < 26; i++){
	mybuffer[i] = i + 97;
}

console.log(mybuffer.toString("ascii"));