import css from './index.module.css'

const PriceTag = ({className='', ...props}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 225" {...props} className={`${css.root} ${className}`}>
    <path
      d="M472 0H115c-8.81 0-16.66 3.88-23 10L10 89c-6.92 6.69-10 15-10 24s3.01 17.31 10 24l82 79c6.33 6.06 14.24 9 23 9h357c15.46 0 28-12.54 28-28V28c0-15.46-12.54-28-28-28ZM79 146c-18.23 0-33-14.77-33-33s14.77-33 33-33 33 14.77 33 33-14.77 33-33 33Z"
    />
  </svg>
)
export default PriceTag
