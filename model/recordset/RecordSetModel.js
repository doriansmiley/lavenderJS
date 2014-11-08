/**
 * Created by dsmiley on 2/5/14.
 */
Lavender.RecordSetModel = function(){
    var _recordSets = new Lavender.RecordSetList();//RecordSetList

    Lavender.Subject.prototype.constructor.call(this);
    Lavender.ObjectUtils.mixin(Lavender.AbstractEventDispatcher, Lavender.RecordSetModel, this);
    this.addProperties({
        recordSets: {
            get: function () {
                return _recordSets;
            },
            set: function (val) {
                _recordSets = val;
                this.Notify(val, "recordSets");
                this.dispatch(new Lavender.RecordSetEvent(Lavender.RecordSetEvent.RECORDSETS_CHANGE));
            }
        }
    });

}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.Subject, Lavender.RecordSetModel);