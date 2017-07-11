/**
 * Created by dsmiley on 6/30/17.
 */
export class Point{
    public x:number;
    public y:number;

    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }

    public static distance(p1:Point, p2:Point):number{
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }

    public static direction(p1:Point, p2:Point):number{
        return Math.atan2(
            p2.y - p1.y,
            p2.x - p1.x
        );
    }

    public equal(other:Point):boolean{
        return this.x === other.x && this.y === other.y;
    }

    public add(other:Point):Point{
        return new Point(this.x + other.x, this.y + other.y);
    }

    public subtract(other:Point):Point{
        return new Point(this.x - other.x, this.y - other.y);
    }

    public scale(scalar:number):Point{
        return new Point(this.x * scalar, this.y * scalar);
    }

    public magnitude():number{
        return Point.distance(new Point(0, 0), this);
    }

    public static distance(p1:Point,p2:Point):number{
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }

    public static direction(p1:Point,p2:Point):number{
        return Math.atan2( p2.y - p1.y, p2.x - p1.x);
    }
}