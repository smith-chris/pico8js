import React from 'react'
import styles from './Palette.sass'
import { palette } from 'styles/styleguide'
import { connect } from 'react-redux'

type Props = StateProps & DispatchProps

const Palette = (props: Props) => {
  let {selectedIndex, selectColorIndex} = props
  return (
    <div className={styles.Palette}>
      {palette.map((hex, i) => (
        <span
          key={hex}
          className={[
            styles.PaletteElement,
            i === selectedIndex ? styles.PaletteElementActive : null
          ].join(' ')}
          style={{ background: hex }}
          onClick={() => {selectColorIndex(i)}}
        />
      ))}
    </div>
  )
}

type StateProps = {
  selectedIndex: number
}
const mapStateToProps = (state: StoreState): StateProps => {
  return {
    selectedIndex: state.draw.colorIndex
  }
}

type DispatchProps = {
  selectColorIndex: (d: number) => void
}
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    selectColorIndex: (data) => dispatch({type: 'SelectColorIndex', data})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Palette)
