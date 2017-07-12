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