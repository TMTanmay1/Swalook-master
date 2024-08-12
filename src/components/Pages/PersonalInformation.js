import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/PersonalInformation.css';
import Header from './Header';
import PI from '../../assets/PI.png';
import config from '../../config';

function PersonalInformation() {
  const [P, setPI] = useState({});

  const [on, setOn] = useState('');
  const [e, setE] = useState('');
  const [gn, setGn] = useState('');
  const [pn, setPn] = useState('');
  const [p, setP] = useState('');

  const no = atob(localStorage.getItem('number'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${config.apiUrl}/api/swalook/get_current_user/${no}/`, {
          headers: {
            Authorization: `Token ${token}`
          }
        });
  
        console.log(response.data);
        setPI(response.data.current_user_data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [no]);
  

  useEffect(() => {
    if (P) {
      setOn(P.owner_name || '');
      setE(P.email || '');
      setGn(P.gst_number || '');
      setPn(P.pan_number || '');
      setP(P.pincode || '');
    }
  }, [P]);

  const handleUpdate = async () => {
    try {
      const res = await axios.post(
        `https://api.crm.swalook.in/api/swalook/edit/profile/${no}/`,
        {
          owner_name: on,
          email: e,
          gst_number: gn,
          pan_number: pn,
          pincode: p
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
          }
        }
      );
      console.log(res.data);
      alert('Profile updated successfully');
    } catch (err) {
      console.log(err);
      alert('Failed to update profile');
    }
  };

  return (
    <div className='personal_information_container'>
      <Header/>
      <div className='pi_main'>
        <div className="pi_horizontal_container">
          <div className="pi_horizontal_item">
            <img src={PI} alt="PI Image" />
          </div>
          <div className="pi_horizontal_item">
            <h2>Personal Details</h2>
            <hr />
            <div className="pi_input_container">
              <label htmlFor="saloonName">Saloon Name:</label>
              <input type="text" value={P.salon_name} id="saloonName" readOnly />
            </div>
            <div className="pi_input_container">
              <label htmlFor="ownerName">Owner Name:</label>
              <input type="text" value={on} id="ownerName" onChange={(e) => setOn(e.target.value)} />
            </div>
            <div className="pi_input_container pi_pn">
              <label className='pi_l' htmlFor="phoneNumber">Phone Number:</label>
              <input type="tel" value={P.mobile_no } id="phoneNumber" readOnly />
            </div>
            <div className="pi_input_container">
              <label htmlFor="emailId">Email Id:</label>
              <input type="email" value={e} id="emailId" onChange={(e) => setE(e.target.value)}/>
            </div>
            <div className="pi_input_container">
              <label htmlFor="gstNumber">GST Number:</label>
              <input type="text" value={gn} id="gstNumber" onChange={(e) => setGn(e.target.value)}/>
            </div>
            <div className="pi_input_container">
              <label htmlFor="panNumber">PAN Number:</label>
              <input type="text" value={pn} id="panNumber" onChange={(e) => setPn(e.target.value)}/>
            </div>
            <div className="pi_input_container pi_pc">
              <label className='pi_l' htmlFor="pincode">Pincode:</label>
              <input type="number" value={p} id="pincode" onChange={(e) => setP(e.target.value)}/>
            </div>
            <div className='pi_up_container'>
              <button className="pi_update_button" onClick={handleUpdate}>Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInformation;
