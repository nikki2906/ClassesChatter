import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/card'
import { supabase } from '../client';

const HomeFeed = () => {    

    const [searchInput, setSearchInput] = useState('');
    const [posts, setPosts] = useState([]); 

    useEffect(() => {   
        const fetchPost = async () => {
            const {data} = await supabase
            .from("Posts")
            .select()
            .order("created_at", { ascending: true})
            setPosts(data);
        }
        fetchPost();
    }, [])

    // filter posts by newest
    const filterPostByNewest = async () => {    
        const {data} = await supabase
        .from('Posts')
        .select()
        .order('created_at', { ascending: false});
        // set the posts state
        setPosts(data);
    }

    // filter posts by most upvotes
    const filterPostByMostUpvotes = async () => {
        const {data} = await supabase
        .from('Posts')
        .select()
        .order('upvotes', { ascending: false});
        // set the posts state
        setPosts(data);
    }

    const updateUpvotes = async (postData) => {
        // copy the posts so we can update it
        let newArr = [...posts];
        // find the index of the post so we can udate the upvotes for a specific post
        let index = posts.findIndex(checkPosts);
        if(index != -1) {
            // update postData's upvotes
            newArr[index]["upvotes"] = postData.upvotes + 1;
            event.preventDefault();

            // send updated data to the database
            await supabase
            .from('Posts')
            .update({upvotes: newArr[index]["upvotes"]})
            .eq('id', postData.id);
            // update the posts to the array
            setPosts(newArr);
        }
        // helper function to check posts
        function checkPosts(post) {
            return post.id === postData.id;
        }
    }

    return (
        <div className="homefeed_container">
            <div className='filters'>
                <div className='search_bar_container'>
                    <input
                        type='text'
                        placeholder='Search by title ...'
                        className='search_bar'
                        onChange={event => setSearchInput(event.target.value)}
                    />
                </div>
                <div className="btn_filter_container">
                    <span>Order by:</span>
                    <button onClick={filterPostByNewest} className='filter_btn'>Newest 🌱</button>
                    <button onClick={filterPostByMostUpvotes} className='filter_btn'>Most Upvotes ✨</button>
                </div>
            </div>
            {posts != null && posts.length > 0 ? (
                // filter out the data based on the search input
                posts.filter((val)=> {
                    if(searchInput == "") {
                      return val;
                    }
                    else if((val.post_title)
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())) {
                      return val;
                    }
                    // map the resulting entries from the search
                  }).map((post, index) =>
                <div key={index}>
                    <Card postData={post} updateUpvotes={updateUpvotes} />
                </div>
                )) : 
                <div>
                    <p className='post_title'>No Posts Created Yet!</p>
                    <Link to='/createPost'>
                    <button>Create one Here 🥚</button>
                    </Link> 
                </div>
            }
        </div>
    )
}

export default HomeFeed;