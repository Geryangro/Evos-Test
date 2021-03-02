import React, { useState, useEffect } from "react"
import { get } from '@service';
import { queryStringify, removeEmptyAttributes } from "@helpers";

function Home() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await get(`/people/`)
            setData(res.data.results)
            // const nextPage = res.data.next
            // const amountPage = nextPage.replace(/\D/g, '');
            // setTotalData(res.data.results.length)
            // setTotalPage(parseInt(amountPage))
        } catch {
            setLoading(false)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="App">
            {!loading && (
                <>
                    {data ? data.map((item, key) => {
                        return (
                            <div key={key}>
                               <h1>{item.name}</h1>
                            </div>
                        )
                    }) : (
                        <div>not found</div>
                    )}
                </>
            )}
        </div>
    );
}

export default Home;