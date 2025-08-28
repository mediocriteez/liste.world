import { classNamesToStr } from "@/utils/index";
import css from './index.module.css'

const Spinner = ({className ='', ...props}) => <img src="/images/logo_clean.svg" alt="loading" className={classNamesToStr([className, css.root])}/>

export default Spinner