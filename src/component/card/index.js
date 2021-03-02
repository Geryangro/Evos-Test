import React from "react";
import { Link } from "react-router-dom";
import { findIdPage } from "@helpers"
import "./style.css"

const Card = ({ data }) => {
    const findNumber = findIdPage(data.url);
    return (
        <Link to={{ pathname: `/${data.name}`, id: findNumber}}>
            <div className="CardProduct text-center mt-4">
                <div className="text-left">
                    <h1 className="title text-lg">Name : {data?.name}</h1>
                    <p>Birth Year : {data?.birth_year}</p>
                    <p>Gender: {data?.gender}</p>
                    <p>Eye Color: {data?.eye_color}</p>
                    <p>Hair Color: {data?.hair_color}</p>
                </div>
            </div>
        </Link>
    )
}

export default Card