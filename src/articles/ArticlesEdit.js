import { Link, useNavigate, useParams } from 'react-router-dom';
import './Articles.css';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import moment from 'moment';
import { GeneralContext } from '../App';

export default function ArticlesEdit() {
    const { id } = useParams();
    const {setIsLoader}= useContext(GeneralContext);

    const navigate= useNavigate();
    const [item, setItem] = useState({
        publishDate: moment().format("YYYY-MM-DD"),
        headline: '',
        description: '',
        content: '',
        imgUrl: '',
    });

    const inputChange = ev => {
        const { name, value } = ev.target;

        setItem({
            ...item,
            [name]: value,
        });
    }

    const save = ev => {
        ev.preventDefault();

        if(id === "new"){
            setIsLoader(true);
            fetch(`https://api.shipap.co.il/articles`, {
                credentials: 'include',
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(item),
            })
            .then(res => res.json())
            .then(data => {
                navigate("/");
                setIsLoader(false);
            });
        } else {
            setIsLoader(true)
            fetch(`https://api.shipap.co.il/articles/${id}`, {
                credentials: 'include',
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(item),
                })
            .then(() => {
                navigate("/");
                setIsLoader(false);
            });
        }

    }

    useEffect(() => {
        if (id === 'new') {
            setItem({
                publishDate: moment().format("YYYY-MM-DD"),
                headline: '',
                description: '',
                content: '',
                imgUrl: '',
            });
        } else {
            setIsLoader(true);
            fetch(`https://api.shipap.co.il/articles/${id}`, {
                credentials: 'include',
            })
            .then(res => res.json())
            .then(data => setItem(data))
            .finally(() => setIsLoader(false));
        }
    }, [id]);

    return (
        <div className='ArticlesEdit'>
            <button className='returnLink'>
                <Link to="/"><AiOutlineRight />Back To Article List</Link>
            </button>

                    <h2>{item.id ? 'Edit' : 'Add'} Article</h2>

                    <form onSubmit={save}>
                    <label>
                        Article's Headline:
                        <input type="text" name="headline" value={item.headline} onChange={inputChange} />
                    </label>
                    <label>
                        Article's Img URL:
                        <input type="text" name="imgUrl" value={item.imgUrl} onChange={inputChange} />
                    </label>
                    <label>
                        Article's Publish Date:
                        <input type="date" name="publishDate" value={item.publishDate} onChange={inputChange} />
                    </label>
                    <label>
                        Article's Description:
                        <textarea type="text" name="description" value={item.description} onChange={inputChange} />
                    </label>
                    <label>
                        Article's Content:
                        <textarea type='text' name="content" value={item.content} onChange={inputChange} />
                    </label>


                    <button>{item.id ? 'Edit' : 'Add'} Article</button>
                </form>
        </div>
    )
}