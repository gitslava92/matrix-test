import { Table } from "../../../../shared/ui";
import { SelectedAsset } from "../../model/types";
import { columns } from "./columns";
import { useSelectedAssetsTable } from "./useSelectedAssetsTable";
import { motion } from "framer-motion";
import styles from "./SelectedAssetsTable.module.scss";

export const SelectedAssetsTable = () => {
  const { data, onRowClick } = useSelectedAssetsTable();

  return (
    <div style={{ marginTop: 64 }}>
      {!!data.length && (
        <motion.div
          className={styles.container}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Table<SelectedAsset>
            data={data}
            columns={columns}
            rowKey="id"
            onRowClick={onRowClick}
          />
        </motion.div>
      )}
    </div>
  );
};
