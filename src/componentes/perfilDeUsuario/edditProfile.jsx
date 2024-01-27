import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/actions/actions';
import { AuthContext } from '../AuthProvider/authProvider';
import { TextField, Button, Typography, Box } from '@mui/material';
import styles from './edditProfile.module.css';

const UserProfileForm = () => {
  const { auth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    address: '',
    country: '',
  });

  const [editMode, setEditMode] = useState({
    name: false,
    phone: false,
    address: false,
    country: false,
  });

  const dispatch = useDispatch();
  const { loading, error: updateUserError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth && auth.token) {
      const { id, name, phone, address, country } = auth.token;
      setFormData({
        id: id || '',
        name: name || '',
        phone: phone || '',
        address: address || '',
        country: country || '',
      });
    }
  }, [auth]);

  const handleEditClick = (field) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [field]: true,
    }));
  };

  const handleSaveClick = () => {
    const userId = formData.id;
    dispatch(updateUser(userId, formData));
    setEditMode({
      name: false,
      phone: false,
      address: false,
      country: false,
    });
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

return (
    <form className={styles.form} onSubmit={handleSaveClick}>
        <div className={styles.title}>
        <h4>Modifica tus datos</h4>
        </div>
      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="name">
          Nombre:
        </label>
        <TextField
          className={styles.input}
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={!editMode.name}
          variant="outlined"
          size="small"
        />
        <Button type="button" onClick={() => handleEditClick('name')} className={styles.editButton}>
          Editar
        </Button>
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="phone">
          Teléfono:
        </label>
        <TextField
          className={styles.input}
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={!editMode.phone}
          variant="outlined"
          size="small"
          />
        <Button type="button" onClick={() => handleEditClick('phone')} className={styles.editButton}>
          Editar
        </Button>
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="address">
          Dirección:
        </label>
        <TextField
          className={styles.input}
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          disabled={!editMode.address}
          variant="outlined"
          size="small"
          />
        <Button type="button" onClick={() => handleEditClick('address')} className={styles.editButton}>
          Editar
        </Button>
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="country">
          Ciudad:
        </label>
        <TextField
          className={styles.input}
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          disabled={!editMode.country}
          variant="outlined"
          size="small"
        />
        <Button type="button" onClick={() => handleEditClick('country')} className={styles.editButton}>
          Editar
        </Button>
      </div>

      <Button type="submit" className={styles.saveButton}>
        Guardar Cambios
      </Button>

      {updateUserError && <Typography className={styles.error}>Error al actualizar el usuario: {updateUserError}</Typography>}
    </form>
  );
};

export default UserProfileForm;