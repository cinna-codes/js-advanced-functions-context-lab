let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let hoursWorkedOnDate = function(soughtDate){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(dateSought){
    let rawWage = hoursWorkedOnDate.call(this, dateSought)
        * this.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(){
    let eligibleDates = this.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}

// /* Your Code Here */

// /*
//  We're giving you this function. Take a look at it, you might see some usage
//  that's new and different. That's because we're avoiding a well-known, but
//  sneaky bug that we'll cover in the next few lessons!

//  As a result, the lessons for this function will pass *and* it will be available
//  for you to use if you need it!
//  */

// let allWagesFor = function () {
//     let eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     let payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

// function createEmployeeRecord(employeeArr) {
//     let newEmployeeObject = {
//         firstName: employeeArr[0],
//         familyName: employeeArr[1],
//         title: employeeArr[2],
//         payPerHour: employeeArr[3],
//         timeInEvents: [],
//         timeOutEvents: []
//     }
//     return newEmployeeObject
// }

// function createEmployeeRecords(arrOfArr) {
//     let employeesArr = arrOfArr.map(createEmployeeRecord)
//     return employeesArr
// }

// function createTimeInEvent(dateStamp) {
//     this.timeInEvents.push({
//         type: "TimeIn",
//         hour: parseInt(dateStamp.split(" ")[1]),
//         date: dateStamp.split(" ")[0]
//     })
//     return this
// }

// function createTimeOutEvent(dateStamp) {
//     this.timeOutEvents.push({
//         type: "TimeOut",
//         hour: parseInt(dateStamp.split(" ")[1]),
//         date: dateStamp.split(" ")[0]
//     })
//     return this
// }

// function hoursWorkedOnDate(date) {
//     let timeOutHour 
//     let timeInHour 
//     for (const timeOut of this.timeOutEvents) { if (timeOut.date === date) { timeOutHour = timeOut.hour }}
//     for (const timeIn of this.timeInEvents) { if (timeIn.date === date) { timeInHour = timeIn.hour }}
//     let hoursWorked = (timeOutHour - timeInHour) / 100
//     return hoursWorked
// }

// function wagesEarnedOnDate(dateSought) {
//     let rawWage = hoursWorkedOnDate.call(this, dateSought)
//         * this.payPerHour    
//     return parseFloat(rawWage.toString())
// }

// function findEmployeeByFirstName(srcArray, firstName) {
//     return srcArray.find(emp => firstName === emp.firstName)
// }

// // function calculatePayroll(srcArray) {
// //     return srcArray.reduce(function(total, emp) {
// //         return total + allWagesFor.call(emp)
// //     }, 0)
// // }

// let calculatePayroll = function(arrayOfEmployeeRecords){
//     return arrayOfEmployeeRecords.reduce(function(memo, rec){
//         return memo + allWagesFor.call(rec)
//     }, 0)
// }