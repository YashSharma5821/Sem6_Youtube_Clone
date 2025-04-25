import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import LoadingComp from "../components/LoadingComp";
import { SPACING } from "../constants";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem; /* Increased spacing for better layout */
  padding: 1rem; /* Added padding */
  background-color: #BBCEA8; /* Applied provided color */
  border-radius: 8px; /* Added rounded corners */
  @media only screen and (max-width: 700px) {
    display: block;
    min-height: 100vh;
    margin-top: 1.5rem; /* Adjusted spacing */
    padding: 0.5rem; /* Adjusted padding */
  }
`;

const Text = styled.div`
  display: flex;
  margin-top: 2rem; /* Adjusted margin */
  gap: 1rem; /* Unified gap size */
  flex: 1;
  color: #748067; /* Applied provided color */
  background-color: #E3D87E; /* Applied provided background color */
  padding: 1rem; /* Added padding for spacing */
  border: 2px solid #0B0A07; /* Added border */
  border-radius: 8px; /* Rounded corners for cleaner look */
`;




const Search = () => {
  const [error, setError] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useLocation().search;
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/videos/search${query}`);
        setVideos(res.data);
        if (res.data.length === 0) {
          setError("No videos found");
        } else {
          setError("");
        }
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    fetchVideos();
  }, [query]);

  return <Container>
    {loading ? <LoadingComp /> : error ? (<Text>{error}</Text>) : videos.map((video) => <Card key={video._id} video={video} />)}
  </Container>;
};

export default Search;