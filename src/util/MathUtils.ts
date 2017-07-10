/**
 * Created by dsmiley on 6/30/17.
 */
export class MathUtils{
    public static degreeToRadian(degAngle:number):number{
        return degAngle * Math.PI / 180;
    }
    public static radianToDegree(radAngle:number):number{
        return radAngle * 180 / Math.PI;
    }
    public static toFixed(number:number, precision?:number):number{
        precision = precision || 10;
        var multiplier = Math.pow( 10, precision );
        return Math.round( number * multiplier ) / multiplier;
    }
    public static isEven(value:number):boolean{
        return ((value % 2) == 0);
    }
}