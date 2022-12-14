import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {ApiMeal} from "../../types";
import {MEAL_TYPE} from "../../mealType";
import ButtonSpinner from "../../UI/Spinner/ButtonSpinner/ButtonSpinner";

interface Props {
    onSubmit: (meal: ApiMeal) => void;
    meal?: ApiMeal;
    existingMeal?: ApiMeal;
    updating: boolean;
}
const initialState: ApiMeal = {
    food: '',
    calorie: 0,
    mealType: '',
    id:''
}
const MealForm:React.FC<Props> = ({
      onSubmit,
      updating,
      existingMeal = initialState,

}) => {
    const {id} = useParams();

    const [newMeal, setNewMeal] = useState<ApiMeal>(existingMeal);
    const onMealsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;

        const data = name === "calorie"? parseInt(value) : value;
        setNewMeal(prev => ({...prev,
            [name]: data,
        }));
    };
    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(newMeal);
    };

    let pageTitle = 'Add new post'

    if(id){
        pageTitle = 'Edit this post!'
    }
    const selectOption = MEAL_TYPE.map(type => (
        <option
            key = {Math.random()}
            value={type}
        >{type.toUpperCase()}</option>
    ));

    return (
        <div className='col-6 m-5'>
            <h4>{pageTitle}</h4>
            <form onSubmit={onFormSubmit} >
                <div className="form-group">
                    <label className='Label '>
                        Meal Type  <br/>
                        <select className='Label px-5 py-2'
                                name="mealType"
                                value={newMeal.mealType}
                                onChange={onMealsChange}
                        >
                            <option disabled value="">Выберите категорию</option>
                            {selectOption}
                        </select>
                    </label><br/>
                </div>
                <div className="form-group">
                    <label htmlFor="food">Text</label>
                    <textarea
                        id="food" name="food"
                        className="form-control"
                        value={newMeal.food}
                        onChange={onMealsChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="calorie">Food</label>
                    <input
                        id="calorie" name="calorie" type="number"
                        className="form-control"
                        value={newMeal.calorie}
                        onChange={onMealsChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2"
                        disabled={updating || newMeal.calorie === 0 || newMeal.mealType === '' || newMeal.food === ''}
                >
                    {updating && <ButtonSpinner/>}
                    {id ? 'Edit' : 'Create'}
                </button>
            </form>

        </div>
    );
};

export default MealForm;