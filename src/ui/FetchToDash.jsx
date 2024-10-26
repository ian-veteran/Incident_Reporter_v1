import PropTypes from "prop-types";
import Card from "./Card";

function FetchToDash({ locations }) {
  return (
    <div className="grid grid-cols-3 gap-8 mb-8">
      {locations.map((location, id) => (
        <Card key={id} title={location.title} count={location.count} />
      ))}
    </div>
  );
}

FetchToDash.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default FetchToDash;
