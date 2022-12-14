import React, {useCallback, useEffect, useState} from 'react';
import Layout from "./components/Layout/Layout";
import {Route, Routes, useLocation} from "react-router-dom";
import Home from "./containers/Home/Home";
import NewMeal from "./containers/NewMeal/NewMeal";
import EditMeal from "./containers/EditMeal/EditMeal";
import {ApiMeal, ApiMealsList} from "./types";
import axiosApi from "./axiosApi";

const App = () => {
    const [mealList, setMealList] = useState<ApiMeal[]>([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const getTotal = (array: ApiMeal[]) => {
        const total = array.reduce((acc, meal) => {
            return acc + meal.calorie;
        }, 0);
        setTotalPrice(total);
    };

    const fetchMeals = useCallback(async () => {
        try{
            setLoading(true);
            let mealsResponse = await axiosApi.get<ApiMealsList>('/meals.json');
            const meals = mealsResponse.data;
            let newMeal: ApiMeal[] = [];
            if (meals) {
                newMeal = Object.keys(meals).map(id => {
                    const meal = meals[id];
                    return {
                        ...meal,
                        id
                    }
                });
            }
            setMealList(newMeal);
            getTotal(newMeal);
        }finally {
            setLoading(false);
        }
    }, []);

    const onDelete = async (id: string) => {
        try{
            setLoading(true);
            await axiosApi.delete<ApiMeal>('/meals/' + id + '.json');
            await fetchMeals().catch(console.error);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (location.pathname === '/') {
            fetchMeals().catch(console.error);
        }
    }, [location, fetchMeals]);


 return (
     <Layout>
        <Routes>
            <Route path="/" element={(
                <Home mealList={mealList}
                      mealsLoading={loading}
                      totalPrice={totalPrice}
                      onDelete={onDelete}
                      loading={loading}
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
