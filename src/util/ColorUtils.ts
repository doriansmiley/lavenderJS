/**
 * Created by dsmiley on 5/18/17.
 */
export class ColorUtils{

    public static rgb2hex(rgb:string):string{
        let result:Array<string> = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if( result === null || result === undefined || result.length <= 0 ){
            return null;
        }
        return "#" +
            ("0" + parseInt(result[1],10).toString(16)).slice(-2) +
            ("0" + parseInt(result[2],10).toString(16)).slice(-2) +
            ("0" + parseInt(result[3],10).toString(16)).slice(-2);
    }

    public static hexToRgb(hex:string):string{
        let c:Array<string>;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            let returnValue:number = Number('0x'+c.join('')) as number;
            return 'rgb('+[(returnValue>>16)&255, (returnValue>>8)&255, returnValue&255].join(',')+')';
        }
        throw new Error('Bad Hex');
    }

    public static hexToRgbA(hex:string):string{
        let c:Array<string>;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            let returnValue:number = Number('0x'+c.join('')) as number;
            return 'rgba('+[(returnValue>>16)&255, (returnValue>>8)&255, returnValue&255].join(',')+',1)';
        }
        throw new Error('Bad Hex');
    }

    public static hexToRgbArray(hex:string):Array<number>{
        let c:Array<string>;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            let returnValue:number =  Number('0x'+c.join('')) as number;
            return [(returnValue>>16)&255, (returnValue>>8)&255, returnValue&255];
        }
        throw new Error('Bad Hex');
    }
    
    public static rgbToHsl(r:number, g:number, b:number):Array<number>{
        r /= 255, g /= 255, b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if(max == min){
            h = s = 0; // achromatic
        }else{
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
    }
    
    public static rgbToHsv(r:number, g:number, b:number):Array<number>{
        let min = Math.min(r, g, b),
            max = Math.max(r, g, b),
            delta = max - min,
            h, s, v = max;

        v = Math.floor(max / 255 * 100);
        if ( max != 0 )
            s = Math.floor(delta / max * 100);
        else {
            // black
            return [0, 0, 0];
        }

        if( r == max )
            h = ( g - b ) / delta;         // between yellow & magenta
        else if( g == max )
            h = 2 + ( b - r ) / delta;     // between cyan & yellow
        else
            h = 4 + ( r - g ) / delta;     // between magenta & cyan

        h = Math.floor(h * 60);            // degrees
        if( h < 0 ) h += 360;

        return [h, s, v];
    }

}