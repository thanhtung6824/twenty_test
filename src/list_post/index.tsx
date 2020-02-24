import React, {useEffect, useState, useCallback} from 'react';
import classNames from "classnames";
import moment from "moment";
import {useToast, useModal} from "../hooks";
import {useHistory} from "react-router";

import ConfirmModal from "./ConfirmModal";

export interface IPost {
    "title": string;
    "content": string;
    "id": string;
    "createdAt": Date
    "updatedAt": Date
}

const ListPost: React.FC = () => {
    const [posts, setPost] = useState<IPost[]>([]);
    const [postId, setPostId] = useState('');
    const [showToast] = useToast();
    const [isOpen, toggle] = useModal();
    const history = useHistory();
    const fetchPost = async () => {
        const response = await fetch('http://localhost:8626/api/posts/list', {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
        });
        const responseJson = await response.json();
        if (responseJson.resultCode === 0) {
            return showToast(responseJson.errorMessage, 'error')
        }
        setPost(responseJson.resultData)
    };


    useEffect(() => {
        fetchPost();
    }, []);

    const gotoUpdatePost = (postId: string) => {
        history.push(`/post/update/${postId}`)
    };

    const openConfirmModal = (postId: string) => {
        setPostId(postId);
        toggle(true);
    };

    const deletePost = useCallback(async () => {
        const response = await fetch('http://localhost:8626/api/posts/delete', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: postId})
        });
        const responseJson = await response.json();
        if (responseJson.resultCode === 0) {
            return showToast(responseJson.errorMessage, 'error')
        }
        toggle(false);
        fetchPost();
        return showToast('Delete post successfully!', 'success')

    }, [postId]);

    return (
        <>
            <div className="p-10 antialiased">
                <div>
                    <h3 className="text-xl font-bold hover:font-extrabold hover:text-purple-800 text-purple-700">List
                        Post</h3>
                </div>
                <div className="mt-10">
                    <div className="w-7/12 pl-4 pr-4">
                        <button
                            onClick={() => history.push('/post/create')}
                            className="float-right bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 ">
                            Publish new post
                        </button>
                        <table className="table-auto border shadow-md w-full text-left">
                            <thead>
                            <tr>
                                <th className="px-4 py-2">Title</th>
                                <th className="px-4 py-2">Content</th>
                                <th className="px-4 py-2">Publish date</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {posts.length ? posts.map((post, index) => {
                                return (
                                    <tr className={classNames('hover:bg-gray-300', {
                                        'bg-gray-200': index % 2 !== 0
                                    })} key={post.id}>
                                        <td className="border px-4 py-2">{post.title}</td>
                                        <td className="border px-4 py-2">{post.content}</td>
                                        <td className="border px-4 py-2">{moment(post.createdAt).format('YYYY-MM-DD HH:mm')}</td>
                                        <td className="border px-4 py-2 text-center">
                                            <i onClick={() => gotoUpdatePost(post.id)}
                                               className="fas fa-edit text-purple-600 cursor-pointer mr-2"/>
                                            <i
                                                onClick={() => openConfirmModal(post.id)}
                                                className="far fa-trash-alt text-purple-600 cursor-pointer"/>
                                        </td>

                                    </tr>)
                            }) : <tr>
                                <td colSpan={4}
                                    className="border px-4 py-2 text-md italic text-gray-700 hover:bg-gray-300">
                                    No post published yet
                                </td>
                            </tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ConfirmModal isOpen={isOpen} toggle={toggle} onConfirm={deletePost}/>
            </div>
        </>
    )
};

export default ListPost;
