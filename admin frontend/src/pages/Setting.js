import axios from 'axios';
import React, { useState } from 'react';
import './setting.css';

function Setting() {
  const [oldpassword, setoldpassword] = useState('');
  const [newpassword, setnewpassword] = useState('');
  const [cnewpassword, setcnewpassword] = useState('');
  const [oldpassworderror, setoldpassworderror] = useState('');
  const [newpassworderror, setnewpassworderror] = useState('');
  const [cnewpassworderror, setcnewpassworderror] = useState('');
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setoldpassworderror('');
    setnewpassworderror('');
    setcnewpassworderror('');
    if (oldpassword && newpassword && cnewpassword) {
      const response = await axios.post(
        'http://localhost:4000/changepassword',
        { oldpassword, newpassword, cnewpassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log(response);
      if (response) {
        // setoldpassworderror(response.data.msg);
        console.log('dfkjfkdkfd');
      }
      // else if (response.status === 200) {
      //   setnewpassworderror(response.data.newpassword.msg);
      //   setcnewpassworderror(response.data.cnewpassword.msg);
      // }
      // else if (response.status !== 200 || response.status !== 201) {
      //   console.log('Password update successfully');
      // } else {
      //   console.log('failed to change password');
      // }
    } else if (!oldpassword) setoldpassworderror('Please enter a current password');
    else if (!newpassword) setnewpassworderror('Please enter a new password');
    else if (!cnewpassword) setcnewpassworderror('Please enter a confirm new password');
    else {
      setoldpassworderror('');
      setnewpassworderror('');
      setcnewpassworderror('');
    }
  };

  return (
    <div className="maindiv">
      <h3>Update Password</h3>
      <form onSubmit={handleChangePassword}>
        <input
          type="text"
          placeholder="Enter Current Password"
          value={oldpassword}
          onChange={(e) => setoldpassword(e.target.value)}
          style={{ borderBottomStyle: 'double', paddingLeft: '8px' }}
        />
        {oldpassworderror && <p style={{ fontSize: '16px', color: 'red' }}>{oldpassworderror}</p>}
        <input
          type="text"
          placeholder="Enter New Password"
          value={newpassword}
          onChange={(e) => setnewpassword(e.target.value)}
          style={{ borderBottomStyle: 'double', paddingLeft: '8px' }}
        />
        {newpassworderror && <p style={{ fontSize: '16px', color: 'red' }}>{newpassworderror}</p>}

        <input
          type="text"
          placeholder="Confirm New Password"
          value={cnewpassword}
          onChange={(e) => setcnewpassword(e.target.value)}
          style={{ borderBottomStyle: 'double', paddingLeft: '8px' }}
        />
        {cnewpassworderror && <p style={{ fontSize: '16px', color: 'red' }}>{cnewpassworderror}</p>}

        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Setting;
