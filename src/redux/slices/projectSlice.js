import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const adminProject = createAsyncThunk("project/adminProject", async (data) => {
	try {
		const res = await fetch("https://mk-manager.onrender.com/admin/byemail", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({email:data.email, status: data.status }),
		});
		const response = await res.json();
		return { response, status: data.status };
	} catch (err) {}
});
export const allProjects = createAsyncThunk("project/allProjects", async () => {
	try {
		const res = await fetch(`https://mk-manager.onrender.com/projects`);
		const response = await res.json();
		return response;
	} catch (err) {}
});

const initialState = {
	allProject: [],
	openProject: [],
	activeProject: [],
	resolvedProject: [],
};

export const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {
		addToAllProjects: (state, { payload }) => {
			state.allProject.push(payload);
		},
		addToOpenProject: (state, { payload }) => {
			state.openProject.push(payload);
		},
		addToActiveProject: (state, { payload }) => {
			state.activeProject.push(payload);
		},
		addToResolvedProject: (state, { payload }) => {
			state.resolvedProject.push(payload);
		},
		removeFromOpenProject: (state, { payload }) => {
			state.openProject = state.openProject.filter((project) => project.id === payload);
		},
		removeFromActiveProject: (state, { payload }) => {
			state.activeProject = state.activeProject.filter((project) => project.id === payload);
		},
		removeFromResolvedProject: (state, { payload }) => {
			state.resolvedProject = state.resolvedProject.filter((project) => project.id === payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(adminProject.fulfilled, (state, action) => {
			if (action.payload.status === "open") {
				state.openProject = action.payload.response;
			} else if (action.payload.status === "inprogress") {
				state.activeProject = action.payload.response;
			} else {
				state.resolvedProject = action.payload.response;
			}
		});
		// builder.addCase(userProject.fulfilled, (state, action) => {
		// 	if (action.payload.status === "open") {
		// 		state.openProject = action.payload.response;
		// 	} else if (action.payload.status === "inprogress") {
		// 		state.activeProject = action.payload.response;
		// 	} else {
		// 		state.resolvedProject = action.payload.response;
		// 	}
		// });
		builder.addCase(allProjects.fulfilled, (state, action) => {
			state.allProject = action.payload;
		});
	},
});


export const {
	addToAllProjects,
	addToOpenProject,
	addToActiveProject,
	addToResolvedProject,
	removeFromOpenProject,
	removeFromActiveProject,
	removeFromResolvedProject,
} = projectSlice.actions;

export default projectSlice.reducer;


export const userProject = async (data) => {
	try {
		const res = await fetch(`https://mk-manager.onrender.com/user/byemail`,{
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({email:data.email, status: data.status }),
		});
		const response = await res.json();
		console.log(response);
		return response;
	} catch (err) {}
};
