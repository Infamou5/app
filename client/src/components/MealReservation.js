import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Meal from "./Meal";
import Spinner from "./Spinner";
import MealDataService from "../services/Meal.service";
import ReservationDataService from "../services/Reservation.service.js";

const MealDetails = () => {
  let params = useParams();

  const INITIAL_MEAL_STATE = {
    title: "",
    description: "",
    location: "",
    price: "",
    max_seats: "",
    available_seats: "",
    date: "",
  };

  const INITIAL_RESERVATION_STATE = {
    mealId: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    seats_to_reserve: "",
  };

  const [meal, setMeal] = useState(INITIAL_MEAL_STATE);
  const [reservation, setReservation] = useState(INITIAL_RESERVATION_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submited, setSubmited] = useState(false);



  useEffect(() => {
    retrieveMealById();
  }, []);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setReservation({ ...reservation, [name]: value });
    event.preventDefault();
  };

  const imagesArray = [
    "https://www.englishclub.com/images/vocabulary/food/italian/italian-food-1024.jpg",
    "https://www.thavornpalmbeach.com/news/wp-content/uploads/2015/12/Tips-to-Kick-the-Junk-Food-Habit-.jpg",
    "https://post.healthline.com/wp-content/uploads/2020/08/raw-vegan-meal-thumb_0-1.jpg",
    "https://www.maangchi.com/wp-content/uploads/2020/12/la-galbi-scaled.jpg",
    "https://www.pachd.com/free-images/food-images/japanese-food-05.jpg",
  ];

  const randomImage = (imagesArray) => {
    return imagesArray[Math.floor(Math.random() * imagesArray.length) + 0];
  };

  const retrieveMealById = () => {
    setLoading(true);
    MealDataService.get(params.mealId)
      .then((response) => {
        setMeal(response.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmited(true);

    const data = {
      mealId: meal.id,
      first_name: reservation.first_name,
      last_name: reservation.last_name,
      email: reservation.email,
      phone: reservation.phone,
      seats_to_reserve: parseInt(reservation.seats_to_reserve),
    };

    ReservationDataService.create(data)
      .then((response) => response.json())
      .then((response) => {
        if (!response.ok) {
          setError(response.meta.errors);
        }
        setReservation(INITIAL_RESERVATION_STATE);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <li className='meal-detail'>
        <h2>{meal.title}</h2>

        <p>{meal.description}</p>
        <h4>Location: {meal.location}</h4>
        <h4>Available seats: {meal.available_seats}</h4>
        <h2>Price: {meal.price},00 Kr.</h2>
        <p>Rating: ⭐⭐⭐⭐⭐</p>
      </li>

      <form className='add-reservation-form'>
        <fieldset className='fieldset'>
          <legend>Reserve seats</legend>
          <label htmlFor='first_name'>First name:</label>
          <input
            type='text'
            id='first_name'
            name='first_name'
            required
            value={reservation.first_name}
            onChange={handleInputChange}
          />
          <label htmlFor='last_name'>Last name:</label>
          <input
            type='text'
            id='last_name'
            name='last_name'
            required
            value={reservation.last_name}
            onChange={handleInputChange}
          />
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            id='email'
            name='email'
            required
            value={reservation.email}
            onChange={handleInputChange}
          />
          <label htmlFor='phone'>Phone:</label>
          <input
            type='text'
            id='phone'
            name='phone'
            required
            value={reservation.phone}
            onChange={handleInputChange}
          />
          <label htmlFor='seats_to_reserve'>Number of seats to reserve:</label>
          <input
            type='number'
            id='seats_to_reserve'
            name='seats_to_reserve'
            required
            min="1"
            max={meal.available_seats}
            value={reservation.seats_to_reserve}
            onChange={handleInputChange}
          />
          <button type='submit' onClick={handleFormSubmit}>
            Reserve Meal
          </button>
        </fieldset>
      </form>
      <div>
          {submited && !error && <p>Your reservation was successfull.</p>}
          {error && (
            <ul style={{ color: "red" }}>
              {error.map((err, index) => (
                <li key={index}>{err.msg}</li>
              ))}
            </ul>
          )}
        </div>
    </div>
  );
};

export default MealDetails;
