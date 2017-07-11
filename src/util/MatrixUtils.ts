/**
 * Created by dsmiley on 6/30/17.
 */
import {MathUtils} from './MathUtils';
import {Point} from './Point';
import {Matrix} from './Matrix';
export class MatrixUtils{
    public static rotate(matrix, degAngle:number, point):any{
        return matrix.rotate(MathUtils.degreeToRadian(degAngle), point);
    }
    public static matrixToCSS():void{
        
    }
}