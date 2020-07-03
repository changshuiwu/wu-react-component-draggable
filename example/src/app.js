
import React from 'react'
import { render } from 'react-dom'
import ReactDemo from '../../src/index.js' // 引入组件

const App = () => (
                <ReactDemo titleName={`自定义拖拽组件`}>hello</ReactDemo>
               )

render(<App />, document.getElementById('root'))
