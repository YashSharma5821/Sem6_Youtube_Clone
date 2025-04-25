import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Card from '../components/Card';
import axios from 'axios';
import LoadingComp from '../components/LoadingComp';
import { useDispatch, useSelector } from 'react-redux';
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 1rem; /* Added margin for spacing */
  gap: 1rem; /* Uniform spacing between items */
  @media only screen and (max-width: 700px) {
    justify-content: center;
  }
  background-color: #BBCEA8;
  color: #0B0A07;
`;

const Wrapper = styled.div`
  padding: 1rem 0.5rem; /* Increased padding */
  font-size: 1rem; /* Slightly larger font size */
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow-x: scroll;
  scrollbar-width: none;
  background-color: #F0EC57;
  color: #748067;
  &::-webkit-scrollbar {
    width: 0px;
  }
  @media only screen and (max-width: 700px) {
    margin: 1rem 0.5rem; /* Adjusted margin */
  }
`;

const Details = styled.div`
  display: flex;
  margin-top: 2rem; /* Adjusted top margin */
  gap: 1rem; /* Unified gap size */
  flex: 1;
  min-height: 60vh; /* Reduced min-height slightly */
  padding: 1rem; /* Added padding for spacing */
  background-color: #E3D87E;
  color: #0B0A07;
  border: 2px solid #748067; /* Added a border */
  border-radius: 8px; /* Added rounded corners */
`;



const Home = ({ type }) => {
    const { allVideos } = useSelector(state => state.videos);
    const [tags, setTags] = useState([]);
    const [err, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get(`/videos/${type}`);
                dispatch(fetchAllSuccess(res.data));
                setLoading(false);
            } catch (err) {
                setError(err);
                console.log(err);
            }
        }
        const fetchTags = async () => {
            try {
                const res = await axios.get(`/videos/tags/all`);
                setTags(res.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                console.log(err);
            }
        }
        fetchVideos();
        fetchTags();
    }, [type, dispatch]);

    return (
        <>
            <Wrapper>
                <Tags tags={tags} />
            </Wrapper>
            <Container>

                {err ? (<Details>koi video nhi hai refresh karo</Details>) : allVideos ? allVideos?.map((video) => <Card key={video._id} video={video} />) : loading ? (<LoadingComp />) : (
                    <Details>koi video nhi hai</Details>
                )}
            </Container>
        </>
    )
}

export default Home