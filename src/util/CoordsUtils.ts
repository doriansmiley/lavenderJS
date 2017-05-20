/**
 * Created by dsmiley on 5/19/17.
 */
export class CoordsUtils{
    public static globalToLocal(container:HTMLElement, pageX:number, pageY:number):Offset{
        let position = CoordsUtils.offset(container);

        return new Offset(pageX - position.left, pageY - position.top);
    }

    public static offset (element:HTMLElement){
        let win:Window,
            box = { top: 0, left: 0 },
            elem:HTMLElement = element,
            doc:Document = elem && elem.ownerDocument;

        if ( !doc ) {
            return;
        }

        let docElem:HTMLElement = doc.documentElement;

        // Make sure it's not a disconnected DOM node
        if ( !docElem.contains( elem ) ) {
            return box;
        }

        box = elem.getBoundingClientRect();
        win = CoordsUtils.getWindow( doc );
        return {
            top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
            left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
        };
    }

    private static getWindow( elem:any ):Window{
        var returnValue:Window = CoordsUtils.isWindow( elem ) ?
            elem as Window:
            elem.nodeType === 9 ?
            elem['defaultView'] || elem['parentWindow'] : null;
        return returnValue;
    }

    private static isWindow( elem:HTMLElement ){
        return elem != null && elem.hasOwnProperty('window') && elem == elem['window'];
    }
}

export class Offset{
    public top:number;
    public left:number;

    constructor(top, left){
        this.top = top;
        this.left = left;
    }
}