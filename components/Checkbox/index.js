import CompleteCheck from '../SVG/CompleteCheck'
import css from './index.module.css'

const Checkbox = (props) => {
    return(
        <span className={css.root}>
            <input className={css.checkbox} type="checkbox" {...props} />
            <span className={css.indicator}></span>
        </span>
    )
}

export default Checkbox