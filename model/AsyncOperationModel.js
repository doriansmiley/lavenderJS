/**
 * Created by dsmiley on 2/5/14.
 */
Lavender.AsyncOperationModel = function(){
    var _asyncOperationCount = 0;//Number
    var _asyncOperationComplete = true;//Boolean

    Lavender.Subject.prototype.constructor.call(this);

    this.addProperties({
        asyncOperationCount: {
            get: function () {
                return _asyncOperationCount;
            },
            set: function (val) {
                _asyncOperationCount = val;
                this.Notify(val, "asyncOperationCount");
            }
        },
        asyncOperationComplete: {
            get: function () {
                return this.asyncOperationCount <= 0;
            },
            set: function (val) {
                _asyncOperationComplete = val;
                this.Notify(val, "asyncOperationComplete");
            }
        }
    });
}
/************* Inherit from Subject for data binding *************/
Lavender.ObjectUtils.extend(Lavender.Subject, Lavender.AsyncOperationModel);

Lavender.AsyncOperationModel.prototype.addAsyncOperation = function() {
    this.asyncOperationComplete = false;
    this.asyncOperationCount += 1;
}

Lavender.AsyncOperationModel.prototype.removeAsyncOperation = function() {
    this.asyncOperationCount -= 1;
    if (!this.asyncOperationCount)
    {
        this.asyncOperationComplete = true;
    }
}
