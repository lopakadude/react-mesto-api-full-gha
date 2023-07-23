import { CurrentUserContext } from '../contexts/CurrentUserContext'; 
import React from 'react'; 
import { useContext } from 'react'; 

function Card(props) { 
	const currentUser = useContext(CurrentUserContext); 
	const cardInfo = props.card; 
	const likes = cardInfo.likes;
	const isOwn = cardInfo.owner === currentUser._id; 
	const isLiked = likes.some(i => i === currentUser._id); 
	const cardLikeButtonClassName = ( 
		`elements__like ${isLiked && 'elements__like_active'}` 
	); 
	console.log(cardInfo.owner);

	function handleClick() { 
		props.onCardClick(props.card); 
	} 

	function handleLikeClick() { 
		props.onCardLike(props.card) 
	} 

	function handleDeleteClick() { 
		props.onCardDelete(props.card) 
	} 

	return ( 
		<article className="elements__element"> 
			<img className="elements__image" 
				src={props.src} 
				alt={props.title} 
				onClick={handleClick} /> 
			{isOwn && <button className="elements__delete" onClick={handleDeleteClick} type="button" />} 
			<div className="elements__row"> 
				<h2 className="elements__name">{props.title}</h2> 
				<div className="elements__like-and-count"> 
					<button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button> 
					<p className="elements__count-of-likes">{likes.length}</p> 
				</div> 
			</div> 
		</article> 
	); 
} 

export default Card; 
 