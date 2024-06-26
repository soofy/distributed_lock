import React from 'react'
import { useSelector } from 'react-redux';

export const Users = () => {

  const users = useSelector((state) => state.entitiesState.allUsers);

  return (
    <div className='box'>
      {users && users.length > 0 ?
        <div>
          <div className='users'>
            <div className='header id'> id  </div><div className='header'>fullName  </div> <div className='header'>email </div>   <div className='header'>locked </div>   <div className='header'>lockedBy </div>
          </div>
          {users.map((user) => {
            return <div className='users'>
              <div className='header id'>  {user._id} </div><div className='header'> {user.fullName}</div> <div className='header'> {user.email} </div> <div className='header'>{user.locked ? 'locked' : 'unlocked'} </div><div className='lockedBy'>{user.lockedBy} </div></div>
          })}

        </div >

        : ''}
    </div >
  )
}
