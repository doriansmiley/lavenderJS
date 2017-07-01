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

    public equal(other:Point):boolean{
        return this.x === other.x && this.y === other.y;
    }

    public add(other:Point):Point{
        return Point(this.x + other.x, this.y + other.y);
    }
}