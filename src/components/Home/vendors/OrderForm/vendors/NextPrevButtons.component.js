import React, {useState} from "react"

import "../OrderForm.css"

export default function NextPrevButtons({next, prev, step, top, canProceed}){
    if(!canProceed)
        next = null;
        
    const NextButton = 
        <button className={`NextPrevButton green NextPrevButton--quidel NextPrevButton--inverted nextStep ${canProceed ? "Next--quidel Next--inverted": ""}`} onClick={next}>
            <span>Continue</span>
        </button> 
    const PrevButton = 
        <button className="NextPrevButton red NextPrevButton--quidel Prev--quidel NextPrevButton--inverted Prev--inverted prevStep" onClick={prev}>
            <span>Go Back</span>
        </button>
    return (
        <div style={{width: "100%", height: "26px",position: "relative", top}}>
            {step !== 3 ? NextButton : <div></div>}
            {step !== 0 ? PrevButton : <div></div>}
        </div>
    )
}
// NextPrevButton NextPrevButton--quidel NextPrevButton--inverted nextStep Next--quidel Next--inverted
