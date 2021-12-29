const router = require("express").Router();
const { validate_reservation } = require("../../../validators/reservations/reservations.validator");
const { create_new_reservation } = require("../../../controllers/reservations/create_new_reservation");
const { get_reservation_by_id } = require("../../../controllers/reservations/get_reservation_by_id");
const { get_all_reservations_filtered } = require("../../../controllers/reservations/get_all_reservations_filtered");
const { delete_reservation_by_id } = require("../../../controllers/reservations/delete_reservation_by_id");

router.get("/:id", validate_reservation("get_reservation_by_id"), get_reservation_by_id); // COMPLETED
router.get("/", validate_reservation("get_all_reservations_filtered"), get_all_reservations_filtered); // COMPLETED
router.post("/", validate_reservation("create_new_reservation"), create_new_reservation); // COMPLETED
router.delete("/:id", validate_reservation("delete_reservation_by_id"), delete_reservation_by_id); // COMPLETED

module.exports = router;
