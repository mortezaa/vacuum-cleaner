import React, { Component } from 'react';
import '../App.css';
import Fieldboard from './field';
import Stopwatch from 'react-stopwatch';


class board extends Component {
    constructor(){
        super();
        this.state = {
            GameBoard:[
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            ],
            CleanerPosition:'',
            sense:[],
            moveCount:0,
            dirties:0,
            emtiaz:0,
            IsClean:false,
        };
        this.start = this.start.bind(this);
        this.cleanerPosition = this.cleanerPosition.bind(this);
        this.interval = 0;
    }
    componentDidMount(){
        this.makedirty();
        this.cleanerPosition();
    }
    move(){
        let array=[
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        ];
        if(this.state.GameBoard[this.state.CleanerPosition]>0){
            array = this.state.GameBoard; //copy of gameBoard
            array[this.state.CleanerPosition] = 0; //delete current value of next location in copy
            let emtiaz = this.state.emtiaz + 2;
            this.setState({ // Update values
                GameBoard: array,
                emtiaz: emtiaz
            });
            this.jarime();
        }
        if(this.state.sense['top'] === true || this.state.sense['bottom'] === true || this.state.sense['right'] === true||this.state.sense['left'] === true){
            //if top is dirty only
            if (this.state.sense['top'] && this.state.sense['top'] === true && this.state.CleanerPosition - 15 > 0) {
                let location = this.state.CleanerPosition - 15; //next location of cleaner
                let array = this.state.GameBoard; //copy of gameBoard
                array[this.state.CleanerPosition - 15] = 0; //delete current value of next location in copy
                let movecount = this.state.moveCount + 1;
                let emtiaz = this.state.emtiaz + 2;
                let newsense = this.cleanerSense(this.state.CleanerPosition - 15); //Create new senses
                this.setState({ // Update values
                    GameBoard: array,
                    sense: newsense,
                    CleanerPosition: location,
                    emtiaz: emtiaz,
                    moveCount: movecount,
                })
            }
            //if bottom is dirty only
            else if (this.state.sense['bottom'] && this.state.sense['bottom'] === true && this.state.CleanerPosition + 15 <= 224) {
                let location;
                location = this.state.CleanerPosition + 15; //next location of cleaner
                let array = this.state.GameBoard; //copy of gameBoard
                array[this.state.CleanerPosition + 15] = 0; //delete current value of next location in copy
                let movecount = this.state.moveCount + 1;
                let emtiaz = this.state.emtiaz + 2;
                let newsense;
                newsense = this.cleanerSense(this.state.CleanerPosition + 15); //Create new senses
                this.setState({ // Update values
                    GameBoard: array,
                    sense: newsense,
                    CleanerPosition: location,
                    emtiaz:emtiaz,
                    moveCount: movecount,
                })
            }
            //if right is dirty only
            else if (this.state.sense['right'] && this.state.sense['right'] === true && this.state.CleanerPosition - 1 >= 0) {
                let location;
                location = this.state.CleanerPosition - 1; //next location of cleaner
                let array = this.state.GameBoard; //copy of gameBoard
                array[this.state.CleanerPosition - 1] = 0; //delete current value of next location in copy
                let movecount = this.state.moveCount + 1;
                let emtiaz = this.state.emtiaz + 2;
                let newsense;
                newsense = this.cleanerSense(this.state.CleanerPosition - 1); //Create new senses
                this.setState({ // Update values
                    GameBoard: array,
                    sense: newsense,
                    CleanerPosition: location,
                    emtiaz: emtiaz,
                    moveCount: movecount,
                })
            }
            //if left is dirty only
            else if (this.state.sense['left'] && this.state.sense['left'] === true && this.state.CleanerPosition + 1 <= 224) {
                let location;
                location = this.state.CleanerPosition + 1; //next location of cleaner
                let array = this.state.GameBoard; //copy of gameBoard
                array[this.state.CleanerPosition + 1] = 0; //delete current value of next location in copy
                let movecount = this.state.moveCount + 1;
                let emtiaz = this.state.emtiaz + 2;
                let newsense;
                newsense = this.cleanerSense(this.state.CleanerPosition + 1); //Create new senses
                this.setState({ // Update values
                    GameBoard: array,
                    sense: newsense,
                    CleanerPosition: location,
                    emtiaz: emtiaz,
                    moveCount: movecount,
                })
            }
            this.jarime();
        }
        else if(this.state.sense['bottombottom'] === true||this.state.sense['toptop'] === true||this.state.sense['rightright'] === true||this.state.sense['leftleft'] === true){
            //if bottombottom is dirty only
            if (this.state.sense['bottombottom'] && this.state.sense['bottombottom'] === true && this.state.CleanerPosition + 30 <= 224) {
                let location;
                location = this.state.CleanerPosition + 30; //next location of cleaner
                let array = this.state.GameBoard; //copy of gameBoard
                array[location] = 0; //delete current value of next location in copy
                let movecount = this.state.moveCount + 2;
                let emtiaz = this.state.emtiaz + 2;
                let newsense;
                newsense = this.cleanerSense(this.state.CleanerPosition + 30); //Create new senses
                this.setState({ // Update values
                    GameBoard: array,
                    sense: newsense,
                    CleanerPosition: location,
                    moveCount: movecount,
                    emtiaz: emtiaz
                })
            }
            //if toptop is dirty only
            else if (this.state.sense['toptop'] && this.state.sense['toptop'] === true && this.state.CleanerPosition - 30 >= 0) {
                let location = this.state.CleanerPosition - 30; //next location of cleaner
                let array = this.state.GameBoard; //copy of gameBoard
                array[location] = 0; //delete current value of next location in copy
                let movecount = this.state.moveCount + 2;
                let emtiaz = this.state.emtiaz + 2;
                let newsense = this.cleanerSense(this.state.CleanerPosition - 30); //Create new senses
                this.setState({ // Update values
                    GameBoard: array,
                    sense: newsense,
                    CleanerPosition: location,
                    moveCount: movecount,
                    emtiaz: emtiaz
                })
            }
            //if rightright is dirty only
            else if (this.state.sense['rightright'] && this.state.sense['rightright'] === true && this.state.CleanerPosition - 2 >= 0) {
                let location;
                location = this.state.CleanerPosition - 2; //next location of cleaner
                let array = this.state.GameBoard; //copy of gameBoard
                array[location] = 0; //delete current value of next location in copy
                let movecount = this.state.moveCount + 2;
                let emtiaz = this.state.emtiaz + 2;
                let newsense;
                newsense = this.cleanerSense(this.state.CleanerPosition - 2); //Create new senses
                this.setState({ // Update values
                    GameBoard: array,
                    sense: newsense,
                    CleanerPosition: location,
                    moveCount: movecount,
                    emtiaz: emtiaz
                })
            }
            // //if leftleft is dirty only
            else if (this.state.sense['leftleft'] && this.state.sense['leftleft'] === true && this.state.CleanerPosition + 2 <= 224) {
                let location;
                location = this.state.CleanerPosition + 2; //next location of cleaner
                let array = this.state.GameBoard; //copy of gameBoard
                array[location] = 0; //delete current value of next location in copy
                let movecount = this.state.moveCount - 2;
                let emtiaz = this.state.emtiaz + 2;
                let newsense;
                newsense = this.cleanerSense(this.state.CleanerPosition + 2); //Create new senses
                this.setState({ // Update values
                    GameBoard: array,
                    sense: newsense,
                    CleanerPosition: location,
                    moveCount: movecount
                })
            }
            this.jarime();
        }
        else if(this.state.sense['toptopside'] === true){
            let location;
            location = this.state.CleanerPosition - 30; //next location of cleaner
            let array = this.state.GameBoard; //copy of gameBoard
            array[location] = 0; //delete current value of next location in copy
            let movecount = this.state.moveCount + 2;
            let newsense;
            newsense = this.cleanerSense(this.state.CleanerPosition - 30); //Create new senses
            this.setState({ // Update values
                GameBoard: array,
                sense: newsense,
                CleanerPosition: location,
                moveCount: movecount,
            })
            this.jarime();
        }
        else if(this.state.sense['topside'] === true){
            let location;
            location = this.state.CleanerPosition - 15; //next location of cleaner
            let array = this.state.GameBoard; //copy of gameBoard
            array[location] = 0; //delete current value of next location in copy
            let movecount = this.state.moveCount + 1;
            let newsense;
            newsense = this.cleanerSense(this.state.CleanerPosition - 15); //Create new senses
            this.setState({ // Update values
                GameBoard: array,
                sense: newsense,
                CleanerPosition: location,
                moveCount: movecount,
            })
            this.jarime();
        }
        else if(this.state.sense['bottomside'] === true){
            let location;
            location = this.state.CleanerPosition + 15; //next location of cleaner
            let array = this.state.GameBoard; //copy of gameBoard
            array[location] = 0; //delete current value of next location in copy
            let movecount = this.state.moveCount + 1;
            let newsense;
            newsense = this.cleanerSense(this.state.CleanerPosition + 15); //Create new senses
            this.setState({ // Update values
                GameBoard: array,
                sense: newsense,
                CleanerPosition: location,
                moveCount: movecount,
            })
            this.jarime();
        }
        else if(this.state.sense['bottombottomside'] === true){
            let location;
            location = this.state.CleanerPosition + 30; //next location of cleaner
            let array = this.state.GameBoard; //copy of gameBoard
            array[location] = 0; //delete current value of next location in copy
            let movecount = this.state.moveCount + 2;
            let newsense;
            newsense = this.cleanerSense(this.state.CleanerPosition + 30); //Create new senses
            this.setState({ // Update values
                GameBoard: array,
                sense: newsense,
                CleanerPosition: location,
                moveCount: movecount,
            })
            this.jarime();
        }
        else if (this.state.sense.length === 0){
            let loc = [];
            loc[0]=this.state.CleanerPosition+3; //left
            loc[1]=this.state.CleanerPosition-3; //right
            (0<this.state.CleanerPosition-45<224) ? loc[2] = this.state.CleanerPosition-45 :""; //top if > 0
            (0<this.state.CleanerPosition+45<224) ?loc[3] = this.state.CleanerPosition+45: ""; //bottom if < 224
            let location; //new location of Cleaner
            do{
                location = loc[Math.floor(Math.random()*4)];
            }while(location<0 || location >= 225);
            let array = this.state.GameBoard; //copy of gameBoard
            array[this.state.CleanerPosition] = 0; //delete current value of next location in copy And Set To going route
            let newsense = this.cleanerSense(location); //Create new senses
            let movecount = this.state.moveCount + 3;
            this.setState({ // Update values
                GameBoard:array,
                sense:newsense,
                CleanerPosition:location,
                moveCount:movecount
            });
            this.jarime();
        }

        let Isclean = this.IsClean();
        if (Isclean === true){
            this.setState({
                IsClean:true
            });
        }
        if (this.state.emtiaz+this.state.moveCount >= 1000) {
            alert("Here you are :) Room Is Clean!!! Emtiaz : " + this.state.emtiaz + " Moves :" + this.state.moveCount);
            this.end();
        }
    }
    IsClean(){
        for (let i=0;i<this.state.GameBoard.length ; i++){
            if (this.state.GameBoard[i] !== 0) return false;
        }
        return true;
    }
    jarime(){
        let array = this.state.GameBoard;
        let moves = Math.floor(this.state.moveCount/5);
        let dirties = this.state.dirties;
        let ss = moves-dirties;
        if (dirties<moves){
            let random  = Math.floor((Math.random()*224)+1);
            array[random] = random;
            dirties++;
            this.setState({
                GameBoard:array,
                dirties:dirties
            });
        }
    }
    cleanerPosition(){
        let random  = Math.floor((Math.random()*224)+1);
        this.setState({
            CleanerPosition:44
        },()=>{
            let arr = this.cleanerSense(44);
            this.setState({
                sense:arr
            });
        })

    }
    makedirty(){
        let array=[
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
             0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        ];
        for (let i=0;i<23;i++){
            let random = Math.floor((Math.random() * 224) + 1);
            array[random] = random+1;
        }
        this.setState({GameBoard:array});
    }

    IsDirtySence(loc){
        let arr=[];
        if (this.state.GameBoard[loc['top']] !== 0)
            arr['top'] = true;
        if (this.state.GameBoard[loc['toptop']] !== 0 && this.state.GameBoard[loc['toptop']]>0) {
            arr['toptop'] = true;
        }
        if (this.state.GameBoard[loc['ttr']]>0||this.state.GameBoard[loc['ttrr']]>0||this.state.GameBoard[loc['ttl']]>0||this.state.GameBoard[loc['ttll']]>0) {
            arr['toptopside'] = true;
        }
        if (this.state.GameBoard[loc['trr']]>0||this.state.GameBoard[loc['tr']]>0||this.state.GameBoard[loc['tll']]>0||this.state.GameBoard[loc['tl']]>0) {
            arr['topside'] = true;
        }
        if (this.state.GameBoard[loc['brr']]>0||this.state.GameBoard[loc['br']]>0||this.state.GameBoard[loc['bll']]>0||this.state.GameBoard[loc['bl']]>0) {
            arr['bottomside'] = true;
        }
        if (this.state.GameBoard[loc['bbrr']]>0||this.state.GameBoard[loc['bbr']]>0||this.state.GameBoard[loc['bbll']]>0||this.state.GameBoard[loc['bbl']]>0) {
            arr['bottombottomside'] = true;
        }
        if (this.state.GameBoard[loc['right']] !== 0)
            arr['right'] = true;
        if (this.state.GameBoard[loc['rightright']] > 0)
            arr['rightright'] = true;
        if (this.state.GameBoard[loc['left']] !== 0)
            arr['left'] = true;
        if (this.state.GameBoard[loc['leftleft']] !== 0)
            arr['leftleft'] = true;
        if (this.state.GameBoard[loc['bottom']] !== 0)
            arr['bottom'] = true;
        if (this.state.GameBoard[loc['bottombottom']] !== 0)
            arr['bottombottom'] = true;

        /**** محدودیت برای سطر های کناری یا بالایی ***/
        if (loc['top']<0){
            arr['top'] = false;
            arr['toptop'] = false;
            arr['topside'] = false;
        }
        if (loc['toptop']<0){
            arr['toptop'] = false;
            arr['toptopside'] = false;
        }
        if (loc['bottombottom']<0){
            arr['bottombottom'] = false;
            arr['bottombottomside'] = false;
        }
        if (loc['bottom']>224){
            arr['bottom'] = false;
            arr['bottombottom'] = false;
            arr['bottomside'] = false;
            arr['bottombottom'] = false;
            arr['bottombottomside'] = false;
        }
        if (loc['bottombottom']>224){
            arr['bottombottom'] = false;
            arr['bottombottomside'] = false;
        }
        if ((Math.ceil(loc['right']/15))*15 === loc['right']+1){
            arr['right'] = false;
            arr['rightright'] = false;
        }
        if ((Math.ceil(loc['rightright']/15))*15 === loc['rightright']+2){
            arr['rightright'] = false;
        }
        if (((Math.ceil(loc['left']/15))*15) === loc['left']){
            arr['left'] = false;
            arr['leftleft'] = false;
        }
        if (loc['leftleft']>224){
            arr['leftleft'] = false;
        }
        return arr;

    }

    // ...........................
    //  ttll              ttl              toptop           ttr               ttrr
    //  tll                tl               top            tr                trr
    //  leftleft          left           Cleaner          right             rightright
    //  bll               bl              bottom           br               brr
    //  bbll             bbl            bottombottom       bbr              bbrr
    // ...........................
    cleanerSense(i){
        parseInt(i);
        let loc = [];
        loc['toptop'] = i-30;
        loc['ttl'] = i-29;
        loc['ttll'] = i-28;
        loc['ttr'] = i-31;
        loc['ttrr'] = i-32;

        loc['top'] = i-15;
        loc['tr'] = i-16;
        loc['tl']=i-14;
        loc['trr']=i-17;
        loc['tll']=i-13;

        loc['right'] = i-1;
        loc['rightright'] = i-2;
        loc['left'] = i+1;
        loc['leftleft'] = i+2;


        loc['bottom'] = i+15;
        loc['br'] = i+14;
        loc['bl'] = i+16;
        loc['bll'] = i+17;
        loc['brr'] = i+13;

        loc['bottombottom'] = i+30;
        loc['bbl'] = i+31;
        loc['bbll'] = i+32;
        loc['bbr'] = i+29;
        loc['bbrr'] = i+28;

        return this.IsDirtySence(loc);
    }

    start(){
        if (this.state.IsClean === false){
            this.interval = setInterval(function () {
                this.move()
             }.bind(this), 10)
        }else{
            alert("Here you are :) Room Is Clean!!!")
        }
    }
    end(){
        clearInterval(this.interval);
    }


    render() {
        return (
            <div className={"App"}>
                <button className="startbutton" onClick={this.start.bind()}>start</button>
                <div className="App-intro row">
                    {this.state.GameBoard.map(function (value,i) {
                        return(
                            <span>
                        <Fieldboard status={value} key={i} CleanerPosition={(i === this.state.CleanerPosition)?true:false} topField={5} />
                                {/*{(i == this.state.CleanerPosition)?this.cleanerSense(i):""}*/}
                                {/*{(i == this.state.CleanerPosition)?console.log(this.state):""}*/}
                                {/*{console.log(i)}*/}
                        </span>
                        );
                    }.bind(this))}
                    {console.log(this.state)}
                </div>
            </div>
        );
    }
}

export default board;