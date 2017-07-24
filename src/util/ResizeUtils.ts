export type widthHeightObject = { width: number, height: number };
export class ResizeUtils {
	public static getScaleToFill(objSize: widthHeightObject, sizeToFill: widthHeightObject): number {
		var scale = (sizeToFill.height / sizeToFill.width) > (objSize.height / objSize.width) ? (sizeToFill.height / objSize.height) : (sizeToFill.width / objSize.width);
	    return scale;
	}
	
	public static getScaleToFit(objSize: widthHeightObject, sizeToFit: widthHeightObject): number {
		return Math.min(sizeToFit.width / objSize.width, sizeToFit.height / objSize.height);
	}
};