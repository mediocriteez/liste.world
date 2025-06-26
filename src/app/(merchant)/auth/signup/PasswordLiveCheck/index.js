import CheckItem from "./CheckItem";

const PasswordLiveCheck = ({password}) => {

    const passwordules = {
        hasUpper: /[A-Z]/.test(password),
        hasLower: /[a-z]/.test(password),
        hasSpecial: /[!@#$%^&*]/.test(password),
        isLongEnough: password.length >= 8,
        hasOnlyAllowed: /^[A-Za-z0-9!@#$%^&*]*$/.test(password),
    };  

    return(
        <div>
            <span>Password must:</span>
            <ul>
                <CheckItem verified={isLongEnough}>be at least 8 charcters long</CheckItem>
                <CheckItem verified={isLongEnough}>only include letters, numbers, and !@#$%^&*</CheckItem>
            </ul>
            <span>and include:</span>
            <ul>
                <CheckItem verified={passwordules.hasUpper}>one uppercase character</CheckItem>
                <CheckItem verified={passwordules.hasUpper}>one lowercase character</CheckItem>
                <CheckItem verified={passwordules.hasUpper}>one special character: !@#$%^&*</CheckItem>
                <CheckItem verified={passwordules.hasUpper}>one uppercase character</CheckItem>
            </ul>
        </div>
    )
}

export default PasswordLiveCheck