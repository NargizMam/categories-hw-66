import React from 'react';
import {NavLink} from "react-router-dom";
import MealInfo from "../../components/MealInfo/MealInfo";
import {ApiMeal} from "../../types";
import Spinner from "../../UI/Spinner/Spinner/Spinner";

interface Props {
    mealList: ApiMeal[];
    mealsLoading: boolean;
    totalPrice: number;
    onDelete: (id: string) => void;
    loading: boolean;
}

const Home: React.FC<Props> = ({mealList, mealsLoading, totalPrice,onDelete, loading}) => {
    let mealsInfo = mealList.map(meal => (
        <MealInfo key={meal.id}
                  meal={meal}
                  onDelete={() => onDelete(meal.id)}
                  loading={loading}
        />
    ));

    return (
        <>
            <div className="container d-flex justify-content-between mt-3">
               <article>
                   <h4>Total Calories: <strong>{totalPrice}</strong> kcal</h4>
               </article>
                <button className="btn btn-dark btn-box-shadow e" >
                    <NavLink to="/new-meal" className=" fs-4 text-decoration-none text-white"> Add new meal</NavLink>
                </button>
            </div>

            <div className='container-sm'>
                {mealsLoading && <Spinner/>}
                {mealsInfo}
            </div>
        </>
    );
};

export default Home;