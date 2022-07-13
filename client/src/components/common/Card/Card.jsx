
function Card({className, children, ...props}) {
  const classes = `card ${className ? className : ""}`
  return (
    <div className={classes} {...props}>
        {children}
    </div>
  )
}

export default Card