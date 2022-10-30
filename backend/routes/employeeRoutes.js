const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const auth = require('../auth');

// CREATE AN EMPLOYEE ROUTE - ADMIN ACCESS (ALL USERS ARE ADMIN BY DEFAULT)
router.post("/", auth.verify, (req, res) => {

	const isAdminData = auth.decode(req.headers.authorization).isAdmin;
	console.log(isAdminData)
	employeeController.createEmployee(req.body, isAdminData).then(resultFromController => res.send(resultFromController))
});

// RETRIEVE ALL ACTIVE EMPLOYEES
router.get("/", (req, res) => {
	employeeController.getActiveEmployees().then(resultFromController => res.send(resultFromController))
});

// RETRIEVE ALL INACTIVE EMPLOYEES
router.get("/inactive", (req, res) => {
	employeeController.getInactiveEmployees().then(resultFromController => res.send(resultFromController))
});

// RETRIEVE ALL EMPLOYEES ROUTE- ADMIN ACCESS (ALL USERS ARE ADMIN BY DEFAULT)
router.get("/all", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization)


	employeeController.getAllEmployees(userData).then(resultFromController => res.send(resultFromController))
});

// UPDATE EMPLOYEE ROUTE - ADMIN ACCESS (ALL USERS ARE ADMIN BY DEFAULT)
router.put("/:employeeId", auth.verify, (req, res) => {

	const data = auth.decode(req.headers.authorization)
	employeeController.updateEmployee(req.params, req.body, data).then(resultFromController => res.send(resultFromController))
});

// ARCHIVE/DELETE EMPLOYEE ROUTE
router.put("/:employeeId/archive", auth.verify, (req, res) => {

	const data = {
		employeeId: req.params.employeeId,
		payload: auth.decode(req.headers.authorization).isAdmin
	}
	console.log(data)

	employeeController.archiveEmployee(data).then(resultFromController => res.send(resultFromController))
});

// UNARCHIVE/UNDO-DELETE EMPLOYEE - ADMIN ACCESS
router.put('/activate/:employeeId', auth.verify, (req, res) => {

	const data = {
		employeeId : req.params.employeeId,
		isAdmin : auth.decode(req.headers.authorization).isAdmin
	}

	employeeController.activateEmployee(data).then(resultFromController => res.send(resultFromController))
});

module.exports = router;