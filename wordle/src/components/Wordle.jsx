import "./Wordle.css"
import { useEffect, useState } from "react";
import { wordleWords } from "../wordle-words";

export function Wordle() {

    const [answer, setAnswer] = useState("");
    const [grid, setGrid] = useState(Array(6).fill(null).map(() => Array(5).fill(null)));
    const [currRow, setCurrRow] = useState(0);
    const [currGuess, setCurrGuess] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [outcome, setOutcome] = useState("");

    async function validateWord(word) {

        //first pass, match indexwise
        //second pass: match for yellow
        //rest gray
        console.log("validating ", word);

        let isCorrect = word === answer;

        let ansCopy = answer.split("");
        let colorStates = new Array(5).fill(null);
        // first pass
        for (let i = 0; i < word.length; i++) {
            if (ansCopy[i] === word.charAt(i)) {
                colorStates[i] = "Green";
                ansCopy[i] = "_";
            }
        }
        console.log("after pass 1 ", colorStates);
        // second pass
        for (let i = 0; i < word.length; i++) {
            if (colorStates[i] === null && ansCopy.includes(word[i])) {
                colorStates[i] = "Yellow";
                const indexToReplace = ansCopy.indexOf(word[i]);
                ansCopy[indexToReplace] = "_";
            }
        }
        console.log("after pass 2 ", colorStates);
        // the ones left null are supposed to be gray, no pass needed
        for (let i = 0; i < word.length; i++) {
            if (colorStates[i] === null) {
                colorStates[i] = "Gray";
            }
        }
        console.log("after pass 3 ", colorStates);

        return { colorStates, isCorrect };
    }

    useEffect(() => {
        const w = wordleWords[Math.floor(Math.random() * wordleWords.length)]
        console.log(w);
        setAnswer(w);
    }, [])

    useEffect(() => {
        if (!gameOver) {
            const handleKeyDown = async (e) => {

                let keyPressed = e.key;
                // console.log(keyPressed);
                const regex = /^[a-zA-Z]$/; //only a single char in a-z or A-Z

                if (regex.test(keyPressed) && currGuess.length < 5) {
                    //valid key
                    keyPressed = keyPressed.toUpperCase();
                    const newGrid = grid;
                    newGrid[currRow][currGuess.length] = keyPressed;
                    setGrid(newGrid);
                    setCurrGuess(prev => prev + keyPressed);
                }

                if (keyPressed === "Enter" && currGuess.length == 5) {
                    // user filled a word and pressed enter
                    console.log("User's entered: ", currGuess);

                    const { colorStates, isCorrect } = await validateWord(currGuess);

                    const newGrid = [...grid];
                    newGrid[currRow] = currGuess.split("").map((char, i) => ({
                        letter: char,
                        color: colorStates[i].toLowerCase(),
                    }));
                    setGrid(newGrid);

                    if (isCorrect) {
                        setGameOver(true);
                        setOutcome("WON");
                    } else if (currRow === 5) {
                        setGameOver(true);
                        setOutcome("LOST");
                    } else {
                        setCurrRow(prev => prev + 1);
                        setCurrGuess("");
                    }
                }

                if (keyPressed === "Backspace" && currGuess.length > 0) {
                    // user wants to remove a char
                    const newGrid = grid;
                    newGrid[currRow][currGuess.length - 1] = null;
                    setGrid(newGrid);
                    setCurrGuess(prev => prev.slice(0, -1));
                }

            }

            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [currGuess, gameOver])

    useEffect(() => {
        console.log("currGuess changed:", currGuess);
    }, [currGuess, grid]);

    return (
        <>
            <h2>Wordle</h2>

            {/* board */}

            <div className="board">
                {grid.map((row, rowIndex) => {
                    return (
                        <div
                            key={rowIndex}
                            className="row"
                        >
                            {row.map((tile, colIndex) => {
                                return (
                                    <div
                                        key={`${rowIndex}-${colIndex}`}
                                        className={`tile ${tile?.color || ""}`}
                                    >
                                        {tile?.letter || tile}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>


            {
                gameOver &&
                <>
                    <h2>You {outcome}</h2>
                    <h3>Word: {answer}</h3>
                </>
            }



        </>
    )
}
