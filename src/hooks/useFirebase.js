import { useEffect } from "react";
import initializeAuthentication from "../services/Firebase/firebase.init";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
	signOut,
	updateProfile,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	getIdToken,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin, setIsLoading, setToken, setUser } from "../redux/slices/firebaseSlice";
import firebase from "firebase/compat/app";
import firebaseConfig from "../services/Firebase/firebase.config";

initializeAuthentication();
const firebaseApp = firebase.initializeApp(firebaseConfig);

const useFirebase = () => {
	const db = firebaseApp.firestore();
	const auth = getAuth();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.data.user);

	const signInUsingGoogle = () => {
		dispatch(setIsLoading(true));
		const googleProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleProvider);
	};

	const logOut = () => {
		dispatch(setIsLoading(true));
		signOut(auth)
			.then(() => {
				dispatch(setUser({}));
			})
			.finally(() => dispatch(setIsLoading(false)));
	};

	const processLogin = (email, password) => {
		dispatch(setIsLoading(true));
		return signInWithEmailAndPassword(auth, email, password);
	};

	const createNewUser = (email, password) => {
		dispatch(setIsLoading(true));
		return createUserWithEmailAndPassword(auth, email, password);
	};

	// const saveUser = (email, displayName, photoURL, admin = "", method) => {
	// 	const user = { email, displayName, photoURL, role: admin };
	// 	fetch("https://mk-manager.onrender.com/users", {
	// 		method: method,
	// 		headers: {
	// 			"content-type": "application/json",
	// 		},
	// 		body: JSON.stringify(user),
	// 	}).then();
	// };

	// useEffect(() => {
	// 	fetch(`https://mk-manager.onrender.com/users/${user?.email}`)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 			dispatch(setAdmin(data.admin));
	// 		});
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [user?.email]);

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const res = await fetch(`https://mk-manager.onrender.com/existing/byemail`,{
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ email: user.email })
		});
		const response = await res.json();
				dispatch(setUser(response));
				if(response.role === "admin") dispatch(setAdmin(true));
				getIdToken(user).then((idToken) => {
					dispatch(setToken(idToken));
				});
			} else {
				dispatch(setUser({}));
			}
			dispatch(setIsLoading(false));
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		auth,
		db,
		firebase,
		processLogin,
		logOut,
		signInUsingGoogle,
		createNewUser,
		// saveUser,
		updateProfile,
	};
};

export default useFirebase;
