/**
 * Created by dsmiley on 8/14/14.
 */
Lavender.XmlUtils = function(){
    
}
Lavender.XmlUtils.getXmlStringFromElement = function( element ){
    var xmlString;
    if (window.XMLSerializer) {
        xmlString = (new XMLSerializer()).serializeToString(element[0]);
    }
    // IE
    else if (window.ActiveXObject) {
        xmlString = element[0].xml;
    }
    return xmlString;
}