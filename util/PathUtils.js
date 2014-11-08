Lavender.PathUtils = function(){

}

Lavender.PathUtils.parsePathFromString = function(strPath)
{
    strPath = Lavender.StringUtil.trim(Lavender.StringUtil.compressSpaces(strPath));
    var arr = strPath.split(" ");
    var curElement;
    var counter = 0;
    var result = [];
    var len = arr.length;
    do
    {
        curElement = arr[counter];
        var value = parseFloat(curElement);
        if (isNaN(value) || value == undefined)
        {
            // command
            result.push(curElement);
        }
        else
        {
            // point
            var y = parseFloat(arr[++counter]);
            result.push(new Point(Lavender.MathUtils.toFixed(value), Lavender.MathUtils.toFixed(y)));
        }
    }
    while (++counter < len);

    return result;
}

Lavender.PathUtils.isPoint = function (obj){
    return (obj.hasOwnProperty("x") && obj.hasOwnProperty("y"));
}

Lavender.PathUtils.convertPathToString = function(arrPath){
    var res = "";
    arrPath.forEach( function (elem) {
        if (Lavender.PathUtils.isPoint(elem)) {
            res += Lavender.MathUtils.toFixed(elem.x) + " " + Lavender.MathUtils.toFixed(elem.y);
        }
        else {
            res += elem;
        }

        res += " ";
    });

    return Lavender.StringUtil.trim(res);
}

Lavender.PathUtils.movePath = function(arrPath, dx, dy, updateSource) {

    updateSource = updateSource != undefined ? updateSource : true;
    var res = []
    arrPath.forEach( function (elem) {
        if (Lavender.PathUtils.isPoint(elem)) {
            if (updateSource) {
                elem.x += dx;
                elem.y += dy;
            }
            else {
                res.push(new Point(elem.x + dx, elem.y + dy));
            }
        }
        else if (!updateSource){
            res.push(elem);
        }
    });

    return updateSource ? arrPath : res;
}

Lavender.PathUtils.scalePath = function(arrPath, scaleX, scaleY, aroundPoint, updateSource) {
    updateSource = updateSource != undefined ? updateSource : true;
    aroundPoint = aroundPoint || new Point(0,0);

    var matrix = new Matrix();
    matrix = matrix.scale(scaleX, scaleY, aroundPoint);

    var zero =  matrix.transformPoint(new Point(0, 0));
    var res = [];
    arrPath.forEach(function (obj) {
        if (Lavender.PathUtils.isPoint(obj))
        {
            var newPoint = matrix.transformPoint(obj);
            if (updateSource) {
                obj.x = newPoint.x - zero.x;
                obj.y = newPoint.y - zero.y;
            }
            else {
                res.push(new Point(newPoint.x - zero.x, newPoint.y - zero.y));
            }
        } else if (!updateSource) {
            res.push(obj);
        }
    });

    return updateSource ? arrPath : res;
}

Lavender.PathUtils.rotatePath = function(arrPath, aroundPoint, degAngle, updateSource) {
    updateSource = updateSource != undefined ? updateSource : true;
    var matrix = new Matrix();
    matrix = matrix.rotate(Lavender.MathUtils.degreeToRadian(degAngle), aroundPoint);

    var res = [];
    arrPath.forEach(function (obj) {
        if (Lavender.PathUtils.isPoint(obj)) {
            var newPoint = matrix.transformPoint(obj);
            if (updateSource) {
                obj.x = newPoint.x;
                obj.y = newPoint.y
            }
            else {
                res.push(newPoint);
            }
        } else if (!updateSource) {
            res.push(obj);
        }
    });

    return updateSource ? arrPath : res;
}

/*
* containerParams : {width, height, rotation, top, left}
* */
Lavender.PathUtils.convertPathFromLocalToGlobal = function(arrPath, containerParams) {

    // Move to global coords
    var res = Lavender.PathUtils.movePath(arrPath, containerParams.left, containerParams.top, false);
    var globalCenter = new Point(containerParams.left + containerParams.width / 2, containerParams.top + containerParams.height / 2);
    // Rotate around global center
    Lavender.PathUtils.rotatePath(res, globalCenter, containerParams.rotation);

    return res;
}

/*
* containerParams : {width, height, rotation, top, left}
* */
Lavender.PathUtils.convertPathFromGlobalToLocal = function(arrPath, containerParams) {

    // Unrotate around global center
    var globalCenter = new Point(containerParams.left + containerParams.width / 2, containerParams.top + containerParams.height / 2);
    var res = Lavender.PathUtils.rotatePath(arrPath, globalCenter, -containerParams.rotation, false);

    // Move to local coords
    Lavender.PathUtils.movePath(res, -containerParams.left, -containerParams.top);

    return res;
}

Lavender.PathUtils.PathParser = function(arrPath) {
    this.arrPath = arrPath;
    this.i = -1;
    this.command = '';
    this.previousCommand = '';
    this.start = new Point(0, 0);
    this.control = new Point(0, 0);
    this.current = new Point(0, 0);

    this.isEnd = function() {
        return this.i >= this.arrPath.length - 1;
    }

    this.isCommandOrEnd = function() {
        if (this.isEnd()) {
            return true;
        }
        var value = this.arrPath[this.i + 1];
        var isString = (typeof value == 'string' || value instanceof String);
        return (isString && value.match(/^[A-Za-z]$/) != null);
    }

    this.isRelativeCommand = function() {
        switch(this.command)
        {
            case 'm':
            case 'l':
            case 'h':
            case 'v':
            case 'c':
            case 's':
            case 'q':
            case 't':
            case 'a':
            case 'z':
                return true;
                break;
        }
        return false;
    }

    this.getToken = function() {
        this.i++;
        return this.arrPath[this.i];
    }

    this.nextCommand = function() {
        this.previousCommand = this.command;
        this.command = this.getToken();
    }

    this.getPoint = function() {
        var p = this.getToken();
        return this.makeAbsolute(p);
    }

    this.getAsControlPoint = function() {
        var p = this.getPoint();
        this.control = p;
        return p;
    }

    this.getAsCurrentPoint = function() {
        var p = this.getPoint();
        this.current = p;
        return p;
    }

    this.getReflectedControlPoint = function() {
        if (this.previousCommand.toLowerCase() != 'c' &&
            this.previousCommand.toLowerCase() != 's' &&
            this.previousCommand.toLowerCase() != 'q' &&
            this.previousCommand.toLowerCase() != 't' ){
            return this.current;
        }

        // reflect point
        var p = new Point(2 * this.current.x - this.control.x, 2 * this.current.y - this.control.y);
        return p;
    }

    this.makeAbsolute = function(p) {
        if (this.isRelativeCommand()) {
            p.x += this.current.x;
            p.y += this.current.y;
        }
        return p;
    }
};

Lavender.PathUtils.drawPath = function(context, arrPath) {
    if (!context || !arrPath) {
        return;
    }

    var pp = new Lavender.PathUtils.PathParser(arrPath);

    context.beginPath();

    while (!pp.isEnd()) {
        pp.nextCommand();
        switch (pp.command) {
        case 'M':
        case 'm':
            var p = pp.getAsCurrentPoint();
            context.moveTo(p.x, p.y);
            pp.start = pp.current;
            while (!pp.isCommandOrEnd()) {
                var p = pp.getAsCurrentPoint();
                context.lineTo(p.x, p.y);
            }
            break;
        case 'L':
        case 'l':
            while (!pp.isCommandOrEnd()) {
                var c = pp.current;
                var p = pp.getAsCurrentPoint();
                context.lineTo(p.x, p.y);
            }
            break;
        case 'H':
        case 'h':
            while (!pp.isCommandOrEnd()) {
                var newP = new Point((pp.isRelativeCommand() ? pp.current.x : 0) + pp.getScalar(), pp.current.y);
                pp.current = newP;
                context.lineTo(pp.current.x, pp.current.y);
            }
            break;
        case 'V':
        case 'v':
            while (!pp.isCommandOrEnd()) {
                var newP = new Point(pp.current.x, (pp.isRelativeCommand() ? pp.current.y : 0) + pp.getScalar());
                pp.current = newP;
                context.lineTo(pp.current.x, pp.current.y);
            }
            break;
        case 'C':
        case 'c':
            while (!pp.isCommandOrEnd()) {
                var curr = pp.current;
                var p1 = pp.getPoint();
                var cntrl = pp.getAsControlPoint();
                var cp = pp.getAsCurrentPoint();
                context.bezierCurveTo(p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
            }
            break;
        case 'S':
        case 's':
            while (!pp.isCommandOrEnd()) {
                var curr = pp.current;
                var p1 = pp.getReflectedControlPoint();
                var cntrl = pp.getAsControlPoint();
                var cp = pp.getAsCurrentPoint();
                context.bezierCurveTo(p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
            }
            break;
        case 'Q':
        case 'q':
            while (!pp.isCommandOrEnd()) {
                var curr = pp.current;
                var cntrl = pp.getAsControlPoint();
                var cp = pp.getAsCurrentPoint();
                context.quadraticCurveTo(cntrl.x, cntrl.y, cp.x, cp.y);
            }
            break;
        case 'T':
        case 't':
            while (!pp.isCommandOrEnd()) {
                var curr = pp.current;
                var cntrl = pp.getReflectedControlPoint();
                pp.control = cntrl;
                var cp = pp.getAsCurrentPoint();
                context.quadraticCurveTo(cntrl.x, cntrl.y, cp.x, cp.y);
            }
            break;
        case 'A':
        case 'a':
            while (!pp.isCommandOrEnd()) {
                var curr = pp.current;
                var rx = pp.getScalar();
                var ry = pp.getScalar();
                var xAxisRotation = pp.getScalar() * (Math.PI / 180.0);
                var largeArcFlag = pp.getScalar();
                var sweepFlag = pp.getScalar();
                var cp = pp.getAsCurrentPoint();

                // Conversion from endpoint to center parameterization
                // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
                // x1', y1'
                var currp = new Point(
                    Math.cos(xAxisRotation) * (curr.x - cp.x) / 2.0 + Math.sin(xAxisRotation) * (curr.y - cp.y) / 2.0,
                    -Math.sin(xAxisRotation) * (curr.x - cp.x) / 2.0 + Math.cos(xAxisRotation) * (curr.y - cp.y) / 2.0
                );
                // adjust radii
                var l = Math.pow(currp.x,2)/Math.pow(rx,2)+Math.pow(currp.y,2)/Math.pow(ry,2);
                if (l > 1) {
                    rx *= Math.sqrt(l);
                    ry *= Math.sqrt(l);
                }
                // cx', cy'
                var s = (largeArcFlag == sweepFlag ? -1 : 1) * Math.sqrt(
                    ((Math.pow(rx,2)*Math.pow(ry,2))-(Math.pow(rx,2)*Math.pow(currp.y,2))-(Math.pow(ry,2)*Math.pow(currp.x,2))) /
                    (Math.pow(rx,2)*Math.pow(currp.y,2)+Math.pow(ry,2)*Math.pow(currp.x,2))
                );
                if (isNaN(s)) s = 0;
                var cpp = new Point(s * rx * currp.y / ry, s * -ry * currp.x / rx);
                // cx, cy
                var centp = new Point(
                    (curr.x + cp.x) / 2.0 + Math.cos(xAxisRotation) * cpp.x - Math.sin(xAxisRotation) * cpp.y,
                    (curr.y + cp.y) / 2.0 + Math.sin(xAxisRotation) * cpp.x + Math.cos(xAxisRotation) * cpp.y
                );
                // vector magnitude
                var m = function(v) { return Math.sqrt(Math.pow(v[0],2) + Math.pow(v[1],2)); }
                // ratio between two vectors
                var r = function(u, v) { return (u[0]*v[0]+u[1]*v[1]) / (m(u)*m(v)) }
                // angle between two vectors
                var a = function(u, v) { return (u[0]*v[1] < u[1]*v[0] ? -1 : 1) * Math.acos(r(u,v)); }
                // initial angle
                var a1 = a([1,0], [(currp.x-cpp.x)/rx,(currp.y-cpp.y)/ry]);
                // angle delta
                var u = [(currp.x-cpp.x)/rx,(currp.y-cpp.y)/ry];
                var v = [(-currp.x-cpp.x)/rx,(-currp.y-cpp.y)/ry];
                var ad = a(u, v);
                if (r(u,v) <= -1) ad = Math.PI;
                if (r(u,v) >= 1) ad = 0;

                // for markers
                var dir = 1 - sweepFlag ? 1.0 : -1.0;
                var ah = a1 + dir * (ad / 2.0);
                var halfWay = new Point(
                    centp.x + rx * Math.cos(ah),
                    centp.y + ry * Math.sin(ah)
                );

                var r = rx > ry ? rx : ry;
                var sx = rx > ry ? 1 : rx / ry;
                var sy = rx > ry ? ry / rx : 1;

                context.translate(centp.x, centp.y);
                context.rotate(xAxisRotation);
                context.scale(sx, sy);
                context.arc(0, 0, r, a1, a1 + ad, 1 - sweepFlag);
                context.scale(1/sx, 1/sy);
                context.rotate(-xAxisRotation);
                context.translate(-centp.x, -centp.y);
            }
            break;
        case 'Z':
        case 'z':
            context.closePath();
            pp.current = pp.start;
        }
    }
}

