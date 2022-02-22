import classes from "./ChartBar.module.css";

function ChartBar(props) {
    let barFillHeight ='0%';

    if (props.maxValue > 0) {
        barFillHeight = Math.round((props.value/props.maxValue)*100) + '%';
    }

  return (
    <div className={classes.chartBar}>
      <div className={classes.chartBarInner}>
        <div className={classes.chartBarFill} style={{height: barFillHeight}}></div>
      </div>
      <div className={classes.chartBarLabel}>{props.label}</div>
    </div>
  );
}

export default ChartBar;
