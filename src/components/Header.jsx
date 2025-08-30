import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onHome }) => {
  return (
    <div className="header">
      <div className="logo" onClick={onHome}>
        <div className="logo-icon">
          <FontAwesomeIcon icon={faStopwatch} />
        </div>
        <div>
          <h1>Samaya</h1>
          <p>Simple learning time tracker</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
