import "./Home.scss";
import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to='/addproduct'>Nhap San Pham</Link>
    </div>
  );
}

export default Home;
