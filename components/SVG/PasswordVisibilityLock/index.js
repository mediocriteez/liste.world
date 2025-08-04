import css from './index.module.css'
const PasswordVisibilityLock = ({visible, ...props}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" {...props} className={css.root} data-visible={visible} shapeRendering="geometricPrecision">
    <path data-role="lock-hoop"
      d="M357 170.5V339h-61V170.5c0-25.36-20.64-47-46-47s-46 21.64-46 47v53l-61 27v-80c0-59.09 47.91-106 107-106s107 46.91 107 106Z"
      style={{
        fill: 'var(--highlight-shade-col)',
      }}
    />
    <circle
      cx={250}
      cy={342}
      r={144}
      style={{
        fill: 'var(--highlight-col)',
      }}
    />
    <circle
      cx={250}
      cy={342}
      r={85}
      style={{
        fill: 'var(--highlight-shade-col)',
      }}
    />
  </svg>
)
export default PasswordVisibilityLock