import { motion } from "framer-motion";
import Chart from "react-apexcharts";
import styles from "./AssetsAnalitics.module.scss";
import { useAssetsAnalitics } from "./useAssetsAnalitics";

export const AssetsAnalitics = () => {
  const { chartRef, chartOptions, chartSeries, chartSize, isData } =
    useAssetsAnalitics();

  return (
    <>
      {isData && (
        <motion.div
          ref={chartRef}
          className={styles.container}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            width={chartSize}
            height={300}
          />
        </motion.div>
      )}
    </>
  );
};
