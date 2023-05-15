import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from 'prop-types';


function ModalOverlay({ onClose }) {

  React.useEffect(() => {

    function closeByEscape(e) {
      if(e.key === 'Escape') {
        onClose();
      }
    }
    
    document.addEventListener('keydown', closeByEscape);

    function closeByOverlayClick(e) {
      if (e.target.classList.contains(styles.overlay)) {
        onClose();
      }
    }
    
    document.addEventListener('click', closeByOverlayClick);

    return () => {
      document.removeEventListener('keydown', closeByEscape);
      document.removeEventListener('click', closeByOverlayClick);
    };
  }, [onClose]);


  return (
    (
      <div className={styles.overlay} />
    )
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;