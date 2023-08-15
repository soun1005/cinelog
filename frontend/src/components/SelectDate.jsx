import DatePicker from 'react-datepicker';

const dateFormat = (date) => date.toLocaleDateString('us-US');

const SelectDate = ({
  label,
  onChange,
  selected,
  name,
  filterDate,
  className,
}) => {
  const handleOnChange = (date) => {
    onChange(name, dateFormat(date));
  };

  const selectedDate = selected ? new Date(selected) : null;

  return (
    <>
      <label className="form-label">{label}</label>
      <DatePicker
        className={`selectDate ${className}`}
        selected={selectedDate}
        dateFormat="dd/MM/yyyy"
        onChange={handleOnChange}
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
