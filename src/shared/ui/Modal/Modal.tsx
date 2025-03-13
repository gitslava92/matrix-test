import { ModalProps } from "./types";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";
import { motion } from "framer-motion"; // Импортируем framer-motion

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <motion.div
      className={styles.overlay}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        {children}
      </motion.div>
    </motion.div>,
    document.body
  );
};
