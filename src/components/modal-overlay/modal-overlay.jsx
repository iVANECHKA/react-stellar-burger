import React from "react";
import styles from "./modal-overlay.module.css";


function ModalOverlay({ onClose }) {

  React.useEffect(() => {
    
    window.addEventListener('keydown', (e) => {
      if (e.key === "Escape") {
        onClose();
    }});

    window.addEventListener('click', (e) => {
      if (e.target.classList.contains(styles.overlay)) {
        onClose();
      }
    });

    return () => {
      window.removeEventListener('keydown', (e) => {
        if (e.key === "Escape") {
          onClose();
      }});


      window.removeEventListener('click', (e) => {
        if (e.target.classList.contains(styles.overlay)) {
          onClose();
        }
      });
    };
  }, [onClose]);


  return (
    (
      <div className={styles.overlay} />
    )
  );
}


export default ModalOverlay;