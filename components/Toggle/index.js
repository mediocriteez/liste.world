import { classNamesToStr } from "@/utils/index"
import css from './index.module.css'
import { forwardRef } from "react"

const Toggle = forwardRef(({
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
},
ref
) => {

    return(
        <div ref={ref} className={classNamesToStr([css.root, className])} {...props}>
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
})

export default Toggle