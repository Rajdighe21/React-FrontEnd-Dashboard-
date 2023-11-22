import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'

export const Protected = (props) => {
    const navigate = useNavigate();

    let Cmp = props.Cmp

    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            navigate('/register');
        }
    }, [])

    return (
        <div>

            <Cmp />

        </div>
    )
}
