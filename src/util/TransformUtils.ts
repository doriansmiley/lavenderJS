import {Geometry} from './Geometry';
import {Matrix} from './Matrix';
import {MatrixUtils} from './MatrixUtils';
import {Point} from './Point';

export type originalState = { width: number, height: number, rotation: number, top: number, left: number };
export class TransformUtils {
    public static calculateMovement(originalState: originalState, delta: { x: number, y: number }) {
        if (!delta) {
            return null;
        }

        let deltaX = delta.x || 0;
        let deltaY = delta.y || 0;

        let res = null;
        if (originalState.hasOwnProperty('left') && originalState.hasOwnProperty('top')) {
            res = {'geometry' : new Geometry({left : originalState.left + deltaX, top : originalState.top + deltaY})};
        }
        else if (originalState.hasOwnProperty('left')) {
            res = {'left' : originalState.left + deltaX}
        }
        else if (originalState.hasOwnProperty('top')) {
            res = {'top' : originalState.top + deltaY}
        }

        return res;
    }
    
    public static calculateResizeAroundAnchorPoint(originalState: originalState, sizeDelta: { width: number, height: number }, anchorPos: Point, proportionalResizer): { geometry: Geometry } {
        let dWidth = sizeDelta.width || 0;
        let dHeight = sizeDelta.height || 0;

        anchorPos = anchorPos || TransformUtils.getDefaultAnchorPos();

        if (!originalState.hasOwnProperty('width') || !originalState.hasOwnProperty('height')
            || !originalState.hasOwnProperty('top') || !originalState.hasOwnProperty('left')
            || (!dWidth && !dHeight)) {
            return null;
        }

        let geometry = new Geometry({width : originalState.width + dWidth, height : originalState.height + dHeight});

        if (proportionalResizer) {
            proportionalResizer.applyConstraint(originalState, null, geometry, anchorPos);
        }

        let pos = this.getPosAfterResizeAroundAnchorPoint(originalState, geometry, anchorPos);
        if (pos) {
            geometry.update(pos);
        }

        return {geometry : geometry};
    }
    
    public static calculateRotate(originalState: originalState, deltaAngle: number): { rotation: number } {
        if (!deltaAngle) {
            return null;
        }

        let res = null;
        if (originalState.hasOwnProperty('rotation')) {
            res = {'rotation' : originalState.rotation + deltaAngle};
        }

        return res;
    }
    
    public static getPosAfterResizeAroundAnchorPoint(originalState: originalState, sizeAfterTransform: { width: number, height: number }, anchorPos: Point): { left: number, top: number } {
        if (!originalState.hasOwnProperty('width') || !originalState.hasOwnProperty('height')) {
            return null;
        }

        let dWidth = sizeAfterTransform.hasOwnProperty('width') ? sizeAfterTransform.width - originalState.width : 0;
        let dHeight = sizeAfterTransform.hasOwnProperty('height') ? sizeAfterTransform.height - originalState.height : 0;
        anchorPos = anchorPos || TransformUtils.getDefaultAnchorPos();

        if (!dWidth && !dHeight) {
            return null;
        }

        let posOffset = new Point(dWidth * anchorPos.x, dHeight * anchorPos.y);
        if (originalState.hasOwnProperty('rotation') && originalState.rotation) {

            let originalCenterPoint = new Point(originalState.width / 2, originalState.height / 2);
    		let newCenterPoint = new Point(posOffset.x + (originalState.width + dWidth) / 2,
                                           posOffset.y + (originalState.height + dHeight) / 2);

            let rotMatrix = new Matrix();
            // Rotates object around original center point
            rotMatrix = MatrixUtils.rotate(rotMatrix, originalState.rotation, originalCenterPoint);

            // New left top point position after rotation
            let rotPosOffset = rotMatrix.transformPoint(posOffset);
            // New center point after rotation
            let rotNewCenterPoint = rotMatrix.transformPoint(newCenterPoint);

            let unrotMatrix = new Matrix();
            // Unrotates object around new center
            unrotMatrix = MatrixUtils.rotate(unrotMatrix, -originalState.rotation, rotNewCenterPoint);
            posOffset = unrotMatrix.transformPoint(rotPosOffset);
        }

        let pos = {left : originalState.left + posOffset.x, top : originalState.top + posOffset.y};

        return pos;
    }
    
    public static getDefaultAnchorPos(): Point {
        return new Point(-0.5, -0.5);
    }
    
    public static applyConstraints(originalState: originalState, currentState, stateAfterTransform, anchorPos: Point, constraints): void {
        if (constraints) {
            constraints.forEach ( function (constraint) {
                    constraint.applyConstraint(originalState, currentState, stateAfterTransform, anchorPos);
                }
            )
        }
    }
    
    public static applyTransform(obj, stateAfterTransform): void {
        if (!stateAfterTransform) {
            return;
        }

        for (var prop in stateAfterTransform) {
            if (stateAfterTransform.hasOwnProperty(prop) && obj.hasOwnProperty(prop)) {
                obj[prop] = stateAfterTransform[prop];
            }
        }
    }
};
