/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import "./Articles.css";
import { GeneralContext } from "../App";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import moment from "moment";
import { FaRecycle } from "react-icons/fa6";

export default function Recyclebean(){
    const [recycleBean, setRecycleBean]= useState([]);
    const {setIsLoader,snackbar}= useContext(GeneralContext);
    
    function restoreArticle(id){
        fetch(`https://api.shipap.co.il/articles/restore/${id}`, {
            credentials: 'include',
            method: 'PUT',
            })
        .then(() => {
            snackbar("Article Restored");
            setRecycleBean(recycleBean.filter(x => x.id !== id));
        });
    }

    useEffect(() => {
        setIsLoader(true);
        fetch(`https://api.shipap.co.il/articles/recycle-bin`, {
            credentials: 'include',
            })
        .then(res => res.json())
        .then(data => {
            setRecycleBean(data);
        })
        .finally(() => setIsLoader(false));
    }, [])
    
    return(
        <>
        <button className='returnLink'>
                <Link to="/"><AiOutlineRight />Back To Article List</Link>
        </button>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Headline</th>
                    <th>Added Time</th>
                    <th>Publish Date</th>
                    <th>Views</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    recycleBean.map((a, i) => 
                        <tr key={a.id}>
                            <td>{i + 1}</td>
                            <td>{a.headline}</td>
                            <td>{moment(a.addedTime).format('DD/MM/YY')}</td>
                            <td>{moment(a.publishDate).format('DD/MM')}</td>
                            <td>{a.views}</td>
                            <td>
                                <button onClick={() => restoreArticle(a.id)}><FaRecycle /></button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        </>
    )
}