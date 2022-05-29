import React, { useEffect, useRef, useState } from "react";
import "firebase/compat/firestore";
import useFirebase from "../../hooks/useFirebase";
import "./Chat.css";
import { useSelector } from "react-redux";

const Chat = () => {

	return (
		<div className='Chat'>
			<section>
				<ChatRoom/>
			</section>
		</div>
	);
};

function ChatRoom({ receiverEmail }) {
	const user = useSelector((state) => state.data.user);
	const dummy = useRef();
	const { db, firebase } = useFirebase();
	const [formValue, setFormValue] = useState('');
	const [messages,setMessages] = useState([]);

	const sendMessage = async (e) => {
    e.preventDefault();

		const { email, photoURL } = user;

		await db.collection("messages").add({
			text: formValue,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			email: email,
			photoURL: photoURL,
		});
		setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		db.collection("messages")
			.orderBy("createdAt")
			.limit(25)
			.onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));
	}, [db]);

	return (
		<div className='container'>
			<main>
				{messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

				<span ref={dummy}></span>
			</main>

			<form className='msg-form' onSubmit={sendMessage}>
				<input
					required
					type='text'
					className='msg-input'
					placeholder='say something nice'
					value={formValue} onChange={(e) => setFormValue(e.target.value)}
				/>
				<button className='send-btn text-white hover:bg-bluegray-700' disabled={!formValue} type='submit'>
					Send 🕊️
				</button>
			</form>
		</div>
	);
}

function ChatMessage(props) {
	const { text, email, photoURL } = props.message;
	const user = useSelector((state) => state.data.user);

	const messageClass = email === user.email ? "sent" : "received";

	return (
		<>
			{(email === user.email) && (
				<div className={`message ${messageClass}`}>
					<img className='user-img' alt='' src={photoURL || "https://i.ibb.co/VmSVPNR/male.png"} />
					<p className='msg-p'>{text}</p>
				</div>
			)}
		</>
	);
}

export default Chat;
