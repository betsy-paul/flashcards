import React, {Component, useState} from "react";
import RecipeChoices from "./RecipeChoices";
import drinksJson from "./drinks.json";
import './BaristaForm.css'; // Assuming you have a CSS file for styling


const BaristaForm = () => {
    const [drink, setDrink] = useState("");
    const [drinkRecipe, setDrinkRecipe] = useState({});
    const [correctTemp, setCorrectTemp] = useState('');
    const [correctMilk, setCorrectMilk] = useState('');
    const [correctSyrup, setCorrectSyrup] = useState('');
    const [correctBlended, setCorrectBlended] = useState('');

    const getNextDrink = (drink) => {
        let randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
        setDrink(drinksJson.drinks[randomDrinkIndex].name);
        setDrinkRecipe(drinksJson.drinks[randomDrinkIndex].ingredients);
    }


    const [tempNthings, settempNthings] = useState({
        'temperature': '',
        'milk': '',
        'syrup': '',
        'blended': '',
    });

    const ingredients = {
        'temperature' : ['hot', 'lukewarm', 'cold'],
        'milk': ['cow', 'oat', 'goat', 'almond', 'none'],
        'syrup': ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
        'blended': ['yes', 'turbo', 'no']
    }

    const onCheckAnswer = () => {

        if (drinkRecipe.temp != tempNthings['temperature']){
            setCorrectTemp('wrong');
            }
            else {
            setCorrectTemp("correct");
        }

        if (drinkRecipe.milk != tempNthings['milk']){
            setCorrectMilk('wrong');
            }
            else {
            setCorrectMilk("correct");
        }

        if (drinkRecipe.syrup != tempNthings['syrup']){
            setCorrectSyrup('wrong');
            }
            else {
            setCorrectSyrup("correct");
        }

        if (drinkRecipe.blended != tempNthings['blended']){
            setCorrectBlended('wrong');
            }
            else {
            setCorrectBlended("correct");
        }

    }

    const onNewDrink = () => {
        // Logic to generate a new drink, set the inputs to empty, and get a new drink
        // This function will reset the form and get a new drink from the drinksJson
        settempNthings({
            'temperature': '',
            'milk': '',
            'syrup': '',
            'blended': '' 
        });

        setCorrectTemp('');
        setCorrectMilk('');
        setCorrectSyrup('');
        setCorrectBlended('');

        getNextDrink();
    }

  return (
    <div>
        <h2> Make a </h2>
        <div className="drink-container"> 
            <h2 className="mini-header"> {drink} </h2>
            <button type="new-drink-button" className="button new-drink" onClick={onNewDrink}> 🔄 </button>
        </div>

        <form className="container">
            <div className="mini-tempPlusSyrupcontainer"> 
                <h3> Temperature </h3>
                    <div className="answer-space" id={correctTemp}>
                        {tempNthings["temperature"]} 
                    </div>
                        <RecipeChoices
                        handleChange={(e) => settempNthings((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))}

                        label="temperature"
                        choices={ingredients["temperature"]}
                        checked={tempNthings["temperature"]}
                    />
            </div>
            
            <div className="mini-tempPlusSyrupcontainer">
                <h3> Milk </h3>
                    <div className="answer-space"id={correctMilk} >
                        {tempNthings["milk"]} 
                    </div>
                        <RecipeChoices
                        handleChange={(e) => settempNthings((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))}

                        label="milk"
                        choices={ingredients["milk"]}
                        checked={tempNthings["milk"]}
                    />
            </div>

            <div className="mini-tempPlusSyrupcontainer">
                <h3> Syrup </h3>
                    <div className="answer-space" id={correctSyrup}>
                        {tempNthings["syrup"]} 
                    </div>
                        <RecipeChoices
                        handleChange={(e) => settempNthings((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))}

                        label="syrup"
                        choices={ingredients["syrup"]}
                        checked={tempNthings["syrup"]}
                    />
            </div>

            <div className="mini-container">
                <h3> Blended or Not </h3>
                    <div className="answer-space" id={correctBlended}>
                        {tempNthings["blended"]} 
                    </div>
                        <RecipeChoices
                        handleChange={(e) => settempNthings((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))}

                        label="blended"
                        choices={ingredients["blended"]}
                        checked={tempNthings["blended"]}
                    />
            </div>
            
        </form>

        <button 
            type="submit" 
            className="button submit" 
            onClick={onCheckAnswer}> 
            Check Answer 
        </button>

        <button 
            type="new-drink-button"
            className="button new-drink"
            onClick={onNewDrink}> 
            New Drink 
        </button>

    </div>
  );
  
};

export default BaristaForm;