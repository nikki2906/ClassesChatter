import { useState } from 'react';
import { supabase } from '../client';

const createPost = () => {
    const[post, setPost] = useState({post_title: '', post_content: '', add_url: ''});

    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log("Name: ", name, " value: ", value);
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createPost = async (event) => {
        
        event.preventDefault(); 

        if(post.title != "") {
            await supabase
            .from('Posts')
            .insert({post_title: post.post_title, post_content: post.post_content, add_url: post.add_url})
            .select();

            window.location = "/";  
        } 
        else {
            alert("A title is required in order to make a post");
        }
    }

    return (
        <div className="create_card">
            <form className="create_form">
                <h3 className="form_title">Create a Post</h3>

                <div className="form_item">
                    <label for='title'>Post Title</label> <span className="form_tag">(Required)</span> <br />
                    <input className="textbox" type="text" id="title" name="post_title" value={post.post_title} onChange={handleChange} required />
                </div>

                <div className="form_item">
                    <label htmlFor="content">Content</label><br />
                    <textarea className="post_content_input" rows="5" cols="50" id="content" name="content" value={post.post_content} onChange={handleChange}/>
                </div>

                <div className="form_item">
                    <label htmlFor="add_url">Add an URL</label><br />
                    <input className="textbox" type="text" id="add_url" name="add_url" value={post.add_url} onChange={handleChange} />
                </div>

            </form>
            <button type="submit" onClick={createPost} className="create_edit_post_btn">Create</button>
            
        </div>
    );
};

export default createPost;