/**
 * Created by dsmiley on 6/30/17.
 */
import {MathUtils} from './MathUtils';
export class MatrixUtils{
    public static rotate(matrix, degAngle:number, point):any{
        return matrix.rotate(MathUtils.degreeToRadian(degAngle), point);
    }
    public static matrixToCSS():void{
        
    }
}