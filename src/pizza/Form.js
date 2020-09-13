import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const Form = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        terms: ''
    });
    const [buttonDisabled, setButtonDisabled] = useState();
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        terms: ''
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
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
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
                    email: '',
                    password: '',
                    terms: true
                })
            })
            .catch((err) => {
                console.log(err.response)
            });
    }
    const dataSchema = yup.object().shape({
        name: yup.string().required("Required"),
        email: yup.string().email("Must Be Valid Email").required("Required"),
        password: yup.string().required("Required"),
        terms: yup.boolean().oneOf([true], "")
    });

    useEffect(() => {
        dataSchema.isValid(formData).then((isValid) => {
            setButtonDisabled(!isValid);
        });
    }, [formData]);

    return (
        <form onSubmit={submitFunction}>
            <label htmlFor="name"> Name: <input id="name" type="text" name="name" value={formData.name} onChange={change} /> {errors.name.length > 0 ? <p>{errors.name}</p> : null}</label>
            <label htmlFor="email"> Email: <input id="email" type="email" name="email" value={formData.email} onChange={change} /> {errors.email.length > 0 ? <p>{errors.email}</p> : null} </label>
            <label htmlFor="password"> Password: <input id="password" type="password" name="password" value={formData.password} onChange={change} /> {errors.password.length > 0 ? <p>{errors.password}</p> : null}</label>
            <label htmlFor="terms"> Terms of Service: <input id="terms" type="checkbox" name="terms" checked={formData.terms} onChange={change} /> {errors.terms.length > 0 ? <p>{errors.terms}</p> : null} </label>
            <button disabled={buttonDisabled} type="submit">Submit</button>
            <pre>{JSON.stringify(post, null, 2)}</pre>
        </form>
    );
}

export default Form;