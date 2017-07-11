/**
 * Created by dsmiley on 7/11/17.
 */
describe('Lavender.Point', function(){

    it('Testing Lavender.Point', function() {
        console.log(Lavender.Point.toFixed(Lavender.Point.degreeToRadian(180),2));
        expect(Lavender.Point.degreeToRadian(180)).toBe(3.141592653589793);
        expect(Lavender.Point.radianToDegree(3.14159)).toBe(179.99984796050427);
        expect(Lavender.Point.toFixed(Lavender.Point.degreeToRadian(180),2)).toBe(3.14);
        expect(Lavender.Point.isEven(Lavender.Point.degreeToRadian(180))).toBe(false);
        expect(Lavender.Point.isEven(2)).toBe(true);

    });

});