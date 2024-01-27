import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../redux/actions/actions';
import { AuthContext } from '../AuthProvider/authProvider';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import styles from './edditProfile.module.css';

const ChangePasswordForm = () => {
  const { auth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    id: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { loading, error: updateUserError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth && auth.token) {
      const { id, email } = auth.token;
      setFormData({
        id: id || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [auth]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
  
    setError(null);
  
    try {
      const userId = formData.id;
      const { currentPassword, newPassword } = formData;
  
      // Cambia la clave del cuerpo de la solicitud de 'newPassword' a 'password'
      dispatch(updatePassword(userId, currentPassword, newPassword));
      console.log("Datos a enviar a la acción:", { userId, currentPassword, newPassword });
  
      setEditMode(false);
    } catch (error) {
      setError("Error al actualizar el usuario");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className={styles.form} onSubmit={handleSaveClick}>
      <div className={styles.title}>
        <h4>Cambio de Contraseña</h4>
      </div>


      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="currentPassword">
          Contraseña Actual:
        </label>
        <TextField
          className={styles.input}
          id="currentPassword"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          type="password"
          variant="outlined"
          size="small"
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="newPassword">
          Nueva Contraseña:
        </label>
        <TextField
          className={styles.input}
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          type="password"
          disabled={!editMode}
          variant="outlined"
          size="small"
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="confirmPassword">
          Confirmar Contraseña:
        </label>
        <TextField
          className={styles.input}
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          type="password"
          disabled={!editMode}
          variant="outlined"
          size="small"
        />
      </div>

      <Button type="button" onClick={handleEditClick} className={styles.editButton}>
        Editar
      </Button>

      <Button type="button" onClick={handleSaveClick} className={styles.saveButton}>
        Guardar Cambios
      </Button>
      
      {error && <Alert severity="error">{error}</Alert>}
      {updateUserError && <Typography className={styles.error}>Error al actualizar el usuario: {updateUserError}</Typography>}
    </form>
  );
};

export default ChangePasswordForm;