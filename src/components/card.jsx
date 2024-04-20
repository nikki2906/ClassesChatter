import moment from 'moment';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useActionData } from 'react-router-dom';

const Card = ({postData, updateUpvotes}) => {
    const increaseUpvotes = () => {
        updateUpvotes(postData);
    }

    const timeSincePost = moment.utc(postData.createdAt).local().startOf('seconds').fromNow();

    return (
        <div className='post'>
            <div className='upvote_column'>
                <button onClick={increaseUpvotes} className='upvote_button'>
                    <img src='src/asset/100_points.png' className='upvote_img' />
                </button>
                <h5 className='upvote_num'>{postData.upvotes}</h5>
            </div>
            <Link to={'/postDetails/'+postData.id}>
                <div className='post_data'>
                    <h4>Created {timeSincePost}</h4>
                    <p className='post_title'>{postData.title}</p>
                </div>
            </Link>
        </div>
    )
}

export default Card;