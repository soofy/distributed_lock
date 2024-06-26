import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { skipUser, getUsersLockedByUser } from '../../redux/entitiesState';

export const UsersLockedByUser = () => {
  const dispatch = useDispatch();

  let users = useSelector((state) => state.entitiesState.lockedByUserUsers);

  const skip = async (e) => {

    await dispatch(skipUser({ userId: e.target.value, locked: false, lockedBy: '' }));
    users = [];
    await dispatch(getUsersLockedByUser());
  }
  return (
    <div className='box'>
      {users && users.length > 0 ?
        <div>
          <div className='users'>
            <div className='header id'>id</div><div className='header'>status </div>   <div className='header'>locked </div> <div className='header locked'>locked By</div>
          </div>
          {users.map((user) => {
            return <div className='users'>
              <div className='header id'>  {user._id} </div><div className='header'> {user.status}</div><div className='header'>{user.locked ? 'locked' : 'unlocked'} </div> <div className='lockedBy'>{user.lockedBy} </div> <button className='button  is-link  is-small is-outlined' value={user._id} onClick={skip}>Skip User</button> </div>
          })}

        </div >

        : ''}
    </div >
  )
}
