import CheckItem from "./CheckItem";

const PasswordLiveCheck = ({password}) => {

    const passwordRules = {
        hasUpper: /[A-Z]/.test(password),
        hasLower: /[a-z]/.test(password),
        hasSpecial: /[!@#$%^&*]/.test(password),
        isLongEnough: password?.length >= 8,
        hasOnlyAllowed: password?.length > 0 && /^[A-Za-z0-9!@#$%^&*]*$/.test(password),
    };  

    return(
        <div>
            <span>Password must:</span>
            <ul>
                <CheckItem fulfilled={passwordRules.isLongEnough}>be at least 8 charcters long</CheckItem>
                <CheckItem fulfilled={passwordRules.hasOnlyAllowed}>only include letters, numbers, and !@#$%^&*</CheckItem>
            </ul>
            <span>and includes:</span>
            <ul>
                <CheckItem fulfilled={passwordRules.hasUpper}>one uppercase character</CheckItem>
                <CheckItem fulfilled={passwordRules.hasLower}>one lowercase character</CheckItem>
                <CheckItem fulfilled={passwordRules.hasSpecial}>one special character: !@#$%^&*</CheckItem>
            </ul>
        </div>
    )
}

export default PasswordLiveCheck