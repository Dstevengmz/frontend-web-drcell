import './Timeline.css';

const Timeline = ({ items, getItemClass }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="timeline">
      {items.map((item, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <div className="timeline-header">
              <span className={`badge ${getItemClass(item.estadoNuevo)}`}>
                {item.estadoNuevo}
              </span>
              <span className="timeline-date">
                {new Date(item.createdAt).toLocaleString('es-ES')}
              </span>
            </div>
            {item.observaciones && (
              <p className="timeline-obs">{item.observaciones}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
