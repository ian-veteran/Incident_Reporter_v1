import PropTypes from "prop-types";

const Card = ({ title, count }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-orange-600">Total Incidents Reported: {count}</p>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default Card;
