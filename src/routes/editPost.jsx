import { useEffect, useState } from "react";
import { supabase } from "../client";
import { useParams } from 'react-router-dom';

const editPost = () => {
    const {id} = useParams();
    const [post, setPost] = useState({post_title: '', post_content: '', add_url: ''});

    useEffect(() => {
        const getPost = async () => {
            const {data, error} = await supabase
            .from("Posts")
            .select()
            .eq('id', id);
            console.log(data[0]);
            setPost({post_title: data[0].post_title, post_content: data[0].post_content, add_url: data[0].add_url});
        }
        getPost();
    }, [])

    const handleChange = (event) => {
        const {name, value} = event.target;
        console.group("Name: : ", name, "value: ", value);
        setPost( (prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault();

        if(post.post_title != '') {
            event.preventDefault();
            await supabase
            .from('Posts')
            .update({ post_title: post.post_title, post_content: post.post_content,  add_url: post.add_url})
            .eq('id', id);
            window.location = "/postDetails/"+id;
        }
        else{
            alert('Please enter a title');
        }
    }

    return (
        <div className="create_card">
            <form className="create_form">
                <h3 className="form_title">Edit Post</h3>

                <div className="form_item">
                    <label for="title">Title</label> <span className="form_tag">(Required)</span>
                    <input className="textbox" type="text" name="post_title" value={post.post_title} onChange={handleChange}  required />
                </div>

                <div className="form_item">
                    <label for="content">Content</label><br />
                    <textarea className="post_content_input" rows="5" cols="50" id="content" name="post_content" value={post.post_content} onChange={handleChange}/>
                </div>

                <div className="form_item">
                    <label for="add_url">Add an URL</label><br />
                    <input className="textbox" type="text" id="add_url" name="add_url" value={post.add_url} onChange={handleChange} />
                </div>
            </form>
            <button type="submit" onClick={updatePost} className="create_edit_post_btn">Save Edits</button>
        </div>
    );
};

export default editPost;