import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleUser, skipUser } from '../../redux/entitiesState';

export const EditUser = (props) => {
  const dispatch = useDispatch();
  const availableUser = useSelector((state) => state.entitiesState.availableUser);

  const editUser = async () => {

    dispatch(handleUser({ userId: availableUser._id, status: 'closed' }));
    props.resetView()
  }


  const skip = async () => {

    dispatch(skipUser({ userId: availableUser._id, locked: false, lockedBy: '' }));
    props.resetView()
  }

  return (
    <div className='editTicket box'>
      {availableUser._id === undefined ? <div>No Users Available for handling</div> :
        <div>
          <div className='content'>
            <div> Id:  {availableUser._id}</div>
            <div> Name: {availableUser.fullName}</div>
            <div> Email: {availableUser.email}</div>

            <div className='actions'><button onClick={editUser} >Handle User</button> <button onClick={skip}>Skip User</button></div>
          </div>
        </div>}

    </div>
  )
}
