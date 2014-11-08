/**
 * Created by dsmiley on 2/26/14.
 */
Lavender.ReplaceControlImageAction = function (control, asset, instance) {
    this.control = control;
    this.asset = asset;
    this.instance = instance;
    Lavender.AbstractSynchronousAction.prototype.constructor.call(this);

}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.AbstractSynchronousAction, Lavender.ReplaceControlImageAction);

Lavender.ReplaceControlImageAction.prototype.execute = function () {
    if ( this.control === null || this.control === undefined || this.asset === null || this.asset === undefined) {
        this.executionError();
    }
    Lavender.AbstractSynchronousAction.prototype.execute.call(this);
}

//abstract method for override
Lavender.ReplaceControlImageAction.prototype.executeDAOMethod = function () {
    //add the asset to the instance for export
    if( this.instance.assets.assetsByID[ this.asset.asset.uid ] === null || this.instance.assets.assetsByID[ this.asset.asset.uid ] === undefined ){
        this.instance.assets.addItem( this.asset );
    }
    this.control.pageItem.imageId = this.asset.asset.uid;//Will trigger ImageControl.assetChangeHandler
    this.control.pageItem.asset = this.asset;//Will trigger ImageControl.assetChangeHandler
}

//abstract method for override
Lavender.ReplaceControlImageAction.prototype.getErrorMessage = function () {
    return 'Lavender.ReplaceControlImageAction.prototype.execute runtime error: ';
}

//abstract method for override
Lavender.ReplaceControlImageAction.prototype.getExecErrorString = function (msg) {
    return 'Lavender.ReplaceControlImageAction.prototype.execute: required params are not defined. Asset and control are required.';
}

Lavender.ReplaceControlImageAction.prototype.tearDown = function () {
    //null any references
    this.control = null;
    this.asset = null;
    Lavender.AbstractSynchronousAction.prototype.tearDown.call(this);
}