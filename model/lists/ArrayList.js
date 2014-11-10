Lavender.ArrayList = function(source) {

    if (source === null || source === undefined) {
        source = [];
    }

    this.aList = source; //initialize with an empty array

    Lavender.Subject.prototype.constructor.call(this);

    Lavender.ObjectUtils.mixin(Lavender.AbstractEventDispatcher, Lavender.ArrayList, this);
}
Lavender.ObjectUtils.extend(Lavender.Subject, Lavender.ArrayList);

Lavender.ArrayList.prototype.length = function () {
    return this.aList.length;
}

Lavender.ArrayList.prototype.clone = function () {
    return new Lavender.ArrayList( this.aList.slice() );
}

Lavender.ArrayList.prototype.source = function () {
    return this.aList;
}

Lavender.ArrayList.prototype.validateItem = function (object) {
    //stub for override, overrides should use the instanceof keyword to determine if object is of the correct type
}

Lavender.ArrayList.prototype.addItem = function (object) {
    this.validateItem(object);
    //Object are placed at the end of the array
    var index = this.aList.push(object);
    this.dispatch( new Lavender.CollectionEvent( Lavender.CollectionEvent.COLLECTION_CHANGE, null  ) );
    return index;
}

Lavender.ArrayList.prototype.addAll = function ( items ) {
    //add all items to the collection
    for( var i=0; i < items.length; i++ ){
        if( items[i].hasOwnProperty('addItemAt') && !isNaN( items[i].addItemAt ) ){
            this.insert(items[i].item, items[i].addItemAt, true );
        }else{
            this.addItem(items[i]);
        }
    }
    this.dispatch( new Lavender.CollectionEvent( Lavender.CollectionEvent.COLLECTION_CHANGE, null  ) );
}

Lavender.ArrayList.prototype.getItemAt = function (index) //Index must be a number

{
    if (index > -1 && index < this.aList.length)
        return this.aList[index];
    else
        return undefined; //Out of bound array, return undefined

}

Lavender.ArrayList.prototype.clear = function () {
    this.aList = [];
    this.dispatch( new Lavender.CollectionEvent( Lavender.CollectionEvent.COLLECTION_CHANGE, null  ) );
}

Lavender.ArrayList.prototype.clearHash = function ( hash ) {
    for (var prop in hash ) {
        hash[ prop ] = null;
        delete hash[ prop ];
    }
}

Lavender.ArrayList.prototype.removeItemFromHash = function ( hash, key ) {
    hash[ key ] = null;
    delete hash[ key ];
}

Lavender.ArrayList.prototype.removeItemAt = function (index) // index must be a number

{
    var m_count = this.aList.length;
    if (m_count > 0 && index > -1 && index < this.aList.length) {
        switch (index) {
            case 0:
                this.aList.shift();
                break;
            case m_count - 1:
                this.aList.pop();
                break;
            default:
                var head = this.aList.slice(0, index);
                var tail = this.aList.slice(index + 1);
                this.aList = head.concat(tail);
                break;
        }
    }
    this.dispatch( new Lavender.CollectionEvent( Lavender.CollectionEvent.COLLECTION_CHANGE, null  ) );
}

Lavender.ArrayList.prototype.insert = function (object, index, suppressChangeEvent) {
    this.validateItem(object);
    if( suppressChangeEvent === null || suppressChangeEvent === undefined ){
        suppressChangeEvent = false;
    }
    var m_count = this.aList.length;
    var m_returnValue = -1;
    if (index > -1 ){
        switch (index) {
            case 0:
                this.aList.unshift(object);
                m_returnValue = 0;
                break;
            case m_count:
                this.aList.push(object);
                m_returnValue = m_count;
                break;
            default:
                if( index > m_count ){
                    for( var i=0; i < index - m_count; i++ ){
                        this.aList.push(null);
                    }
                }
                var head = this.aList.slice(0, index);
                var tail = this.aList.slice(index);
                tail.unshift(object);
                this.aList = head.concat(tail);
                m_returnValue = index;
                break;
        }
    }
    if( !suppressChangeEvent ){
        this.dispatch( new Lavender.CollectionEvent( Lavender.CollectionEvent.COLLECTION_CHANGE, null  ) );
    }
    return m_returnValue;
}

Lavender.ArrayList.prototype.indexOf = function (object, startIndex) {
    if( startIndex === null || startIndex === undefined ){
        startIndex = 0;
    }
    var m_count = this.aList.length;
    var m_returnValue = -1;

    if (startIndex > -1 && startIndex < m_count) {
        var i = startIndex;

        while (i < m_count) {
            if (this.aList[i] == object) {
                m_returnValue = i;
                break;
            }

            i++;
        }
    }

    return m_returnValue;
}

Lavender.ArrayList.prototype.lastIndexOf = function (object, startIndex) {
    var m_count = this.aList.length;
    var m_returnValue = -1;

    if (startIndex > -1 && startIndex < m_count) {
        var i = m_count - 1;

        while (i >= startIndex) {
            if (this.aList[i] == object) {
                m_returnValue = i;
                break;
            }

            i--;
        }
    }

    return m_returnValue;
}
        
