//Cilj je iamti definisanu metodu unutar klasne pametne komponente i onda je 
//korsititi u skroz drugoj komponennti koja je glupa

import React, { Component } from 'react';

import Verson from './Person/Person';

import Radium, {StyleRoot} from 'radium';

import './App.css';

import Error from './ErrorBoundary/ErrorBoundary';




class App extends Component {



  //state pocetni---------------------------------------------------------------------######
state = {

persons: [

{id: 'abc1', name: 'Maxx', age: '28', },
{id: 'abc2', name : "Anes", age: "23"},
{id: 'abc3', name : "Safet", age: "21"}

],

otherState: 'someValue',
//Ovo smo namjerno settali na false
showPersons: true
}
//state pocetni ----------------------------------------------------------------------------------







//Funkcija promijenjenoIme ------------------------------------------------------------###########


promijenjenoIme = (event, b) =>  {


//novi kod za two way binding---------------------------####@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//Ovo ispod trazi index osobe koja nam treba
const IndexOsobe = this.state.persons.findIndex(i => {

  //Ovo ispod vraca true ili false, da li smo potrefili ono sto zelimo
  //dakle da li se podudaraju id-evi
  //ako se podudaraju, onda se u IndexOsobe spasi index tog objekta
return i.id === b;


});

//roki je citava osoba, ne samo index kao IndexOsobe.. i to ona osoba koja
//sadrzi odredjeni id i bas ona koja nam treba

//roki je kopija citavog objekta sa odredjenim indeksom
//namjerno kazem kopija jer je objekat refrence type i ne valja 
//sa njim direktno manipulisati

const roki = {
  ...this.state.persons[IndexOsobe]

};

roki.name = event.target.value;


const licnosti = [...this.state.persons];
licnosti[IndexOsobe] = roki;


//const roki2 = Object.assign({}, this.state.persons[IndexOsobe])
//alternativa rokiju

//novi kod za two way binding-------------------------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@






  this.setState({ persons:licnosti })
   
  
}

//Funkcija promijenjenoIme ------------------------------------------------------------











//Funkcija togglePersonsHandler ------------------------------------------#######################

togglePersonsHandler = () => {

const doesShow = this.state.showPersons;
this.setState({showPersons: !doesShow});


}


//Funkcija togglePersonsHandler ---------------------------------------------------------------
//Zelimo da uklonimo objeakt iz naseg arraya kada kliknemo na paragraf


deletePersonHandler = (personIndex) => {

const narod = [...this.state.persons];
narod.splice(personIndex, 1);

this.setState({persons: narod});

}













  render(){



//Inline styling ---------------------

const style = {

  backgroundColor: 'green',
  color: 'white',
  font: 'inherit',
  border: '1px solid blue',
  padding: '8px',
  cursor: 'pointer',
  //radius majka - paket
  ':hover': {

    backgroundColor: 'lightgreen',
    color: 'black'

  }
  
  
  
  };
  //Inline styling ---------------------







let osobe = null;

//Ako je ovo true
if (this.state.showPersons){

  osobe = (

    <div>  




      {this.state.persons.map((x, index) => {

      return <Error key = {x.id}>
        <Verson
              click = {() => this.deletePersonHandler(index)}
              changed = {(event) => this.promijenjenoIme(event, x.id)}
              name = {x.name}
              age = {x.age}
              
              
              
              /></Error>

       })}

   </div>

    );

    //Evo kako cemo dugme podesiti aaaaa

    style.backgroundColor =  "red";
    //radius majka - paket

    style[':hover']= {
      backgroundColor: 'salmon',
       color: 'black'

    }
}






//Dinamicko igranje sa ccs klasama------------------##########################################



//let classes = ['red', 'bold'].join(' ');
//classes kad aplajamo na nesto, ono postane red i bold

let classes = [];

if(this.state.persons.length<=2){
//classes = ['red', 'bold'].join(' ');
classes.push('bold');
}

if(this.state.persons.length>2){

classes.push('red');

}





//-----------------------------------------------------------
  return (

<StyleRoot>

  <div className="App">
    
  <h4>Nisam ni znao da je ovako lahko prikazati sadrzaj neki</h4>

  <p className = {classes.join(' ')}> classname zavisi od broja objekata u pocetnom state-u</p>


<button style = {style} onClick = {this.togglePersonsHandler}>Toggle Persons</button>

    
{osobe}

 
 </div>
 </StyleRoot>
  );
  
  }
}



export default Radium(App);
