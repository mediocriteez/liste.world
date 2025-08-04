import css from './index.module.css'

const CompleteCheck = ({complete = false, ...props}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" className={css.root} {...props} data-complete={complete}>
    {/* <circle cx="12.5" cy="12.5" r="12.5" fill={'var(--white)'}/> */}
    <path
      d="M22 5 9 18l-6-6c-.55-.55-1.45-.55-2 0s-.55 1.45 0 2l7 7c.55.55 1.45.55 2 0L24 7c.55-.55.55-1.45 0-2s-1.45-.55-2 0Z"
    />
  </svg>
)
export default CompleteCheck