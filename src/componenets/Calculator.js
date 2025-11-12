import { useState } from "react";

const Calculator = () => {
    const [display, setDisplay] = useState("");
    const [result, setResult] = useState("");

    const handleClick = (value) => {
        if (value === "C") {
            setDisplay("");
            setResult("");
            return;
        }

        if (value === "=") {
            try {
                if (!display || /[+\-*/.]$/.test(display)) {
                    setResult("Error");
                    return;
                }
                //  Safe single-line ESLint ignore for eval-like function
                // eslint-disable-next-line no-new-func
                const evalResult = Function(`"use strict"; return (${display})`)();

                if (evalResult === Infinity) setResult("Infinity");
                else if (isNaN(evalResult)) setResult("NaN");
                else setResult(evalResult.toString());
            } catch (error) {
                setResult("Error");
            }
            return;
        }

        setDisplay((prev) => prev + value);
    };

    const buttons = [
        "7", "8", "9", "/",
        "4", "5", "6", "*",
        "1", "2", "3", "-",
        "0", ".", "=", "+",
        "C",
    ];

    return (
        <div
            style={{
                width: "250px",
                margin: "50px auto",
                textAlign: "center",
                fontFamily: "Arial, sans-serif",
                border: "2px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            }}
        >
            <input
                type="text"
                value={display}
                readOnly
                style={{
                    width: "90%",
                    height: "40px",
                    fontSize: "20px",
                    textAlign: "right",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    paddingRight: "10px",
                }}
            />

            <div style={{ fontSize: "22px", minHeight: "30px", marginBottom: "10px" }}>
                {result && <div>{result}</div>}
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "10px",
                }}
            >
                {buttons.map((btn) => (
                    <button
                        key={btn}
                        onClick={() => handleClick(btn)}
                        style={{
                            height: "50px",
                            fontSize: "18px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            backgroundColor: "#f5f5f5",
                            border: "1px solid #ccc",
                        }}
                    >
                        {btn}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Calculator;
