// types and (dep relative to average dep)
let carTypes = {
    'Off-road SUV': -0.0528,
    'Pickup Truck': -0.0350,
    'Mid-size Car': -0.0226,
    'Luxury Sedan':  0.0198,
    'Electric or Hybrid': 0.0194,
    'Average': 0
}

let carTypeColorInteract = {
    'Off-road SUV': 1,
    'Pickup Truck': 1,
    'Coupe': 0.5,
    'Luxury Sedan': 0.35,
    'Electric or Hybrid': 0.35,
    'Average': 0
}

let carColors = {
    'Yellow': -0.0617,
    'Orange': -0.0260,
    'Green': -0.0230,
    'White': -0.0053,
    'Red': -0.0047,
    'Blue': 0.0033,
    'Brown': 0.0037,
    'Grey': 0.0040,
    'Black': 0.0053,
    'Silver': 0.0087,
    'Beige': 0.0343,
    'Purple': 0.0357,
    'Gold': 0.0403,
    '': 0
}

// baseline depreciation
function getDepRate(actualAge) {
    if (actualAge === 1) return 0.30;
    if (actualAge === 2 || actualAge === 3) return 0.18;
    if (actualAge >= 4) return 0.15;
    if (actualAge >= 10) return 0.1;
}

function getAvgDepRate(year, buyAge, type, color, milesPerYear=150000/8) {
    // record of yearly dep rates. index 0 corresponds to year 1
    const depRates = [];

    for (let i = 1; i <= year; i++) {
        const basicDepRate = getDepRate(i + buyAge);
        depRates.push(basicDepRate)
    }

    // console.log('depRates', depRates)
    
    const sum = depRates.reduce(function(a, b) {
        return a+b;
    })

    const basicAvgDepRate = sum / depRates.length;

    const carTypePremium = carTypes[type] || 0;
    const colorPremium = carColors[color] || 0;
    const typeColorInteractionVariable = carTypeColorInteract[type] || 1;

    const expectedMilesPerYear = 150000 / 8;
    const mileageDiscount = (expectedMilesPerYear - milesPerYear) / expectedMilesPerYear
    // console.log('discount', mileageDiscount)
    const res = basicAvgDepRate*(1 - mileageDiscount) + carTypePremium + typeColorInteractionVariable * colorPremium 
    // console.log(basicAvgDepRate, res)
    return res
}



// function getExpectedMileage(numYears) {
//     return numYears * (150000/8)
// }

// console.log(getAvgDepRate(1), getAvgDepRate(2), getAvgDepRate(3), getAvgDepRate(4), getAvgDepRate(5), getAvgDepRate(8))

function populateValues(buyPrice, buyAge=0, milesPerYear, type, color, isCustomized=false) {
  
    
    // values start off with car's purchase price
    values = [Math.round(buyPrice)]

    // get the values for the following 8 years
    for (let year = 1; year <= 8; year++) {
        const avgDepRate = getAvgDepRate(year, buyAge, type, color, milesPerYear)
        const sign = (avgDepRate > 1 && (year % 2) === 0) ? -1 : 1
        const customDiscount = isCustomized ? 0.1 : 0
        const currentYearValue = buyPrice * ((1 - avgDepRate)**year) * sign * (1 - customDiscount)
        values.push(Math.round(currentYearValue))
    }

    return values;
}

// console.log('test-0', populateValues(20000, 0, 150000/8, 'Off-road SUV', ''))
// console.log('test-1', populateValues(20000, 1, 150000/8, 'Off-road SUV', ''))
// console.log('test-2', populateValues(20000, 2, 150000/8, 'Off-road SUV', ''))
// console.log('test-2', populateValues(20000, 3, 150000/8, 'Off-road SUV', ''))


// export default populateValues;

// exports.populateValues = populateValues;