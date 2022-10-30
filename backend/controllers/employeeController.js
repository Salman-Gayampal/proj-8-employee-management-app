const Employee = require('../models/Employee');

// CREATE EMPLOYEE - ADMIN ACCESS (ALL USERS ARE ADMIN BY DEFAULT)
module.exports.createEmployee = (reqBody, isAdminData) => {
    if (isAdminData == true) {
        let newEmployee = new Employee({
            firstName: reqBody.firstName,
            lastName: reqBody.lastName,
            position: reqBody.position,
            dateHire: reqBody.dateHire
        });
        return newEmployee.save().then((employee, error) => {
            if (error) {
                return false
            } else {
                return true // employee was created!
            }
        })
    } else {
        return false //This action requires an administrator access!
    }
};

// RETRIEVE ALL ACTIVE EMPLOYEES 
module.exports.getActiveEmployees = () => {
    return Employee.find({ isActive: true }).then(result => {
        return result
    })
};

// RETRIEVE ALL INACTIVE EMPLOYEES 
module.exports.getInactiveEmployees = () => {
    return Employee.find({ isActive: false }).then(result => {
        return result
    })
};

// RETRIEVE ALL EMPLOYEES - ADMIN ACCESS (ALL USERS ARE ADMIN BY DEFAULT)
module.exports.getAllEmployees = (data) => {

    if (data.isAdmin) {
        return Employee.find({}).then(result => {

            return result
        })
    } else {
        return false
    }
};

// UPDATE EMPLOYEE CONTROLLER - ADMIN ACCESS (ALL USERS ARE ADMIN BY DEFAULT)
module.exports.updateEmployee = (reqParams, reqBody, data) => {
    if (data.isAdmin === true) {
        let updatedEmployee = {
            firstName: reqBody.firstName,
            lastName: reqBody.lastName,
            position: reqBody.position,
            dateHire: reqBody.dateHire,
            dateUpdated: new Date()
        }
        return Employee.findByIdAndUpdate(reqParams.employeeId, updatedEmployee).then((employee, error) => {
            if (error) {
                return false
            } else {
                return true
            }
        })
    } else {
        return false // "This action requires Admin Access!"
    }
};

// ARCHIVE/DELETE EMPLOYEE CONTROLLER 
module.exports.archiveEmployee = (data) => {
    return Employee.findById(data.employeeId).then((result, error) => {
        if (data.payload === true) {
            result.isActive = false
            result.dateDeleted = new Date()
            return result.save().then((archivedEmployee, error) => {
                if (error) {
                    return false
                } else {
                    return true
                }
            })
        } else {
            return false
        }
    })
};

// UNARCHIVE/UNDO-DELETE EMPLOYEE CONTROLLER
module.exports.activateEmployee = (data) => {
    return Employee.findById(data.employeeId).then((result, err) => {
        if (data.isAdmin === true) {
            result.isActive = true
            result.dateUpdated = new Date()
            result.dateDeleted = null
            return result.save().then((activateEmployee, err) => {
                if (err) {
                    return false
                } else {
                    return true
                }
            })
        } else {
            return false
        }
    })
};
