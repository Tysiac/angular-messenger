import {Pipe} from '@angular/core';


@Pipe({
name: 'mapToIterable'
})
export class MapToIterable {
  transform(dict: Object,args: any[]) {
    var a = [];

    if( args!=null && args.length>0)
    {
        var propName=Object.keys(args[0])[0];
        var propValue=args[0][propName];
        for (var key in dict)
        {
            if(dict[key].hasOwnProperty(propName))
            {
                if(dict[key][propName]==propValue)
                {
                    a.push({key: key, value: dict[key]});
                }
            }else
            {
                a.push({key: key, value: dict[key]});
            }
        }
    }else
    {
        for (var key in dict)
        {
          //if (dict.hasOwnProperty(key))
          {
            a.push({key: key, value: dict[key]});
          }
        }
    }
    return a;
  }
}
