import React from "react"
import {Link as ScrollLink} from "react-scroll"
import {Element as ScrollDestination} from "react-scroll"

import "../OrderForm.css"

export default function NextPrevButtons({next, prev, step, top, canProceed}){
    if(!canProceed)
        next = null;
    const NextButton = 
        <ScrollLink to="goToStep" smooth={true} duration={100} spy={true}>
            <button className={`NextPrevButton green NextPrevButton--quidel NextPrevButton--inverted nextStep ${canProceed ? "Next--quidel Next--inverted": ""}`} onClick={next}>
                <span>Continue</span>
            </button> 
        </ScrollLink>

    const PrevButton = 
        <ScrollLink to="goToStep" smooth={true} duration={100} spy={true}>
            <button className="NextPrevButton red NextPrevButton--quidel Prev--quidel NextPrevButton--inverted Prev--inverted prevStep" onClick={prev}>
                
                <span>Go Back</span>
            </button>
        </ScrollLink>
    return (
        <div style={{width: "100%", height: "26px",position: "relative", top}}>
            {step !== 3 ? NextButton : <div></div>}
            {step !== 0 ? PrevButton : <div></div>}
        </div>
    )
}
