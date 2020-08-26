let hitCars = [];

let buyPrice;
let prevDataPoints = [];
let prevCarObjects = [];

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
    let carNickname;
    carNickname = document.getElementById('carNickname').value
    
    let actualCar = populateValues(buyPrice, buyAge, milesPerYear, type, color, isCustomized)
    let carObject = {
        carNickname: carNickname ? carNickname : `Car ${hitCars.length + 1}`,
        buyPrice: buyPrice,
        buyAge: buyAge, 
        milesPerYear: milesPerYear,
        type: type, 
        color: color,
        isCustomized: isCustomized
    }
    if (buyPrice) prevDataPoints = drawingChart(prevDataPoints, actualCar, carObject, yearOfPurchase, false)

    if (hitCars.length < 5) {
        hitCars.push(actualCar)
    } else {
        alert("Maximum number of cars reached. Please reset and start over.")
    }
}



function drawingChart (prevDataPoints, car=null, carObject, yearOfPurchase=null, dummy) {
    
    const currentDate = yearOfPurchase ? new Date(yearOfPurchase,0,1) : new Date();
    const currentYear = currentDate.getFullYear();
    console.log('dummy', dummy)

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
        if (!dummy) {
            dataPoints[0].toolTipContent = "Value at time of purchase: ${y}"
            dataPoints[1].toolTipContent = "After 1 year: ${y}"
            for (let i = 2; i < dataPoints.length; i++) {
                dataPoints[i].toolTipContent = `${i} years: ` + "${y}"
            }
        }
        
    }

    prevDataPoints.push(dataPoints);
    prevCarObjects.push(carObject);

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
                maximum: car ? Math.max(...car, 20000) : 20000,
                minimum: 0
            },
            toolTip: {
                fontFamily: 'courier',
                fontSize: 13,
                backgroundColor: "black",
                fontColor: "yellow",
                borderThickness: 0,
                // backgroundColor: "#f2f5f7",
                // borderColor: "#ffffff",
                enabled: dummy ? false : true,
                // enabled: false
            },
            
            legend: {
                horizontalAlign: "right",
                verticalAlign: "center",
                fontFamily: "helvetica",
                fontSize: 11,
                fontWeight: "normal"
            },   

            animationEnabled: true,
            animationDuration: 2000,
             
            data: [
                {
                    type: "line",
                    dataPoints: prevDataPoints[0],
                    color: "#0522e3",
                    lineColor: "#0522e3",
                    lineThickness: dummy ? 0 : 2,
                    markerSize: dummy ? 0 : 5,
                    legendText: prevCarObjects[0].carNickname ? (prevCarObjects[0].carNickname) : "car 1",
                    showInLegend: dummy ? false : true,
                },

                {
                    type:"line",
                    dataPoints: prevDataPoints[1],
                    color: "#f29900",
                    lineColor: "#f29900",
                    lineThickness: dummy ? 0 : 2,
                    markerSize: dummy ? 0 : 5,
                    legendText: prevCarObjects[1] ? prevCarObjects[1].carNickname : "",
                    showInLegend: dummy ? false : true,

                },

                {
                    type:"line",
                    dataPoints: prevDataPoints[2],
                    color: "#22cf04",
                    lineColor: "#22cf04",
                    lineThickness: dummy ? 0 : 2,
                    markerSize: dummy ? 0 : 5,
                    legendText: prevCarObjects[2] ? prevCarObjects[2].carNickname : "",
                    showInLegend: dummy ? false : true,

                },

                {
                    type:"line",
                    dataPoints: prevDataPoints[3],
                    color: "#e30af2",
                    lineColor: "#e30af2",
                    lineThickness: dummy ? 0 : 2,
                    markerSize: dummy ? 0 : 5,
                    legendText: prevCarObjects[3] ? prevCarObjects[3].carNickname : "",
                    showInLegend: dummy ? false : true,

                },
                {
                    type:"line",
                    dataPoints: prevDataPoints[4],
                    color: "#50c4eb",
                    lineColor: "#50c4eb",
                    lineThickness: dummy ? 0 : 2,
                    markerSize: dummy ? 0 : 5,
                    legendText: prevCarObjects[4] ? prevCarObjects[4].carNickname : "",
                    showInLegend: dummy ? false : true,

                }

            ]
        });
    chart.render();
    if (dummy) {
        prevDataPoints.pop()
        prevCarObjects.pop()
    }
    return prevDataPoints;
}



// window.onload = function () {
document.addEventListener("DOMContentLoaded", function () {
    let defaultCar = populateValues(0, 0, 150000 / 8, 'Luxury Sedan', '', true)    
    drawingChart(prevDataPoints, defaultCar, {carNickname: ''}, 2020, true)
    document.getElementById('btn').addEventListener('click', addCar) 

})
