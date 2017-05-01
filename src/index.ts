function main() {
    const vertexShaderSource = require("./gl/vertexShader.c");
    const fragmentShaderSource = require("./gl/fragmentShader.c");
    var myCanvasObject = <HTMLCanvasElement>document.getElementById('example');
    const gl = myCanvasObject.getContext("webgl");

    gl.viewport(0, 0, myCanvasObject.clientWidth, myCanvasObject.clientHeight);

    const vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShaderObject, vertexShaderSource);
    gl.shaderSource(fragmentShaderObject, fragmentShaderSource);

    gl.compileShader(vertexShaderObject);
    gl.compileShader(fragmentShaderObject);

    const programObject = gl.createProgram();

    gl.attachShader(programObject, vertexShaderObject);
    gl.attachShader(programObject, fragmentShaderObject);
    const v3PositionIndex = 0
    // gl.bindAttribLocation(programObject, v3PositionIndex, "v3Position");

    gl.linkProgram(programObject);
    gl.useProgram(programObject);

    var jsArrayData = [
        0.0, 1.0, 0.0,//上顶点
        -1.0, -1.0, 0.0,//左顶点
        -.5, -.5, 0.0,//左顶点
        1.0, 0.0, 0.0];//右顶点

    const triangleBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(jsArrayData), gl.STATIC_DRAW);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);


    gl.enableVertexAttribArray(v3PositionIndex);

    gl.vertexAttribPointer(v3PositionIndex, 3, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES,0,4)
}
window.onload = function () {
    main();
}
