/**
 * Created by dsmiley on 1/22/14.
 */
/**
 * Created by dsmiley on 1/22/14.
 */
Lavender.RecordSetList = function(){
    this.recordSetsBySource = {};
    this.recordSetsById = {};
    Lavender.ArrayList .prototype.constructor.call(this);
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.ArrayList , Lavender.RecordSetList);

//All List classes should override the following methods when a hash is required
Lavender.RecordSetList.prototype.addItem = function (object) {//object must be FontVariant Object
    //populate hash
    this.recordSetsById[ object.id ] = object;
    this.recordSetsBySource[ object.source ] = object;
    return Lavender.ArrayList .prototype.addItem.call(this,object);
}

Lavender.RecordSetList.prototype.clear = function () {
    //clear hash
    Lavender.ArrayList .prototype.clearHash.call(this, this.recordSetsById);
    Lavender.ArrayList .prototype.clearHash.call(this, this.recordSetsBySource);
    Lavender.ArrayList .prototype.clear.call(this);
}

Lavender.RecordSetList.prototype.removeItemAt = function (index) // index must be a number
{
    //clear item from hash
    var recordSet = this.getItemAt( index );
    Lavender.ArrayList .prototype.removeItemFromHash.call(this, this.recordSetsById, recordSet.id);
    Lavender.ArrayList .prototype.removeItemFromHash.call(this, this.recordSetsBySource, recordSet.source);
    Lavender.ArrayList .prototype.removeItemAt.call(this,index);
}

Lavender.RecordSetList.prototype.insert = function (object, index) {//object must be FontVariant Object
    //add item to hash
    this.recordSetsById[ object.id ] = object;
    this.recordSetsBySource[ object.source ] = object;
    Lavender.ArrayList .prototype.insert.call(this, object, index);
}
//End Lavender.ArrayList  Overrides