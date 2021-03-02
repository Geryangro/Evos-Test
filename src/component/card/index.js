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
                    <div className="background-name p-6">
                        <h1 className="title text-lg mb-0">Name : {data?.name}</h1>
                    </div>
                    <div className="p-6">
                        <p>Birth Year : {data?.birth_year}</p>
                        <p>Gender: {data?.gender}</p>
                        <p>Eye Color: {data?.eye_color}</p>
                        <p>Hair Color: {data?.hair_color}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card