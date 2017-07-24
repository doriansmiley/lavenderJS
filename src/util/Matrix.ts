/**
 * Created by dsmiley on 6/30/17.
 */
import {Point} from './Point';
export class Matrix{
    public a:number;
    public b:number;
    public c:number;
    public d:number;
    public tx:number;
    public ty:number;

    public static IDENTITY = new Matrix();
    public static HORIZONTAL_FLIP = new Matrix(-1, 0, 0, 1);
    public static VERTICAL_FLIP = new Matrix(1, 0, 0, -1);

    constructor(a:number=1, b:number=0, c:number=0, d:number=1, tx:number=0, ty:number=0){
        this.a=a;
        this.b=b;
        this.c=c;
        this.d=d;
        this.tx=tx;
        this.ty=ty;
    }

    public static rotation(theta:number, aboutPoint:Point=null):Matrix{
        let rotationMatrix = new Matrix(
            Math.cos(theta),
            Math.sin(theta),
            -Math.sin(theta),
            Math.cos(theta)
        );

        if(aboutPoint) {
            rotationMatrix =
                Matrix.translation(aboutPoint.x, aboutPoint.y).concat(
                    rotationMatrix
                ).concat(
                    Matrix.translation(-aboutPoint.x, -aboutPoint.y)
                );
        }

        return rotationMatrix;
    }

    public static scale(sx:number, sy:number, aboutPoint:Point):Matrix{
        sy = sy || sx;

        let scaleMatrix = new Matrix(sx, 0, 0, sy);

        if(aboutPoint) {
            scaleMatrix =
                Matrix.translation(aboutPoint.x, aboutPoint.y).concat(
                    scaleMatrix
                ).concat(
                    Matrix.translation(-aboutPoint.x, -aboutPoint.y)
                );
        }

        return scaleMatrix;
    }

    public static translation(tx:number, ty:number) {
        return new Matrix(1, 0, 0, 1, tx, ty);
    };

    public concat(matrix:Matrix):Matrix{
        return new Matrix(
            this.a * matrix.a + this.c * matrix.b,
            this.b * matrix.a + this.d * matrix.b,
            this.a * matrix.c + this.c * matrix.d,
            this.b * matrix.c + this.d * matrix.d,
            this.a * matrix.tx + this.c * matrix.ty + this.tx,
            this.b * matrix.tx + this.d * matrix.ty + this.ty
        );
    }

    public deltaTransformPoint(point:Point):Point{
        return new Point(
            this.a * point.x + this.c * point.y,
            this.b * point.x + this.d * point.y
        );
    }

    public inverse():Matrix{
        let determinant = this.a * this.d - this.b * this.c;
        return new Matrix(
            this.d / determinant,
            -this.b / determinant,
            -this.c / determinant,
            this.a / determinant,
            (this.c * this.ty - this.d * this.tx) / determinant,
            (this.b * this.tx - this.a * this.ty) / determinant
        );
    }
    
    public rotate(theta:number, aboutPoint:Point):Matrix{
        return this.concat(Matrix.rotation(theta, aboutPoint));
    }

    public scale(sx:number, sy:number, aboutPoint:Point):Matrix{
        return this.concat(Matrix.scale(sx, sy, aboutPoint));
    }

    public transformPoint(point:Point){
        return new Point(
            this.a * point.x + this.c * point.y + this.tx,
            this.b * point.x + this.d * point.y + this.ty
        );
    }

    public translate(tx:number, ty:number):Matrix{
        return this.concat(Matrix.translation(tx, ty));
    }
}