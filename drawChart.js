let savedCars = [];

let buyPrice;
// let actualCar;

const addCar = (e) => {
    e.preventDefault();
    buyPrice = document.getElementById("price").value;

    let yearOfPurchase = document.getElementById("yearPurchased").value;

    const buyAge = document.getElementById("age").value || 0;
    const milesPerYear = document.getElementById("mpy").value || (150000 / 8);
    // console.log('buyAge', buyAge)
    let type = "Average";
    const typeRadios = document.getElementsByName("type")
    for (let i = 0; i < typeRadios.length; i++) {
        if (typeRadios[i].checked) {
            type = typeRadios[i].value
            break;
        }
    }
    // console.log(type)
    const color = document.getElementById("carColorOptions").value || "";
    const isCustomizedQuestion = document.getElementById("customized")
    const isCustomized = isCustomizedQuestion.checked ? isCustomizedQuestion.value : false;
    // console.log('custom', isCustomized)
    
    let actualCar = populateValues(buyPrice, buyAge, milesPerYear, type, color, isCustomized)
    
    if (buyPrice) drawingChart(actualCar, yearOfPurchase)

}



function drawingChart (car=null, yearOfPurchase=null, dummy=false) {
    
    const currentDate = yearOfPurchase ? new Date(yearOfPurchase,0,1) : new Date();
    const currentYear = currentDate.getFullYear();
    let dataPoints = [];
    if (car) {
        // create data values
        for (let i = 0; i < car.length; i++) {
            dataPoints.push(
                {
                    x: new Date(currentYear + i, 0, 0),
                    y: car[i]
                }
            )
        }

        // customize tool tips
        dataPoints[0].toolTipContent = "Value at time of purchase: ${y}"
        dataPoints[1].toolTipContent = "After 1 year: ${y}"
        for (let i = 2; i < dataPoints.length; i++) {
            dataPoints[i].toolTipContent = `${i} years: ` + "${y}"
        }
    }
    const chart = new CanvasJS.Chart("chartContainer",
        {

            title: {
                text: "Value of car over years",
                fontFamily: "helvetica",
                fontSize: 16,
                margin: 20
            },
            axisX: {
                valueFormatString: "YYYY",
                animationEnabled: true,
                animationDuration: 2000,
                interval: 1,
                intervalType: "year",
                labelFontFamily: "helvetica",
                labelFontSize: 12,
                margin: 100,
                
            },
            axisY: {
                labelFontFamily: "helvetica",
                valueFormatString: "$###,###,###",
                interval: car ? Math.max(...car, 20000) / 4 : (20000 / 4),
                gridColor: "#d3d6e3",
                labelFontSize: 12,
                maximum: car? Math.max(...car, 20000) : 20000,
                minimum: 0
            },
            toolTip: {
                fontFamily: 'courier',
                fontSize: 13,
                backgroundColor: "black",
                fontColor: "yellow",
                // backgroundColor: "#f2f5f7",
                borderThickness: 0
                // borderColor: "#ffffff",
            },
            animationEnabled: true,
            animationDuration: 2000,
            data: [
                {
                    type: "line",
                    dataPoints: dataPoints,
                    lineColor: "#0522e3",
                    lineThickness: dummy ? 0 : 2,
                    markerSize: dummy ? 0 : 5,
                }
            ]
        });
    chart.render();
}



// window.onload = function () {
document.addEventListener("DOMContentLoaded", function () {
    let defaultCar = populateValues(0, 0, 150000 / 8, 'Luxury Sedan', '', false)    
    drawingChart(defaultCar, 2020, true)
    document.getElementById('btn').addEventListener('click', addCar) 

})
