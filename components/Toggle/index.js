import { classNamesToStr } from "@/utils/index"
import css from './index.module.css'

const Toggle = ({
    name,
    className = '',
    labelText={
        yes: 'yes', 
        no: 'no'
    },
    defaultVal = false,
    inputProps = {},
    error,
    ...props
}) => {
    return(
        <div className={classNamesToStr([css.root, className])} {...props}>
            <label>
                <span data-role="title">{labelText.no}</span>
                <input 
                    name={name} 
                    {...inputProps} 
                    type="radio" 
                    value={false} 
                    defaultChecked={ !defaultVal } 
                />
            </label>
            <label>
                <span data-role="title" onClick={() => console.log('clicked')}>{labelText.yes}</span>
                <input 
                    name={name}
                    {...inputProps} 
                    type="radio" 
                    value={true} 
                    defaultChecked={ defaultVal } 
                />
            </label>
            <span data-role="indicator"></span>
            {error}
        </div>
    )
}

export default Toggle