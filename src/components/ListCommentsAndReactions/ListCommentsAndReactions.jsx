import "./listCommentsAndReactions.css";
import {useState, useEffect} from 'react';
import { useFetch } from '../../hooks/useFetch';
import { UsersLike } from "../UsersLike/UsersLike";

function ListCommentsAndReactions({idPost}) {   
    const {data} = useFetch(`/reactions/${idPost}`);

    if(data) {
        console.log(data)
    }

    if(!data) {
        return (
            <div className="load">
                <h5>Carregando...</h5>
            </div>
        )
    }

    return (
        <div className="ListCommentsAndReactions">
            {data.length === 1?
            <h5> <UsersLike idAccount={data[0].idAccount} username={data[0].username} /> &nbsp; curtiu </h5>
            :data.length === 2?
            <h5> <UsersLike idAccount={data[0].idAccount} username={data[0].username} /> &nbsp; e &nbsp;<UsersLike idAccount={data[1].idAccount} username={data[1].username} /> &nbsp; curtiram</h5>
            :data.length > 2 ?
            <h5><UsersLike idAccount={data[0].idAccount} username={data[0].username} /> , &nbsp; <UsersLike idAccount={data[1].idAccount} username={data[1].username} />&nbsp;  e mais {data.length - 2} curtiram</h5>
        
            : "" }
        </div>
    )
}

export {ListCommentsAndReactions}