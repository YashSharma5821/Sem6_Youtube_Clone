import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SIZES, SPACING } from '../constants';
import timeago from 'timeago.js';


import axios from 'axios';
import LoadingComp from './LoadingComp';

const Container = styled.div`
  display: ${(props) => (props.type === 'sm' ? 'flex' : 'block')};
  width: ${(props) => (props.type === 'sm' ? `100%` : `320px`)}; /* Adjusted width for larger design */
  margin-bottom: ${(props) =>
    props.type === 'sm' ? `${SPACING.s}px` : `${SPACING.xl}px`};
  padding: 1rem; /* Added padding for spacing */
  cursor: pointer;
  gap: ${SPACING.s}px;
  background-color: #E3D87E; /* Background color adjustment */
  border-radius: 8px; /* Rounded corners for clean design */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Added subtle shadow */
  @media only screen and (max-width: 700px) {
    display: block;
    width: 380px;
    left: 0;
    right: 0;
    margin: auto;
  }
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === 'sm' ? `120px` : `200px`)}; /* Adjusted height for better visual appeal */
  background-color: #BBCEA8; /* Updated background color */
  flex: 1;
  border-radius: 8px; /* Rounded corners for image */
  @media only screen and (max-width: 700px) {
    height: 220px; /* Adjusted responsive height */
  }
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) =>
    props.type !== 'sm' && `${SPACING.s * 2}px`}; /* Adjusted spacing */
  gap: ${SPACING.s}px;
  flex: 1;
  padding: 1rem; /* Added padding */
  background-color: #F0EC57; /* Adjusted background color */
  border-radius: 8px; /* Added rounded corners */
`;

const ChannelImage = styled.img`
  display: ${(props) => props.type === 'sm' && 'none'};
  width: 40px; /* Adjusted width for emphasis */
  height: 40px; /* Adjusted height for emphasis */
  border-radius: 50%;
  background-color: #748067; /* Updated background color */
`;

const Texts = styled.div`
  padding: ${SPACING.s}px;
  width: ${(props) => (props.type === 'sm' ? `100%` : `360px`)};
  background-color: #BBCEA8; /* Added background color for emphasis */
  border-radius: 6px; /* Rounded corners */
  @media only screen and (max-width: 700px) {
    padding: 1rem; /* Adjusted padding */
    width: 100%; /* Ensure full width */
  }
`;

const Title = styled.h1`
  font-size: 1.4rem; /* Adjusted font size for better visibility */
  font-weight: 600; /* Slightly bolder for emphasis */
  color: #0B0A07; /* Updated color */
`;

const ChannelName = styled.h2`
  font-size: 1rem; /* Adjusted font size */
  color: #748067; /* Updated softer text color */
  margin: ${SPACING.s}px 0;
`;

const Info = styled.div`
  font-size: 0.9rem; /* Slightly smaller font for secondary information */
  color: #748067; /* Soft text color for readability */
`;






const Card = ({ type, video }) => {
    var timeagoInstance = timeago();
    const [channel, setChannel] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const res = await axios.get(`/users/find/${video.userId}`);
                setChannel(res.data);
                setLoading(false);
            } catch (err) {
                setError(err);
            }
        }
        fetchChannel();
    }, [video.userId]);
    return (
        <Link to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
            {error && <p>{error}</p>}
            {loading ? (
                <LoadingComp />
            ) : (
                <Container type={type}>
                    <Image type={type} src={video.imgUrl} />
                    <Details type={type}>
                        <ChannelImage type={type} src={channel.img} />
                        <Texts type={type}>
                            <Title>{video.title}</Title>
                            <ChannelName>{channel.name}</ChannelName>
                            <Info> {video.views} views · {timeagoInstance.format(video.createdAt)} </Info>
                        </Texts>
                    </Details>
                </Container>
            )}
        </Link>
    )
}

export default Card