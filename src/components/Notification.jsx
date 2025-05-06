export function Notification({ message, show }) {
    return (
      <div className={`notification ${show ? 'show' : ''}`}>
        {message}
      </div>
    );
  }