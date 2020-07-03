
/** @jsx jsx */

import React, {useEffect, useRef, useState} from 'react'
import Protal from './components/index.js'
import {jsx, css } from '@emotion/core'
import './index.css'

let container = css`
  position: absolute;
  z-index: 999;
  min-width: 240px;
  background: #fff;
  background-clip: padding-box;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: auto;
`;
const header = css`
  border-bottom: 1px solid #e8e8e8;
  border-radius: 4px 4px 0 0;
  user-select: none;
  cursor: move;
`;
const title = css`
  margin: 0;
  padding: 13px 24px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  word-wrap: break-word;
`;
const closeBtn = css`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  padding: 0;
  color: rgba(0, 0, 0, 0.45);
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: rgba(0, 0, 0, 0.75);
    text-decoration: none;
  }
`;
const closeWrapper = css`
  display: block;
  width: 56px;
  height: 48px;
  font-size: 16px;
  font-style: normal;
  line-height: 48px;
  text-align: center;
  text-transform: none;
  text-rendering: auto;
`;
const content = css`
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
`;

let initX = 0;
let initY = 0;
let isMouseDown = false;

const DraggableLayer = React.forwardRef((props, ref) =>{

    const {children, onClose, titleName, style, visible} = props

    const isVisible = typeof visible === 'boolean'

    const [draggableLayerVisible, setDraggableLayerVisible]  = useState( (isVisible && visible) || true)

    const draggableRef = useRef() 
    const headerRef = useRef()

    useEffect( () => {
        if(isVisible) {
            setDraggableLayerVisible(visible)
        }
    }, ['visible'])

    const handleClose = () => setDraggableLayerVisible(false)

    // set initial position
    const initBodyPosition = () => {
        draggableRef.current.style.left =`calc(50% - ${draggableRef.current.clientWidth /2}px)`;
        draggableRef.current.style.top =`calc(50% - ${draggableRef.current.clientHeight /2}px)`;
    }

    const mouseDownHandler = (e) => {
        isMouseDown = true;
        initX = e.offsetX;
        initY = e.offsetY;
        draggableRef.current.style.opacity = 0.5
    }

    const mouseMoveHandler = (e) => {
        if (isMouseDown && draggableRef && draggableRef.current) {
            let x = e.clientX - initX;
            let y = e.clientY - initY;

            if (x < 0) {
                x = 0;
            } else if (x >= document.documentElement.clientWidth - draggableRef.current.offsetWidth) {
                x = document.documentElement.clientWidth - draggableRef.current.offsetWidth
            }

            if (y < 0) {
                y = 0;
            } else if (y >= document.documentElement.clientHeight - draggableRef.current.offsetHeight) {
                y = document.documentElement.clientHeight - draggableRef.current.offsetHeight
            }
            draggableRef.current.style.left = `${x}px`;
            draggableRef.current.style.top = `${y}px`;
        }
    }

    const mouseUpHandler = () => {
        isMouseDown = false;
        if (draggableRef && draggableRef.current) {
          draggableRef.current.style.opacity = 1;
        }
    };

    useEffect( () => {
        initBodyPosition()
        headerRef.current.addEventListener("mousedown", mouseDownHandler);
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);

        return () => {
            headerRef.current.removeEventListener("mousedown", mouseDownHandler);
            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("mouseup", mouseUpHandler);
        }
    }, [])


    return(
        <Protal>
            {
                draggableLayerVisible ? (
                    <div ref={draggableRef} css={container} style={style}>
                            <div css={header} ref={headerRef}>
                                <div css={title}>{titleName || "浮动拖拽组件"}</div>
                            </div>
                            <button css={closeBtn} type="button">
                                <span css={closeWrapper}
                                    onClick={
                                        () => {
                                            if (typeof onClose === 'function') {
                                                onClose()
                                        }
                                        handleClose()
                                        }
                                    }
                                >
                                    X
                                </span>
                            </button>
                            <div css={content}>{children || null}</div>
                    </div>
                ) : (
                    <div></div>
                )
            }
        </Protal>
    )
})
export default DraggableLayer