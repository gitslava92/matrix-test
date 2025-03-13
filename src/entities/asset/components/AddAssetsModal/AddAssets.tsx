import { Button, TextField } from "../../../../shared/components";
import { Modal, Table } from "../../../../shared/ui";
import { useAddAssetsModal } from "./useAddAssets";
import { columns } from "./columns";
import { Asset } from "../../api";
import styles from "./AddAssets.module.scss";
import { motion } from "framer-motion";

export const AddAssetsModal = () => {
  const {
    data,
    isModalOpen,
    toggleModal,
    search,
    onFilterChange,
    assetQuantity,
    onQuantityChange,
    onSelectAsset,
    isSelected,
    onCancel,
    onSubmit,
  } = useAddAssetsModal();

  return (
    <div className={styles.container}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Portfolio Overview
        <span>(Viacheslav Pustovit)</span>
      </motion.h1>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button onClick={toggleModal}>Add new</Button>
        <Modal isOpen={isModalOpen} onClose={onCancel}>
          <TextField
            label="Currency search"
            placeholder="Currency search"
            value={search}
            onChange={onFilterChange}
          />
          <Table<Asset>
            data={data}
            columns={columns}
            rowKey="symbol"
            onRowClick={onSelectAsset}
          />
          {isSelected && (
            <motion.div
              className={styles.quantity}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
            >
              <TextField
                label="Enter quantity"
                placeholder="Enter quantity"
                type="number"
                value={assetQuantity}
                onChange={onQuantityChange}
              />
              <div className={styles.btnsContainer}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Button onClick={onCancel}>Cancel</Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 150 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Button onClick={onSubmit}>Add to profile</Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </Modal>
      </motion.div>
    </div>
  );
};
