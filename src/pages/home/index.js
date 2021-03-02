import React, { useState, useEffect } from "react"
import { Waypoint } from 'react-waypoint';
import { get } from '@service';
import { queryStringify, removeEmptyAttributes, findIdPage } from "@helpers";
import Card from "@component/card"

function Home() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [totalData, setTotalData] = useState(0)

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await get(`/people/${queryStringify(removeEmptyAttributes({
                page: totalPage,
                // search: query
            }))}`)
            setData(res.data.results)
            const nextPage = res.data.next
            // const amountPage = nextPage.replace(/\D/g, '');
            setTotalData(res.data.results.length)
            setTotalPage(parseInt(findIdPage(nextPage)))
            console.log(totalPage, 'total page')
        } catch {
            setLoading(false)
        }
        setLoading(false)
    }
    
    const handleLoadMore = async () => {
        setCurrentPage(currentPage + 1)
        try {
            const resLoadMore = await get(`/people/${queryStringify(removeEmptyAttributes({
                page: totalPage,
                // search: query
            }))}`)
            const nextPage = resLoadMore.data.next
            // const amountPageLoadMore = nextPage.replace(/\D/g, '');
            setData([...data, ...resLoadMore.data.results])
            setTotalData(totalData + resLoadMore.data.results.length)
            setTotalPage(parseInt(findIdPage(nextPage)))
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="App">
            {!loading && (
                <>
                    <div className="grid grid-cols-2">
                        {data ? data.map((item, key) => {
                            return (
                                <div key={key}>
                                <Card data={item} />
                                </div>
                            )
                        }) : (
                            <div>not found</div>
                        )}
                    </div>
                    {currentPage !== totalPage && (totalData > 7 && <Waypoint
                        onEnter={() => handleLoadMore()}
                    />)}
                </>
            )}
        </div>
    );
}

export default Home;