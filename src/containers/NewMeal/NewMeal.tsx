import React, {useState} from 'react';
import MealForm from "../../components/MealForm/MealForm";
import {ApiMeal} from "../../types";
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";

const NewMeal = () => {
    const [creatLoading, setCreateLoading] = useState(false);
    const navigate = useNavigate();

    const createMeal = async (meal: ApiMeal) => {
        try{
            setCreateLoading(true);
            await axiosApi.post('/meals.json', meal);

        }finally {
            navigate('/');
        }
    };

    return (
        <div>
            <MealForm onSubmit={createMeal}
                      updating={creatLoading}
            />
        </div>
    );
};

export default NewMeal;