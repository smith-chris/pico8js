import React from 'react'
import styles from './Editor.sass'
import {Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import './picoTheme.global.sass'
import 'codemirror/mode/javascript/javascript'

type Props = {
  onChange: (newValue: string) => void,
  value: string
}

const Editor = (props: Props) => {
  let {onChange, value} = props
  return (
    <CodeMirror
      className={styles.Editor}
      value={value}
      options={{
        mode: 'javascript',
        theme: 'pico',
        tabSize: 2
      }}
      onBeforeChange={(editor, data, newValue) => {
        onChange(newValue)
      }}
    />
  )
}

export default Editor
