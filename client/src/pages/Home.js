import React from "react";
import axios from "axios";

const getRepos = async () => {
  const { data } = await axios.get("/api/selfRepos");
  console.log(data);
};

const Home = () => {
  getRepos();

  return <div>"Welcome to Home"</div>;
};

export default Home;
