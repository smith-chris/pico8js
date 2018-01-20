import { Sprite, Application, Graphics, interaction, Rectangle } from 'pixi.js'
import { image } from 'views/Draw/components/Canvas'
import store from 'store/store'
import { addLogAction, resetLogsAction } from 'store/code'

const app = new Application({
  width: 128,
  height: 128
})

let { stage } = app
let _update: () => void

let log = (value: string) => {
  store.dispatch(addLogAction(value.toString()))
}

export const stop = () => {
  if (_update) {
    app.ticker.remove(_update)    
  }
}

export const reset = () => {
  stop()
  while (stage.children[0]) { 
    stage.removeChild(stage.children[0])
  }
  store.dispatch(resetLogsAction())
}

export const run = () => {
  let { text } = store.getState().code
  reset()
  setTimeout(() => {
    let spr = () => {
      let texture = app.renderer.generateTexture(
        image, null, null,
        new Rectangle(0, 0, 16, 16)
      )
      let result = new Sprite(texture)
      result.anchor.set(0.5)
      return result
    }
    let evalText = `
    let update
    ${text}
    let __res = {update: update}
    __res
    `
    // tslint:disable-next-line
    _update = eval(evalText).update
    if (_update) {
      app.ticker.add(_update)
    }
  })
}

export default app.view
