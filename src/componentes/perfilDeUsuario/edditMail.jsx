import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/actions/actions';
import { AuthContext } from '../AuthProvider/authProvider';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import styles from './edditProfile.module.css';

const UserMail = () => {
  const { auth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const [editMode, setEditMode] = useState({
    email: false,
    password: false,
  });

  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { loading, error: updateUserError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth && auth.token) {
      const { id, email } = auth.token;
      setFormData({
        id: id || '',
        email: email || '',
        password: '',
        passwordConfirmation: '',
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
    if (editMode.password && formData.password !== formData.passwordConfirmation) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (editMode.password && !validatePassword(auth.token.password, formData.password)) {
      setError("La contraseña actual es incorrecta");
      return;
    }

    setError(null);

    const userId = formData.id;
    dispatch(updateUser(password, userId, formData));
    setEditMode({
      email: false,
      password: false,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (actualPassword, enteredPassword) => {
    return actualPassword === enteredPassword;
  };

  return (
    <form className={styles.form} onSubmit={handleSaveClick}>
      <div className={styles.title}>
        <h4>Modifica tu Email</h4>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="email">
          Nuevo Email:
        </label>
        <TextField
          className={styles.input}
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!editMode.email}
          variant="outlined"
          size="small"
        />
        <Button type="button" onClick={() => handleEditClick('email')} className={styles.editButton}>
          Editar
        </Button>
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor="password">
          Password:
        </label>
        <TextField
          className={styles.input}
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={!editMode.password}
          variant="outlined"
          size="small"
        />
        <Button type="button" onClick={() => handleEditClick('password')} className={styles.editButton}>
          Editar
        </Button>
      </div>

      {editMode.password && (
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="passwordConfirmation">
            Confirmar Password:
          </label>
          <TextField
            className={styles.input}
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </div>
      )}

      <Button type="submit" className={styles.saveButton}>
        Guardar Cambios
      </Button>

      {error && <Alert severity="error">{error}</Alert>}
      {updateUserError && <Typography className={styles.error}>Error al actualizar el usuario: {updateUserError}</Typography>}
    </form>
  );
};

export default UserMail;