import axios from 'axios';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { BASE_URL } from '../utils';

const store = (set: any) => ({
	userProfile: null,
	allUsers: [],
	addUser: (user: any) => set({ userProfile: user }),
	removeUser: () => set({ userProfile: null }),
	fetchAllUsers: async () => {
		const { data } = await axios.get(`${BASE_URL}/api/users`);
		set({ allUsers: data });
	},
});

const useStore = create(
	persist(store, {
		name: 'auth',
	})
);

export default useStore;
