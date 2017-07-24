/**
 * Created by dsmiley on 7/11/17.
 */
export class XmlUtils{
    constructor(){

    }

    public static createXMLDocument(sMyString:string):Document{
        let oParser = new DOMParser();
        return oParser.parseFromString(sMyString, "text/xml");
    }

    public static getXmlStringFromElement(element:HTMLElement):string{
        let xmlString = (new XMLSerializer()).serializeToString(element);
        return xmlString;
    }
}