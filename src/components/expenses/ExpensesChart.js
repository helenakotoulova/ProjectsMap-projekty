import Chart from "../Chart/Chart";

function ExpensesChart(props) {
  const chartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  for (const expense of props.expenses) {
    // nesmi tady byt in props.expenses, ale of props.expenses, protoze props.expenses je array a ne object.
    /*
    for/in - loops through the properties of an object
    for/of - loops through the values of an iterable object
    */
    const expenseMonth = expense.date.getMonth(); // (dostanu cisla) starting at 0 => January => 0
    chartDataPoints[expenseMonth].value += expense.amount;
  }
  return (
    <div>
      <Chart dataPoints={chartDataPoints} />
    </div>
  );
}

export default ExpensesChart;


/*
V ExpensesChart.js si vytvorim objekt chartDataPoints.
Do nej budu nahravat data z props.expenses, ktere si nadefinuju v Expenses.js jako <ExpensesChart expenses={expenses}/>
Ty chartDataPoints budu prehravat for loopem -> vytvorim const expenseMonth (v prvnim loopu bude 0, pak 1,...az 12) a pak
prehraju chartDatapoints.value na pozici expenseMonth hodnotou expense.amount

Ty chartDataPoints jako dataPoints pak pouziju v Chart.js:
udelam tam props.dataPoints.map((dataPoint)=>(<ChartBar .../>))
tam musim zadefinovat key (bude to dataPoint.label),
value={dataPoint.value}
maxValue={totalMaximum}
label={dataPoint.label}
=>
Ty my props.dataPoints (chartDataPoints) zahrnuji label i value. Jeste musim vytvorit maximum.
const valueArray = props.dataPoints.map((dataPoint)=>(dataPoint.value)); 
// takhle ziskam novy array, ktery bude obsahovat jen hodnoty 'value' z arraye objektů props.dataPoints
// a pak:
const totalMaximum = Math.max(...valueArray)

A v chartBaru udelam nekolik divu.
Dulezite je nadefinovat barFillHeight, ktera bude initially '0%'
A udelame podminku, ze pokud props.maxValue je vetsi nez 0, tak
barFillHeight prepiseme hodnotou Math.round((props.value)/(props.maxValue)*100)+'%'
To pak pouzijeme v dynamickem stylovani v divu chartBarFill => style={{height:barFillHeight}}

*/