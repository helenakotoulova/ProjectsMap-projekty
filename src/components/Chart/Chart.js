import ChartBar from "./ChartBar";
import classes from "./Chart.module.css";

function Chart(props) {
    const valueArray = props.dataPoints.map((dataPoint) => dataPoint.value);
    
    /*console.log(valueArray) => 
        Array(12):
        0: 0
        1: 0
        2: 0
        3: 0
        4: 0
        5: 0
        6: 0
        7: 94.12
        8: 0
        9: 0
        10: 0
        11: 0
        length: 12
        */

    const totalMaximum = Math.max(...valueArray);

  return (
    <div className={classes.chart}>
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
}

export default Chart;
