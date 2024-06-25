import React, { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux';
import {  useParams } from 'react-router-dom';
import UserViewForm from './userViewForm'
import { getUser } from '../../../redux/slices/user/user';

const UserView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useLayoutEffect(() => {
    if (id) {

      dispatch(getUser(id));

    }
  },[dispatch, id]);

  return (
    <UserViewForm />
  )
}

export default UserView