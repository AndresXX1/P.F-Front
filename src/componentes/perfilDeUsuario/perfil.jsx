import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/authProvider";
import { Link } from "react-router-dom";
import { FaLock, FaEnvelope, FaUser, FaMapMarkerAlt, FaPhone, FaImage } from "react-icons/fa";
import { Tabs, Tab, Typography, Box } from '@mui/material';
import UserProfileForm from '../perfilDeUsuario/edditProfile';
import ChangePasswordForm from '../perfilDeUsuario/edditPass'; 
import UserMail from '../perfilDeUsuario/edditMail';
import styles from './perfil.module.css';

const UserProfile = () => {
  const { auth } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    name: '',
    profilePicture: '',
    phone: '',
    address: '',
    country: '',
    email: '',
  });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (auth && auth.token) {
      const { name, email, phone, address, country } = auth.token;
      setUserData({
        name: name || '',
        profilePicture: '', 
        phone: phone || '',
        address: address || '',
        country: country || '',
        email: email || "",
      });
    }
  }, [auth]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const renderComponent = () => {
    switch (value) {
      case 0:
        return <UserProfileForm />;
      case 1:
        return <UserMail />;
      case 2:
        return <ChangePasswordForm />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.Fullstack} >

    <div className={styles.Full}>
    <div className={styles.supercontainer}>
    
    <div className={styles.container}>
    <div className={styles.banner} />
            <div className={styles.userProfile}>
              <div className={styles.imageAndTabs}>
                <div className={styles.imageContainer}>
                  <div className={styles.profilePicture}>
                    {userData.profilePicture ? (
                      <img src={userData.profilePicture} alt="Perfil" />
                    ) : (
                      <p className={styles.altText}>Carga tu imagen</p>
                    )}
                  </div>
                </div>
                <ul className={styles.containerbotones}>
                  <li className={value === 0 ? styles.selected : ''}>
                    <div className={styles.tabContent} onClick={() => handleChange(0)}>
                      <FaUser style={{ marginRight: '30px' }}/>
                      <Typography>Cambiar Datos</Typography>
                    </div>
                  </li>
                  <li className={value === 1 ? styles.selected : ''}>
                    <div className={styles.tabContent} onClick={() => handleChange(1)}>
                      <FaEnvelope  style={{ marginRight: '30px' }} />
                      <Typography>Cambiar Email</Typography>
                    </div>
                  </li>
                  <li className={value === 2 ? styles.selected : ''}>
                    <div className={styles.tabContent} onClick={() => handleChange(2)}>
                      <FaLock style={{ marginRight: '30px' }} />
                      <Typography>Cambiar Password</Typography>
                    </div>
                  </li>
                </ul>
              </div>
        {/* los datos de usuario */}
        <div className={styles.profileInfo}>
          <div className={styles.previewContainer}>
            <div className={styles.previewWrapper}>
              <h4 className={styles.titulo}>Tus Datos</h4>
              <div className={styles.preview}>
                <div className={styles.textopreview}>
                  <div className={styles.textoPrev}>
                    <p className={styles.name}><strong> <FaUser /> Name: </strong>{userData.name}</p>
                    <p className={styles.name}><strong> <FaPhone /> Phone: </strong> {userData.phone}</p>
                    <p className={styles.name}><strong> <FaMapMarkerAlt /> Address: </strong>{userData.address}</p>
                    <p className={styles.name}><strong> <FaMapMarkerAlt /> Country: </strong>{userData.country}</p>
                    <p className={styles.name}><strong> <FaEnvelope /> Email: </strong>{userData.email}</p>
                    <p className={styles.name}><strong> <FaLock /> Password: ********* </strong></p>
                    <p className={styles.name}><strong> <FaImage /> Profile picture: </strong> {userData.profilePicture}</p>
                  </div>
                </div>
              </div>
            </div>
        {/* perfil renderizandose */}
        <div className={styles.userProfileFormContainer}>
                      {renderComponent()}
          </div>
        </div>

        </div>
      </div>
    </div>
    </div>
    </div>
                </div>
                
  );
};

export default UserProfile;