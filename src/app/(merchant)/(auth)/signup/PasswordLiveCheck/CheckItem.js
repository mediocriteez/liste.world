import CompleteCheck from "@/components/SVG/CompleteCheck"

const CheckItem = ({children, fulfilled}) => {
    return(
        <li>
            {children}
            <span>
                <CompleteCheck complete={fulfilled} style={{height: '.85lh'}}/>
            </span>
        </li>
    )
}

export default CheckItem