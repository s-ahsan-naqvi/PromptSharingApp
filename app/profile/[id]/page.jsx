"use client";

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';

import Profile from '@components/Profile'

const ProfileId = ({ params }) => {

  const [userData, setUserData] = useState([]);
  const searchParams = useSearchParams();
  const userName = searchParams.get('name')
  
  useEffect(() => {
    const fetchPosts = async () => {
        const res = await fetch(`/api/users/${params?.id}/posts`);
        const data = await res.json();

        setUserData(data)
    } 

    fetchPosts();
  }, [params?.id])

  
  return (
    <Profile
        name={userName + "'s"}
        data={userData}

    />
  )
}

export default ProfileId