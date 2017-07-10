import {MathUtils} from './MathUtils';
import {StringUtil} from './StringUtil';
import {Matrix} from './Matrix';
import {Point} from './Point';

export type containerParams = {width: number, height: number, rotation: number, top: number, left: number};
export type pathArray = Point[];
export class PathUtils {
	public static parsePathFromString(strPath: string):Array<Object> {
		strPath = StringUtil.trim(StringUtil.compressSpaces(strPath));
	    let arr = strPath.split(" ");
	    let curElement;
	    let counter = 0;
	    let result = [];
	    let len = arr.length;
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
	            let y = parseFloat(arr[++counter]);
	            result.push(new Point(MathUtils.toFixed(value), MathUtils.toFixed(y)));
	        }
	    }
	    while (++counter < len);

	    return result;
    }
	
	public static isPoint(obj: object): boolean {
		return (obj.hasOwnProperty("x") && obj.hasOwnProperty("y"));
	}
	
	public static convertPathToString(arrPath: pathArray): string {
		let res = "";
	    arrPath.forEach(elem => {
	        if (PathUtils.isPoint(elem)) {
	            res += MathUtils.toFixed(elem.x) + " " + MathUtils.toFixed(elem.y);
	        }
	        else {
	            res += elem;
	        }

	        res += " ";
	    });

	    return StringUtil.trim(res);
	}
	
	public static movePath(arrPath: pathArray, dx: number, dy: number, updateSource?: boolean): pathArray {
		updateSource = updateSource != undefined ? updateSource : true;
	    let res = []
	    arrPath.forEach(elem => {
	        if (PathUtils.isPoint(elem)) {
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
	
	public static scalePath(arrPath: pathArray, scaleX: number, scaleY: number, aroundPoint: Point, updateSource?: boolean): pathArray {
		updateSource = updateSource != undefined ? updateSource : true;
	    aroundPoint = aroundPoint || new Point(0,0);

	    let matrix = new Matrix();
	    matrix = matrix.scale(scaleX, scaleY, aroundPoint);

	    let zero =  matrix.transformPoint(new Point(0, 0));
	    let res = [];
	    arrPath.forEach(obj => {
	        if (PathUtils.isPoint(obj))
	        {
	            let newPoint = matrix.transformPoint(obj);
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
	
	public static rotatePath(arrPath: pathArray, aroundPoint: Point, degAngle: number, updateSource?: boolean): pathArray {
		updateSource = updateSource != undefined ? updateSource : true;
	    let matrix = new Matrix();
	    matrix = matrix.rotate(MathUtils.degreeToRadian(degAngle), aroundPoint);

	    let res = [];
	    arrPath.forEach(obj => {
	        if (PathUtils.isPoint(obj)) {
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
	public static convertPathFromLocalToGlobal(arrPath: pathArray, containerParams: containerParams): pathArray {
		// Move to global coords
	    let res = PathUtils.movePath(arrPath, containerParams.left, containerParams.top, false);
	    let globalCenter = new Point(containerParams.left + containerParams.width / 2, containerParams.top + containerParams.height / 2);
	    // Rotate around global center
	    PathUtils.rotatePath(res, globalCenter, containerParams.rotation);

	    return res;
	}
	
	/*
	* containerParams : {width, height, rotation, top, left}
	* */
	public static convertPathFromGlobalToLocal(arrPath: pathArray, containerParams: containerParams): pathArray {
		// Unrotate around global center
	    let globalCenter = new Point(containerParams.left + containerParams.width / 2, containerParams.top + containerParams.height / 2);
	    let res = PathUtils.rotatePath(arrPath, globalCenter, -containerParams.rotation, false);

	    // Move to local coords
	    PathUtils.movePath(res, -containerParams.left, -containerParams.top);

	    return res;
	}
	
	public static drawPath(context, arrPath: pathArray): void {
		if (!context || !arrPath) {
	        return;
	    }

	    let pp = new PathParser(arrPath);

	    context.beginPath();

	    while (!pp.isEnd()) {
	        pp.nextCommand();
	        switch (pp.command) {
	        case 'M':
	        case 'm':
	            let p = pp.getAsCurrentPoint();
	            context.moveTo(p.x, p.y);
	            pp.start = pp.current;
	            while (!pp.isCommandOrEnd()) {
	                let p = pp.getAsCurrentPoint();
	                context.lineTo(p.x, p.y);
	            }
	            break;
	        case 'L':
	        case 'l':
	            while (!pp.isCommandOrEnd()) {
	                let c = pp.current;
	                let p = pp.getAsCurrentPoint();
	                context.lineTo(p.x, p.y);
	            }
	            break;
	        case 'H':
	        case 'h':
	            while (!pp.isCommandOrEnd()) {
	                let newP = new Point((pp.isRelativeCommand() ? pp.current.x : 0) + pp.getScalar(), pp.current.y);
	                pp.current = newP;
	                context.lineTo(pp.current.x, pp.current.y);
	            }
	            break;
	        case 'V':
	        case 'v':
	            while (!pp.isCommandOrEnd()) {
	                let newP = new Point(pp.current.x, (pp.isRelativeCommand() ? pp.current.y : 0) + pp.getScalar());
	                pp.current = newP;
	                context.lineTo(pp.current.x, pp.current.y);
	            }
	            break;
	        case 'C':
	        case 'c':
	            while (!pp.isCommandOrEnd()) {
	                let curr = pp.current;
	                let p1 = pp.getPoint();
	                let cntrl = pp.getAsControlPoint();
	                let cp = pp.getAsCurrentPoint();
	                context.bezierCurveTo(p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
	            }
	            break;
	        case 'S':
	        case 's':
	            while (!pp.isCommandOrEnd()) {
	                let curr = pp.current;
	                let p1 = pp.getReflectedControlPoint();
	                let cntrl = pp.getAsControlPoint();
	                let cp = pp.getAsCurrentPoint();
	                context.bezierCurveTo(p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
	            }
	            break;
	        case 'Q':
	        case 'q':
	            while (!pp.isCommandOrEnd()) {
	                let curr = pp.current;
	                let cntrl = pp.getAsControlPoint();
	                let cp = pp.getAsCurrentPoint();
	                context.quadraticCurveTo(cntrl.x, cntrl.y, cp.x, cp.y);
	            }
	            break;
	        case 'T':
	        case 't':
	            while (!pp.isCommandOrEnd()) {
	                let curr = pp.current;
	                let cntrl = pp.getReflectedControlPoint();
	                pp.control = cntrl;
	                let cp = pp.getAsCurrentPoint();
	                context.quadraticCurveTo(cntrl.x, cntrl.y, cp.x, cp.y);
	            }
	            break;
	        case 'A':
	        case 'a':
	            while (!pp.isCommandOrEnd()) {
	                let curr = pp.current;
	                let rx = pp.getScalar();
	                let ry = pp.getScalar();
	                let xAxisRotation = pp.getScalar() * (Math.PI / 180.0);
	                let largeArcFlag = pp.getScalar();
	                let sweepFlag = pp.getScalar();
	                let cp = pp.getAsCurrentPoint();

	                // Conversion from endpoint to center parameterization
	                // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
	                // x1', y1'
	                let currp = new Point(
	                    Math.cos(xAxisRotation) * (curr.x - cp.x) / 2.0 + Math.sin(xAxisRotation) * (curr.y - cp.y) / 2.0,
	                    -Math.sin(xAxisRotation) * (curr.x - cp.x) / 2.0 + Math.cos(xAxisRotation) * (curr.y - cp.y) / 2.0
	                );
	                // adjust radii
	                let l = Math.pow(currp.x,2)/Math.pow(rx,2)+Math.pow(currp.y,2)/Math.pow(ry,2);
	                if (l > 1) {
	                    rx *= Math.sqrt(l);
	                    ry *= Math.sqrt(l);
	                }
	                // cx', cy'
	                let s = (largeArcFlag == sweepFlag ? -1 : 1) * Math.sqrt(
	                    ((Math.pow(rx,2)*Math.pow(ry,2))-(Math.pow(rx,2)*Math.pow(currp.y,2))-(Math.pow(ry,2)*Math.pow(currp.x,2))) /
	                    (Math.pow(rx,2)*Math.pow(currp.y,2)+Math.pow(ry,2)*Math.pow(currp.x,2))
	                );
	                if (isNaN(s)) s = 0;
	                let cpp = new Point(s * rx * currp.y / ry, s * -ry * currp.x / rx);
	                // cx, cy
	                let centp = new Point(
	                    (curr.x + cp.x) / 2.0 + Math.cos(xAxisRotation) * cpp.x - Math.sin(xAxisRotation) * cpp.y,
	                    (curr.y + cp.y) / 2.0 + Math.sin(xAxisRotation) * cpp.x + Math.cos(xAxisRotation) * cpp.y
	                );
	                // vector magnitude
	                let m = function(v) { return Math.sqrt(Math.pow(v[0],2) + Math.pow(v[1],2)); }
	                // ratio between two vectors
	                let r = function(u, v) { return (u[0]*v[0]+u[1]*v[1]) / (m(u)*m(v)) }
	                // angle between two vectors
	                let a = function(u, v) { return (u[0]*v[1] < u[1]*v[0] ? -1 : 1) * Math.acos(r(u,v)); }
	                // initial angle
	                let a1 = a([1,0], [(currp.x-cpp.x)/rx,(currp.y-cpp.y)/ry]);
	                // angle delta
	                let u = [(currp.x-cpp.x)/rx,(currp.y-cpp.y)/ry];
	                let v = [(-currp.x-cpp.x)/rx,(-currp.y-cpp.y)/ry];
	                let ad = a(u, v);
	                if (r(u,v) <= -1) ad = Math.PI;
	                if (r(u,v) >= 1) ad = 0;

	                // for markers
	                let dir = 1 - sweepFlag ? 1.0 : -1.0;
	                let ah = a1 + dir * (ad / 2.0);
	                let halfWay = new Point(
	                    centp.x + rx * Math.cos(ah),
	                    centp.y + ry * Math.sin(ah)
	                );

	                let cr = rx > ry ? rx : ry;
	                let sx = rx > ry ? 1 : rx / ry;
	                let sy = rx > ry ? ry / rx : 1;

	                context.translate(centp.x, centp.y);
	                context.rotate(xAxisRotation);
	                context.scale(sx, sy);
	                context.arc(0, 0, cr, a1, a1 + ad, 1 - sweepFlag);
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
}

export class PathParser {
	private arrPath: pathArray;
	private i: number;
	public command: string | Point;
	public previousCommand: string | Point;
	public start: Point;
	public control: Point;
	public current: Point;
	
	constructor(arrPath: pathArray) {
		this.arrPath = arrPath;
		this.i = -1;
		this.command = '';
		this.previousCommand = '';
		this.start = new Point(0, 0);
		this.control = new Point(0, 0);
		this.current = new Point(0, 0);
	}
	
	public isEnd(): boolean {
		return this.i >= this.arrPath.length - 1;
	}
	
	public isCommandOrEnd(): boolean {
		if (this.isEnd()) {
			return true;
		}
		let value = this.arrPath[this.i + 1];
		return ((typeof value == 'string' || value instanceof String) && value.match(/^[A-Za-z]$/) != null);
	}

	public isRelativeCommand() {
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
		}
		return false;
	}

	public getToken(): Point {
		this.i++;
		return this.arrPath[this.i];
	}

	public nextCommand(): void {
		this.previousCommand = this.command;
		this.command = this.getToken();
	}

	public getPoint(): Point {
		let p = this.getToken();
		return this.makeAbsolute(p);
	}

	public getAsControlPoint(): Point {
		let p = this.getPoint();
		this.control = p;
		return p;
	}

	public getAsCurrentPoint(): Point {
		let p = this.getPoint();
		this.current = p;
		return p;
	}

	public getReflectedControlPoint(): Point {
		if (this.previousCommand instanceof String &&
			this.previousCommand.toLowerCase() != 'c' &&
			this.previousCommand.toLowerCase() != 's' &&
			this.previousCommand.toLowerCase() != 'q' &&
			this.previousCommand.toLowerCase() != 't' ){
			return this.current;
		}

		// reflect point
		let p = new Point(2 * this.current.x - this.control.x, 2 * this.current.y - this.control.y);
		return p;
	}

	public makeAbsolute(p: Point): Point {
		if (this.isRelativeCommand()) {
			p.x += this.current.x;
			p.y += this.current.y;
		}
		return p;
	}
}