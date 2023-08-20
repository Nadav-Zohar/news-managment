import { useEffect, useState } from "react";
import "./Articles.css";
import moment from 'moment';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";


export default function Articles(){
    const [articles, setArticles]= useState([]);

    useEffect(() => {
        fetch(`https://api.shipap.co.il/articles`, {
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => {
            setArticles(data);
            console.log(data);
        });
    }, []);

    function removeArticle(id) {
        if (!window.confirm("are you sure?")) {
            return;
        }

        fetch(`https://api.shipap.co.il/articles/:id`, {
            credentials: 'include',
            method: 'DELETE',
        })
        .then(() => {
            setArticles(articles.filter(x => x.id !== id));
        });
    }


    
    return(
        <>
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
                            <tr key={a.id}>
                                <td>{i + 1}</td>
                                <td>{a.headline}</td>
                                <td>{moment(a.addedTime).format('DD/MM/YY')}</td>
                                <td>{moment(a.publishDate).format('DD/MM')}</td>
                                <td>{a.views}</td>
                                <td>
                                    <button className="edit"><AiFillEdit /></button>
                                    <button className="remove" onClick={() => removeArticle(a.id)}><AiFillDelete /></button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}