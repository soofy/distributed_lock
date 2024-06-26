import React from 'react'
import { useSelector } from 'react-redux';

export const UsersHandledByUser = () => {

  const users = useSelector((state) => state.entitiesState.handledByUserUsers);

  return (
    <div className='box'>
      {users && users.length > 0 ?
        <div>
          <div className='users'>
            <div className='header id'>id</div><div className='header'>status </div> <div className='header'>Handled By</div>
          </div>
          {users.map((user) => {
            return <div className='users'>
              <div className='header id'>  {user._id} </div><div className='header'> {user.status}</div>  <div className='header'>{user.handledBy} </div>  </div>
          })}

        </div >

        : ''}
    </div >
  )
}
