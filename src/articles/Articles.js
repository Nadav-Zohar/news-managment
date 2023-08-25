/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import "./Articles.css";
import moment from 'moment';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GeneralContext } from "../App";
import { Link, useNavigate } from "react-router-dom";


export default function Articles(){
    const [articles, setArticles]= useState([]);
    const {setIsLoader}= useContext(GeneralContext);
    const navigate= useNavigate();

    useEffect(() => {
        setIsLoader(true);
        fetch(`https://api.shipap.co.il/articles`, {
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => {
            setArticles(data);
            setIsLoader(false);
        });
    }, []);

    function removeArticle(id) {
        if (!window.confirm("are you sure?")) {
            return;
        }

        setIsLoader(true);
        fetch(`https://api.shipap.co.il/articles/${id}`, {
            credentials: 'include',
            method: 'DELETE',
        })
        .then(() => {
            setArticles(articles.filter(x => x.id !== id));
            setIsLoader(false);
        });
    }
    
    return(
        <>
        <button className='addBtn' onClick={() => navigate('/article/new')}>Add Article +</button>
        <button className='addBtn' onClick={() => navigate('/recyclebean')}>Recycle Bean</button>

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
                        articles.map((a, i) => 
                            <tr key={a.id} onDoubleClick={() => navigate(`/article/${a.id}`)}>
                                <td>{i + 1}</td>
                                <td>{a.headline}</td>
                                <td>{moment(a.addedTime).format('DD/MM/YY')}</td>
                                <td>{moment(a.publishDate).format('DD/MM')}</td>
                                <td>{a.views}</td>
                                <td>
                                <Link to={`/article/${a.id}`}>
                                    <button className="green"><AiFillEdit /></button>
                                </Link>
                                    <button className="red" onClick={() => removeArticle(a.id)}><AiFillDelete /></button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}