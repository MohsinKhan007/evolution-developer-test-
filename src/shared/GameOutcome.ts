/*
* This file was only added to illustrate that some resources / definitions can be shared between server and client.
* Feel free to add more files or change this file as needed to match your implementation and requirements.
*/


export interface GameOutcome{
        slotMachine:number[],
        bonus:boolean,
        playerWinType:string
}


export interface ISlotMachine{
     getReels():Array<number>,
     setReels(newReelValues:Array<number>):void,
     getWinType():string,
     getBonusFeature(percentage:number):boolean
}