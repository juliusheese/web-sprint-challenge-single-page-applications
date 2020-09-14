import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const Form = () => {

    const [formData, setFormData] = useState({
        name: '',
        size: '',
        peperoni: 'false',
        sausage: 'false',
        avacado: 'false',
        bacon: 'false',
        specialInstructions: ''
    });
    const [buttonDisabled, setButtonDisabled] = useState();
    const [errors, setErrors] = useState({
        name: '',
        size: '',
        peperoni: '',
        sausage: '',
        avacado: '',
        bacon: '',
        specialInstructions: ''
    })
    const [post, setPost] = useState();
    const validateChange = (e) => {
        yup.reach(dataSchema, e.target.name)
            .validate(e.target.value)
            .then((valid) => {
                setErrors({
                    ...errors, [e.target.name]: ""
                })
            })
            .catch((err) => {
                setErrors({
                    ...errors, [e.target.name]: err.errors[0]
                })
            });
    }

    const change = (e) => {
        e.persist();
        const newFormData = {
            ...formData,
            [e.target.name]: e.target.value
        }

        validateChange(e);
        setFormData(newFormData);
    }
    const submitFunction = (event) => {
        event.preventDefault();
        axios.post("https://reqres.in/api/users", formData)
            .then((res) => {
                setPost([post, res.data]);
                setFormData({
                    name: '',
                    size: '',
                    peperoni: '',
                    sausage: '',
                    avacado: '',
                    bacon: '',
                    specialInstructions: true
                })
            })
            .catch((err) => {
                console.log(err.response)
            });
    }
    const dataSchema = yup.object().shape({
        name: yup.string().required("Required").min(2, 'Must be greater than 2 digits'),
        size: yup.string().required("Required"),
        peperoni: yup.string().required("Required"),
        sausage: yup.string().required("Required"),
        avacado: yup.string().required("Required"),
        bacon: yup.string().required("Required"),
        specialInstructions: yup.string().required("Required")
    });

    useEffect(() => {
        dataSchema.isValid(formData).then((isValid) => {
            setButtonDisabled(!isValid);
        });
    }, [formData]);

    return (
        <form onSubmit={submitFunction}>
            <label htmlFor="name"> Name: <input id="name" type="text" name="name" value={formData.name} onChange={change} /> {errors.name.length > 0 ? <p>{errors.name}</p> : null}</label>
            <select>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="XL">XL</option>
            </select>
            <label htmlFor="peperoni"> peperoni: <input id="peperoni" type="checkbox" name="peperoni" value={formData.peperoni} onChange={change} /> {errors.peperoni.length > 0 ? <p>{errors.peperoni}</p> : null}</label>
            <label htmlFor="sausage"> sausage: <input id="sausage" type="checkbox" name="sausage" value={formData.sausage} onChange={change} /> {errors.sausage.length > 0 ? <p>{errors.sausage}</p> : null}</label>
            <label htmlFor="avacado"> avacado: <input id="avacado" type="checkbox" name="avacado" value={formData.avacado} onChange={change} /> {errors.avacado.length > 0 ? <p>{errors.avacado}</p> : null}</label>
            <label htmlFor="bacon"> bacon: <input id="bacon" type="checkbox" name="bacon" value={formData.bacon} onChange={change} /> {errors.bacon.length > 0 ? <p>{errors.bacon}</p> : null}</label>

            <label htmlFor="specialInstructions"> Instructions of Service: <input id="specialInstructions" type="text" name="specialInstructions" checked={formData.specialInstructions} onChange={change} /> {errors.specialInstructions.length > 0 ? <p>{errors.specialInstructions}</p> : null} </label>
            <button type="submit" >Add to Order</button>
            <pre>{JSON.stringify(post, null, 2)}</pre>
        </form>
    );
}

export default Form;