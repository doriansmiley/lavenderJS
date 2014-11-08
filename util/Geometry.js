Lavender.Geometry = function(values) {
    this.left = undefined;
    this.top = undefined;
    this.width = undefined;
    this.height = undefined;

    this.update(values);
}

Lavender.Geometry.prototype.update = function(values) {
    if (!values) {
        return;
    }

    for (var key in values) {
        if (Lavender.ObjectUtils.isPropDefined(values, key) && this.hasOwnProperty(key)) {
            this[key] = values[key];
        }
    }
}

Lavender.Geometry.prototype.getDefinedValues = function() {
    var res = {};
    for (var key in this) {
        if (Lavender.ObjectUtils.isPropDefined(this, key)) {
            res[key] = this[key];
        }
    }

    return res;
}
