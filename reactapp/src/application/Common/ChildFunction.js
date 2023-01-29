import React from "react";

let ChildComponent = (props)=>{
    let newAge = 500000;
    
    //props.name = "Ashish"; //props are immutable do not change them

    return(
        <>
            {props.name}
            
            {props.children[0]}
            {props.children[1]}

            {JSON.stringify(props.user)}

            <button onClick={()=>props.clickOnChild(newAge)}>Click On Child</button>
        </>
    )
}

export default ChildComponent;