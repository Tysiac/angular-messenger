import {IClonable} from './IClonable';

export interface IDictionary
{
    add(key: string, value: any): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): any[];
}

export class Dictionary<T extends IClonable<any>> implements IClonable<Dictionary<T>> {
    _keys: Array<string> = new Array<string>();
    _values: Array<T> = new Array<T>();

    /*constructor(init?: { key: string; value: T; }[]) {
        if (typeof init === 'undefined')
            return;

        for (var x = 0; x < init.length; x++) {
            this[init[x].key] = init[x].value;
            this._keys.push(init[x].key);
            this._values.push(init[x].value);
        }
    }*/
    constructor(keys?: string[], values?: T[]) {
        if (typeof keys === 'undefined')
            return;
        if (typeof values === 'undefined')
            return;
        if(keys.length!=values.length)
            return;

        for (var x = 0; x < keys.length; x++) {
            this[keys[x]] = values[x];
            this._keys.push(keys[x]);
            this._values.push(values[x]);
        }
    }
    add(key: string, value: T) {

            
            var index=this._keys.indexOf(key)
            if(index>=0)
            {
                //this._keys.push(key);
                //this._values[index]=value;
            }else
            {
                this[key] = value;
                this._keys.push(key);
                this._values.push(value);
            }

    }

    remove(key: string) {
        var index = this._keys.indexOf(key, 0);
        if(index<0)
           return;
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
        delete this[key];
    }
    update(key: string, value: T){
        var index = this._keys.indexOf(key, 0);
        if(index>=0){
            this._keys.splice(index, 1, key);
            this._values.splice(index, 1, value);
        }else{
            this[key] = value;
            this._keys.push(key);
            this._values.push(value);
        }
        
    }

    keys(): string[] {
        return this._keys; 
    }

    values(): T[] {
        return this._values;
    }

    containsKey(key: string) 
    {
        if(this._keys.length==0) return false;

        for(var i=0;i<this._keys.length;i++)
        {
            if(this._keys[i]==key) 
            {
                return true;
            }
        }

        return false;
    }

    toLookup(): IDictionary {
        return this;
    }

    public Clone():Dictionary<T>
    {

        var d=new Dictionary<T>();
      
            for(var i=0;i<this._keys.length;i++)
            {
                d.add(this._keys[i],this._values[i].Clone());
            }
        return d;      
    }

}
