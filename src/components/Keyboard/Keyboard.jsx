function Keyboard({ onKeyPress }) {
    const keys = ['Q', 'W', 'E', 'R', 'T', 'Y'];
  
    return (
      <div className="keyboard">
        {keys.map(key => (
          <button key={key} onClick={() => onKeyPress(key)}>
            {key}
          </button>
        ))}
      </div>
    );
  }