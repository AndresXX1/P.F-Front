import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/authProvider";
import { FaLock, FaEnvelope, FaUser, FaMapMarkerAlt, FaPhone, FaImage } from "react-icons/fa";
import { Tabs, Tab, Typography, Box } from '@mui/material';
import UserProfileForm from '../perfilDeUsuario/edditProfile';
import ChangePasswordForm from '../perfilDeUsuario/edditPass'; 
import UserMail from '../perfilDeUsuario/edditMail';
import { Button, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Input } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateProfilePicture } from '../../redux/actions/actions';
import styles from './perfil.module.css';



const UserProfile = () => {
  const { auth, updateUserData } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageModified, setImageModified] = useState(false);
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState('');
  
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
      const { name, email, phone, address, country, profilePicture } = auth.token;
      setUserData({
        name: name || '',
        profilePicture: profilePicture || '',
        phone: phone || '',
        address: address || '',
        country: country || '',
        email: email || '',
      });
    }
  }, [auth, dispatch]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  
  const handleUrlChange = (event) => {
    setInputUrl(event.target.value);
  };

  const handleLoadUrlClick = () => {
    setImageUrl(inputUrl);
    setImageModified(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageUrl(file ? URL.createObjectURL(file) : '');
    setSelectedFile(file);
    setImageModified(true);
  };

  const handleSaveImageClick = async () => {
    if (imageModified && selectedFile) {
      try {
        const fileName = selectedFile.name;
        dispatch(updateProfilePicture(auth.token.id, { profilePicture: fileName }));
        setImageModified(false);
      } catch (error) {
        console.error('Error updating image:', error);
      }
    }
  };

  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.error('Error boundary caught an error:', error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return <p>Error en el componente UserProfile.</p>; // Puedes personalizar el mensaje de error
      }
  
      return this.props.children;
    }
  }

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
    <div className={styles.Fullstack}>
      <div className={styles.Full}>
        <div className={styles.supercontainer}>
          <div className={styles.container}>
            <div className={styles.banner} />
            <div className={styles.userProfile}>
              <div className={styles.imageAndTabs}>
                <div className={styles.imageContainer}>
                <div className={styles.profilePicture} style={{ backgroundImage: `url(${userData.profilePicture})` }}></div>
                </div>
                <div className={styles.upload}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                className={styles.fileInputContainer}
              >

                  <React.Fragment>
                    <Input
                      type="file"
                      id="profilePicture"
                      name="profilePicture"
                      accept="image/*"
                      onChange={handleFileChange}
                      className={styles.fileInput}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="profilePicture" className={styles.boton1}>
                      <FaImage /> <br />
                      Add img
                    </label>
                  </React.Fragment>
                
              </Box>
            </div>

                <div className={styles.up}>
              <Button className={styles.boton} onClick={handleSaveImageClick}>
                <div className={styles.icono}>
                  <CloudUploadIcon />
                  <p className={styles.guardar}>Guardar <br/> Imagen</p>
                </div>
              </Button>
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
                    <p className={styles.name}><strong> < FaImage/> Profile Picture: </strong>{userData.profilePicture}</p>
                     
                  </div>
                </div>
              </div>
            </div>
        {/* componentes renderizandose */}
        <div className={styles.userProfileFormContainer}>
        <ErrorBoundary>
            {renderComponent()}
            </ErrorBoundary>
          </div>
        </div>
        <div className={styles.profileimage}>

          
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


