const ConfirmModal = ({ isModalOpen, closeModal, eventFunc }) => {
  const handleOnClick = (e) => {
    if (e.target.innerText === 'Yes') {
      eventFunc();
    }
    closeModal();
  };
  // if isModalOpen is false -> don't show modal
  if (!isModalOpen) return null;

  return (
    <div className="confirm-wrap">
      <div className="confirm-window">
        <span>Do you really want to delete?</span>
        <div className="btn-wrap">
          <p className="basicBtn" onClick={handleOnClick}>
            Yes
          </p>
          <p className="specialBtn" onClick={handleOnClick}>
            No
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
