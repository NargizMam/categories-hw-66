import React, {useCallback, useEffect, useState} from 'react';
import Layout from "./components/Layout/Layout";
import {Route, Routes, useLocation} from "react-router-dom";
import Home from "./containers/Home/Home";
import NewMeal from "./containers/NewMeal/NewMeal";
import EditMeal from "./containers/EditMeal/EditMeal";
import {ApiMeal, ApiMealsList, Meal} from "./types";
import axiosApi from "./axiosApi";

const App = () => {
    const [mealList, setMealList] = useState<ApiMeal[]>([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const fetchMeals =useCallback(async () => {
        try{
            setLoading(true);
            let mealsResponse =await axiosApi.get<ApiMealsList>('/meals.json');
            const meals = mealsResponse.data;
            let newMeal: ApiMeal[] = [];
            if (meals) {
                newMeal = Object.keys(meals).map(id => {
                    const meal = meals[id];
                    let foods = [];

                    return {
                        ...meal,
                        id
                    }

                });
            }
            setMealList(newMeal);
        }finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (location.pathname === '/') {
            void fetchMeals();
        }
    }, [location, fetchMeals]);


 return (
     <Layout>
        <Routes>
            <Route path="/" element={(
                <Home mealList={mealList}
                      mealsLoading={loading}
                />
            )}/>
            <Route path="/new-meal" element={(
                <NewMeal/>
            )}/>
            <Route path="/edit-meal/:id" element={(
                <EditMeal/>
            )}/>
        </Routes>
    </Layout>
 )};

export default App;
