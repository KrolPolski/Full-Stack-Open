const Notification = ({ message, type }) => {
    const notificationStyle = {
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        fontStyle: 'bold'
    }

    const errorStyle = {
      ...notificationStyle,
      color: 'red',
      borderColor: 'red'
    }

    const successStyle = {
      ...notificationStyle,
      color: 'green',
      borderColor: 'green'
    }
    if (message === null) {
      return null
    }
  
    return (
      <div style={type === 'error' ? errorStyle : successStyle}>
        {message}
      </div>
    )
  }

  export default Notification;