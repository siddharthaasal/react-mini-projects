import "./Wordle.css"
import { useEffect, useState } from "react";
import { wordleWords } from "../wordle-words";

export function Wordle() {

    const [answer, setAnswer] = useState("");
    const [grid, setGrid] = useState(Array(6).fill(null).map(() => Array(5).fill(null)));
    const [currRow, setCurrRow] = useState(0);
    const [currGuess, setCurrGuess] = useState("");

    useEffect(() => {
        const w = wordleWords[Math.floor(Math.random() * wordleWords.length)]
        console.log(w);
        setAnswer(w);
    }, [])

    useEffect(() => {
        const handleKeyDown = (e) => {

            const keyPressed = e.key;
            console.log(keyPressed);

            const regex = /^[a-zA-Z]$/; //only a single char in a-z or A-Z

            if (regex.test(keyPressed) && currGuess.length != 5) {
                //valid key
                setCurrGuess((prevGuess) => prevGuess + keyPressed);
            }

            if (keyPressed === "Enter" && currGuess.length != 5) {
                // user filled a word and pressed enter
                console.log(userInput)
            }

            if (keyPressed === "Backspace" && currGuess.length > 5) {
                // user wants to remove a char
                setCurrGuess((prevGuess) => prevGuess.substring(0, prevGuess.length - 1))
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.addEventListener('keydown', handleKeyDown);
    }, [])

    return (
        <>
            <h2>Wordle</h2>

            {/* board */}
            <div>
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
                                        className="tile"
                                    >
                                        {tile}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}

                <p>Current Guess {currGuess}</p>
            </div>


        </>
    )
}