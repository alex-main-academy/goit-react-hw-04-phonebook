import PropTypes from 'prop-types';
import css from './SearchContact.module.css';

const SearchContact = ({ filter, handleFilter }) => {
  return (
    <>
      <label className={css.find__contacts}>
        Find contacts by name:{' '}
        <input
          type="text"
          name="search"
          value={filter}
          onChange={handleFilter}
        />
      </label>
    </>
  );
};

SearchContact.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default SearchContact;
