/**
 * Created by dsmiley on 7/11/17.
 */
describe('Lavender.Point', function(){

    it('Testing Lavender.Point', function() {
        var point = Lavender.Point();
        expect(point.x).toBe(0);
        expect(point.y).toBe(0);
        point.x = 5;
        point.y = 15;
        expect(point.x).toBe(5);
        expect(point.y).toBe(15);
        var point2 = Lavender.Point(20,25);
        expect(point2.x).toBe(20);
        expect(point2.y).toBe(25);
        console.log(Lavender.Point.distance(point, point2));
        console.log(Lavender.Point.direction(point, point2));
        expect(point2.add(point)).toBe(false);
        expect(point2.x).toBe(10);
        expect(point2.y).toBe(30);
        expect(point2.subtract(point)).toBe(false);
        expect(point2.x).toBe(5);
        expect(point2.y).toBe(15);
        expect(point2.scale(10)).toBe(false);
        expect(point2.x).toBe(50);
        expect(point2.y).toBe(150);
        console.log(point2.magnitude());
    });

});