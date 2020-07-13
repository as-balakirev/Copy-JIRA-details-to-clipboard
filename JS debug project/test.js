'use strict';

/**
 * 
 * @param {Date} dateOfBirth 
 */

function calculatePolicyDate (dateOfBirth) {
    let policyDate;
    dateOfBirth = new Date(dateOfBirth);
    let todayDate = new Date();
    let maxBackdate = addDays(todayDate, -30);
    let crossOverDate = addDays(dateOfBirth, 182);
    crossOverDate.setFullYear(todayDate.getFullYear());
    if (crossOverDate > todayDate) {
        if (todayDate.getDate() == 29 || todayDate.getDate() == 30 || todayDate.getDate() == 31) {
            todayDate.setDate(28);
        }
        policyDate = todayDate;
        console.log(policyDate);
        return policyDate;
    } else if (!(crossOverDate <= maxBackdate)) {
        console.log('Insured is not eligible for backdating.');
        return new Error('Insured is not eligible for backdating.');
    } else {
        policyDate = crossOverDate;
        console.log(policyDate);
        return crossOverDate;
    }
}


/**
 * 
 * @param {Date} date 
 * @param {number} daysToAdd 
 */
function addDays (date, daysToAdd) {
    let d = new Date (date);
    d.setDate(date.getDate() + daysToAdd);
    return d;
}

/**
 * 
 * @param {Date} dateOfBirth 
 */
function calculateLastBirthday (dateOfBirth) {
    let lastBirthday = new Date(dateOfBirth);
    let todayDate = new Date();
    if (todayDate < lastBirthday.setFullYear(todayDate.getFullYear())) {
        lastBirthday.setFullYear(todayDate.getFullYear() - 1);
        return lastBirthday;
    }
    lastBirthday.setFullYear(todayDate.getFullYear());
    return lastBirthday;
}


//calculatePolicyDate('2000-12-10');
calculateLastBirthday('2000-07-22');