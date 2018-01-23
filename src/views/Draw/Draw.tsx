import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './Draw.sass'
import { unit, palette } from 'styles/styleguide'
import Palette from './components/Palette'
import Slider from 'components/Slider/Slider'
import Image from 'components/Image/Image'
import Canvas from './components/Canvas'
import MainLayout from 'components/Layouts/Main'

type Props = StateProps & DispatchProps

class Draw extends Component<Props> {
  render() {
    let {
      selectBrush,
      brushSize,
      selectSelection,
      selectionSize,
      colorIndex
    } = this.props

    return (
      <MainLayout header={<Link to='/code'>Go to Code</Link>}>
        <div className={styles.Draw}>
          <Canvas/>
          <div>
            <Palette/>
            <div className={styles.inputGroup}>
            <span 
              className={styles.brushIndicator}
              style={{background: colorIndex === 0 ? palette[6] : null}}  
            >
              <div 
                style={{
                  width: brushSize * unit,
                  height: brushSize * unit,
                  background: palette[colorIndex]
                }}
              />
            </span>
            <Slider
              className={styles.slider}
              onChange={selectBrush}
              value={brushSize}
            />
            </div>
            <div className={styles.inputGroup}>
              <Image asset='selectionIcon'/>
              <Slider
                className={styles.slider}              
                onChange={selectSelection}
                value={selectionSize}
              />
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }
}

type StateProps = StoreState['draw']
const mapStateToProps = (state: StoreState): StateProps => {
  return state.draw
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    selectBrush: (data) => 
      dispatch({type: 'SelectBrushSize', data}),
    selectSelection: (data) =>
      dispatch({type: 'SelectSelectionSize', data})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Draw)
