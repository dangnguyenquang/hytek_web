import "./Home.scss";
import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import Header from "../../components/GlobalStyle/Header/Header";

function Home() {
  return (
    <div>
      <Header/>
    </div>
  );
}

export default Home;
