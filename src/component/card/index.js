import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
    const findNumber = data.url.replace(/\D/g, '');
    return (
        <Link to={{ pathname: `/${data.name}`, id: findNumber}}>
            <div className="CardProduct text-center mt-4">
                <div className="text-left">
                    <h1 className="title text-lg">Name : {data.name}</h1>
                    <h2 className="price text-sm">Birth Year : {data.birth_year}</h2>
                    <p>Gender: {data.gender}</p>
                    <p>Eye Color: {data.eye_color}</p>
                    <p>Hair Color: {data.hair_color}</p>
                </div>
            </div>
        </Link>
    )
}

export default Card