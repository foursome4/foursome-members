import { useContext, useEffect, useState, memo } from "react"
import {IoFlameOutline } from 'react-icons/io5'
import { AuthContext } from "../../contexts/Auth";
import { useFetch } from "../../hooks/useFetch";
import api from "../../services/api"
import "./listReactions.css"


function ListReactionsComponent({idPost}) {
    const {likePost, deleteLike} = useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);

    const {data} = useFetch(`/reactions/${idPost}`);

    let myLike = []

    if(data) {
       myLike = data?.filter(likes => (likes.idAccount === userData.id));
    }


    function handleLikePost(e) {
        e.preventDefault()
        console.log("Curti")
       likePost({idAccount: userData.id, username: userData.username, idPost});
    }

    function handleDeleteLike(e) {
        e.preventDefault();
        deleteLike(data[0]?.id)  
     }



    return (
        <div className="reactionsList">
              <button className={myLike.length === 0 ? "" :"selected"} onClick={myLike.length === 0 ? handleLikePost : handleDeleteLike}>
                  <IoFlameOutline />
                  </button>
        </div>
    )
}


export const ListReactions = memo(ListReactionsComponent)