import { getEstadoBadgeClass } from '../../utils/helpers';
import './EstadoBadge.css';

const EstadoBadge = ({ estado }) => {
  return (
    <span className={`badge ${getEstadoBadgeClass(estado)}`}>
      {estado}
    </span>
  );
};

export default EstadoBadge;
