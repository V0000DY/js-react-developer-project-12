/* eslint-disable functional/no-expression-statements */

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import routes from '../routes.js';

const getAuthHeader = () => {
  // @ts-ignore
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) return { Authoriztion: `Bearer ${userId.token}` };

  return {};
};

const PublicPage = () => {
  const [content, setContent] = useState('');
  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
      setContent(data);
    };

    fetchContent();
  }, []);

  return (
    <>
      <h1>Public page</h1>
      <p>{content}</p>
    </>
  );
};

export default PublicPage;
