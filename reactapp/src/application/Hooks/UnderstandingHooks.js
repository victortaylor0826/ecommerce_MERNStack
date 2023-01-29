//hooks - are functions or composition of multiple functions to help us build components like we do in class based comps
import React, { useState, useRef, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";//allows us to access state in component mapStateToProps and mapDispatchToProps

import {AddUser} from "../State/User/UserAction";

let UsingHooks = (props)=>{
    
    //let name = props.name //"Paribesh";
    //this.state = { name : "Joe Biden" }

    let [name, setName] = useState("Joe Biden");//initializes the state and the gives callbacks to update the same

    let inputStreet = useRef(null);//allows us to create reference to access html/view with ref
    //inputStreet.value = "Some Value";

    let address = useSelector((state)=>state.userReducer.street);//mapStateToProps - allow us to access the state from store
    //inputStreet.value = address;

    let dispatchAddress = useDispatch();//mapDispatchToProps - used to send action to store/reducer
    
    //useEffect - hook can be used as a component did mount to set the values in ref html
    //useeffect is the hook that we use to make it work as componentDidMount, componentWillUnmount
    useEffect(()=>{
        inputStreet.current.value = address;
    },[])

    let onTextChange = (evt)=>{
        let newName = evt.target.value;

        setName(newName);
        //this.setState({name:newName})

        evt.preventDefault();
    }

    let updateAddress = ()=>{
        dispatchAddress(AddUser({userName:name, street: inputStreet.current.value}))
    }

    return(
        <div>
            <label>My Name is - {name}
                <input type={"text"} value={name} onChange={onTextChange}></input>
            </label>

            <label>My Name is - {address} 
                <input type={"text"} ref={inputStreet}></input>
            </label>
            <button onClick={updateAddress} >Update Adress</button>
        </div>
    )
}

export default UsingHooks;