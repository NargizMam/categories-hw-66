import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {ApiMeal} from "../../types";

interface Props {
    meal: ApiMeal;
    onDelete: React.MouseEventHandler;
}

const MealInfo: React.FC<Props> = ({meal, onDelete}) => {
    const navigate = useNavigate();



    return (
        <div className="card col-7 m-2">
            <div className="card-header">
                {meal.mealType}
            </div>
            <div className="card-body ">
                <article className="d-flex justify-content-between">
                    <h5 className="card-title">{meal.food}</h5>
                    <p className="card-text">{meal.calorie}</p>
                </article>

                <NavLink to={`/edit-meal/${meal.id}`} className="btn btn-warning">EDIT</NavLink>
                <button className="btn btn-warning mx-2" onClick={onDelete}>DELETE</button>
            </div>
        </div>
    );
};

export default MealInfo;