import React, { useEffect, useRef} from 'react'
import ReactDOM from 'react-dom'

const Protal = props =>{

    const {current: el} = useRef(document.createElement('div'))

    useEffect( () => {

        const root = document.getElementById("root");
        if(root) {
            root.appendChild(el);
        }

        return () => {
            if(root) {
                root.removeChild(el);
            }
        }
    })

    return ReactDOM.createPortal(props.children, el)
}

export default Protal
