import React, { useState, useEffect } from "react"
import { Waypoint } from 'react-waypoint';
import { get } from '@service';
import { queryStringify, removeEmptyAttributes, findIdPage } from "@helpers";
import Card from "@component/card"
import magnifier from '../../magnifier.svg';

function Home() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [totalData, setTotalData] = useState(0)
    const [query, setQuery] = useState('')

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await get(`/people/${queryStringify(removeEmptyAttributes({
                page: totalPage,
                search: query
            }))}`)
            setData(res.data.results)
            const nextPage = res.data.next
            setTotalData(res.data.results.length)
            setTotalPage(parseInt(findIdPage(nextPage)))
        } catch(error) {
            setLoading(false)
            console.log(error)
        }
        setLoading(false)
    }
    
    const handleLoadMore = async () => {
        setCurrentPage(currentPage + 1)
        try {
            const resLoadMore = await get(`/people/${queryStringify(removeEmptyAttributes({
                page: totalPage,
                search: query
            }))}`)
            const nextPage = resLoadMore.data.next
            setData([...data, ...resLoadMore.data.results])
            setTotalData(totalData + resLoadMore.data.results.length)
            setTotalPage(parseInt(findIdPage(nextPage)))
        } catch(error) {
            console.log(error)
        }
    }

    const searchPeople = async (query) => {
        setQuery(query)
        try {
            const res = await get(`/people/${queryStringify(removeEmptyAttributes({
                page: 0,
                search: query
            }))}`)
            setData(res.data.results)
            setTotalData(totalData + res.data.results.length)
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
                    <div className="flex justify-between w-full items-center relative mt-8 mb-12">
                        <img src={magnifier} alt="icon-magnifier" className="icon" />
                        <input type="text" className="w-full btn-search-cstm" onChange={e => searchPeople(e.target.value)} />
                    </div>
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