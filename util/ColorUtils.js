/**
 * Created by dsmiley on 2/27/14.
 */
Lavender.ColorUtils = function(){

}

Lavender.ColorUtils.rgb2hex = function(rgb){
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if( rgb === null || rgb === undefined || rgb.length <= 0 ){
        return null;
    }
    return "#" +
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
}

Lavender.ColorUtils.hexToRgb = function(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgb('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+')';
    }
    throw new Error('Bad Hex');
}

Lavender.ColorUtils.hexToRgbA = function(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
    }
    throw new Error('Bad Hex');
}

Lavender.ColorUtils.hexToRgbArray = function(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return [(c>>16)&255, (c>>8)&255, c&255];
    }
    throw new Error('Bad Hex');
}

Lavender.ColorUtils.rgbToHsl = function(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
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

Lavender.ColorUtils.rgbToHsv = function(r, g, b){
    var
        min = Math.min(r, g, b),
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

