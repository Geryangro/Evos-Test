import React, { useState, useEffect } from "react";
import { get } from '@service';
import PropTypes from "prop-types";
import "./style.css"


function Detail({ location }) {
    const id = location ? location.id : ""
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    const fetchDataDetail = async () => {
        setLoading(true)
        try {
            const res = await get(`/people/${id}`)
            setData(res.data)
        } catch(error) {
            console.log(error)
            setLoading(false)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchDataDetail()
    }, [])


    return (
        <div className="section-detail">
            {!loading && (
                <div className="text-left">
                    <div className="background-name p-6">
                        <h1 className="title text-lg">Biodata Person</h1>
                        <h1 className="text-lg">Name : {data.name}</h1>
                    </div>
                    <div className="p-6">
                        <p>Birth Year : {data.birth_year}</p>
                        <p>Gender : {data.gender}</p>
                        <p>Eye Color : {data.eye_color}</p>
                        <p>Hair Color : {data.hair_color}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

Detail.propTypes = {
    id: PropTypes.string,
};

export default Detail;
