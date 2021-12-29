const router = require("express").Router();
const { validate_meal } = require("../../../validators/meals/meals.validator");
const { get_meal_by_id } = require("../../../controllers/meals/get_meal_by_id");
const { create_new_meal } = require("../../../controllers/meals/create_new_meal");
const { get_all_meals_filtered } = require("../../../controllers/meals/get_all_meals_filtered");
const { delete_meal_by_id } = require("../../../controllers/meals/delete_meal_by_id");
const { get_all_reviews_by_meal_id } = require("../../../controllers/meals/get_all_reviews_by_meal_id");

router.get("/:id/reviews", validate_meal("get_all_reviews_by_meal_id"), get_all_reviews_by_meal_id )

router.get("/", validate_meal("get_all_meals_filtered"), get_all_meals_filtered); // COMPLETED

router.get("/:id", validate_meal("get_meal_by_id"), get_meal_by_id); // COMPLETED

router.delete("/:id", validate_meal("delete_meal_by_id"), delete_meal_by_id); // COMPLETED

router.post("/", validate_meal("create_new_meal"), create_new_meal); // COMPLETED

module.exports = router;
