import CheckItem from "./CheckItem";
import css from "./index.module.css"

const PasswordLiveCheck = ({password}) => {

    const passwordRules = {
        hasUpper: /[A-Z]/.test(password),
        hasLower: /[a-z]/.test(password),
        hasSpecial: /[!@#$%^&*]/.test(password),
        isLongEnough: password?.length >= 8,
        hasOnlyAllowed: password?.length > 0 && /^[A-Za-z0-9!@#$%^&*]*$/.test(password),
    };  

    return(
        <ul className={css.root}>
            <CheckItem fulfilled={passwordRules.isLongEnough}>at least 8 charcters long</CheckItem>
            <CheckItem fulfilled={passwordRules.hasOnlyAllowed}>letters, numbers, and !@#$%^&*</CheckItem>
            <CheckItem fulfilled={passwordRules.hasUpper}>one uppercase character</CheckItem>
            <CheckItem fulfilled={passwordRules.hasLower}>one lowercase character</CheckItem>
            <CheckItem fulfilled={passwordRules.hasSpecial}>one special character: !@#$%^&*</CheckItem>
        </ul>
    )
}

export default PasswordLiveCheck