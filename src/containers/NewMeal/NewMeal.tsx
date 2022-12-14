import React, {useState} from 'react';
import MealForm from "../../components/MealForm/MealForm";
import {ApiMeal, Meal} from "../../types";
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";

const NewMeal = () => {
    const [creatLoading, setCreateLoading] = useState(false);
    const navigate = useNavigate();

    const createMeal = async (meal: ApiMeal) => {
        try{
            setCreateLoading(true);
            await axiosApi.post('/meals.json', meal);
            navigate('/');
        }finally {
            setCreateLoading(false);
        }
    };

    return (
        <div>
            New meal
            <MealForm onSubmit={createMeal}
                      loading={creatLoading}
            />
        </div>
    );
};

export default NewMeal;