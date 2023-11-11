import DatePicker from 'react-datepicker';

// const dateFormat = (date) => date.toLocaleDateString('us-US');

const SelectDate = ({ label, onChange, selected, filterDate, className }) => {
  const selectedDate = selected ? new Date(selected) : null;

  return (
    <>
      <label className="form-label">{label}</label>
      <DatePicker
        className={`select-date ${className}`}
        selected={selectedDate}
        dateFormat="dd/MM/yyyy"
        onChange={onChange}
        closeOnScroll={true}
        todayButton="Today"
        filterDate={filterDate}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
    </>
  );
};

export default SelectDate;
