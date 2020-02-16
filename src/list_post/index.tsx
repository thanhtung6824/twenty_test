import React from 'react';
import classNames from "classnames";
import FormPost from './FormPost';
import TablePost from "./TablePost";

const Post: React.FC = () => {

    return (
        <>
            <div className="p-10 antialiased">
                <div>
                    <h3 className="text-xl font-bold hover:font-extrabold hover:text-purple-800 text-purple-700">Manage
                        Post</h3>
                </div>
                <div className="mt-10">
                    <TablePost/>
                </div>
            </div>
        </>
    )
};

export default Post;
