// import Vue from 'vue'
// import Vuex from 'vuex'
import { createStore } from "vuex";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import db from "../firebase/firebaseInit";
import { getFirestore, doc, collection, getDoc } from "firebase/firestore";
// import { doc } from "firebase/firestore";
// import { get } from "core-js/core/dict";

// Vue.use(Vuex)

export default createStore({
  state: {
    sampleBlogCards: [
      {
        blogTitle: "Blog Post 1",
        blogCoverPhoto: "stock-1",
        blogDate: "Sept 1, 2023",
      },
      {
        blogTitle: "Blog Post 2",
        blogCoverPhoto: "stock-2",
        blogDate: "Sept 1, 2023",
      },
      {
        blogTitle: "Blog Post 3",
        blogCoverPhoto: "stock-3",
        blogDate: "Sept 1, 2023",
      },
      {
        blogTitle: "Blog Post 4",
        blogCoverPhoto: "stock-4",
        blogDate: "Sept 1, 2023",
      },
    ],
    editPost: null,
    //use state to control the access to admin previleges
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null, //the uid created by firebase
    profileInitials: null,
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
      console.log(state.editPost);
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    //doc is dbResults in getCurrentUser
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
      console.log(state.profileId);
    },
    //generate initials
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
  },
  actions: {
    //get current user, only change user state by commit
    async getCurrentUser({ commit }) {
      const firestore = getFirestore(db);
      const collectionRef = collection(firestore, "users");
      const dataBase = await doc(collectionRef, getAuth().currentUser.uid);
      const dbResults = await getDoc(dataBase); //get the current user

      commit("setProfileInfo", dbResults); //update result by mutation
      commit("setProfileInitials");
      console.log(dbResults); //only use when testing if the user is logged in
      // const token = await user.getIdTokenResult();
      // const admin = await token.claims.admin;
      // commit("setProfileAdmin", admin);
    },
  },
  modules: {},
});
