/**
 * Created by dsmiley on 7/11/17.
 */
export class UuidUtils{
    constructor(){
        
    }
    
    public static generateUUID():string{
        let d = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    public static getRandomInt(min:number, max:number):number{
        return Math.floor(Math.random() * (max - min)) + min;
    }
}