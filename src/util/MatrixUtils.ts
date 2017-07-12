/**
 * Created by dsmiley on 6/30/17.
 */
import {MathUtils} from './MathUtils';
import {Point} from './Point';
import {Matrix} from './Matrix';
export class MatrixUtils{
    
    public static rotate(matrix:Matrix, degAngle:number, point:Point):Matrix{
        return matrix.rotate(MathUtils.degreeToRadian(degAngle), point);
    }

    public static matrixToCSS(matrix:Matrix):string{
        let coeffs = ['a', 'b', 'c', 'd', 'tx', 'ty'];
        let values = [];
        for (let i in coeffs)
        {
            values.push(MathUtils.toFixed(matrix[coeffs[i]]));
        }
        return 'matrix(' + values.join(',')+ ')';
        
    }
    
    public static getRotationAngleForElement(element:HTMLElement):number{
        let matrix = element.style["-webkit-transform"] ||
            element.style["-moz-transform"]    ||
            element.style["-ms-transform"]     ||
            element.style["-o-transform"]      ||
            element.style["transform"];
        let angle;
        if(matrix !== 'none') {
            let values = matrix.split('(')[1].split(')')[0].split(',');
            let a = values[0];
            let b = values[1];
            angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        } else {
            angle = 0;
        }
        return angle;
    }

    public static getRotationAngle(matrix:Matrix):number{
        return MathUtils.toFixed(MathUtils.radianToDegree(Math.atan2(matrix.b, matrix.a)));
    }
    
    public static getMatrix(cssTransformMatrix:string):Matrix{
        let values = cssTransformMatrix.split('(')[1];
        values = values.split(')')[0];
        let valuesArray = values.split(',');
        let a = parseFloat(valuesArray[0]);
        let b = parseFloat(valuesArray[1]);
        let c = parseFloat(valuesArray[2])
        let d = parseFloat(valuesArray[3]);
        let tx = parseFloat(valuesArray[4]);
        let ty = parseFloat(valuesArray[5]);
        return new Matrix(a,b,c,d, tx, ty);
    }
}