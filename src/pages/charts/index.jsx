import React from "react";
import Donut from "../../components/charts/Realtime";
import ChartPie from "../../components/charts/ChartPie";
import BarChart from "../../components/charts/BarChart";

const ChartView = () => {
  return (
    <div>
      <div>ProductView</div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // Permite que los elementos fluyan a una nueva fila cuando no hay suficiente espacio horizontal
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Donut style={{ flex: "1", minWidth: "300px" }} /> {/* Flex 1 indica que ocupará todo el espacio disponible */}
        <ChartPie style={{ flex: "1", minWidth: "300px" }} /> {/* Mínimo 300px de ancho */}
        <BarChart style={{ flex: "1", minWidth: "300px" }} />
      </div>
    </div>
  );
};

export default ChartView;
