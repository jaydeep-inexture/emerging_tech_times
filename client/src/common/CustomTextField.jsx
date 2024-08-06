import {TextField, InputAdornment, IconButton} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';

const CustomTextField = ({
  label,
  placeholder,
  name,
  type,
  value,
  onChange = () => {},
  showPassword = true,
  setShowPassword = () => {},
  autoFocus = true,
  disabled = false,
}) => (
  <TextField
    variant='outlined'
    fullWidth
    disabled={disabled}
    autoFocus={autoFocus}
    label={label}
    placeholder={placeholder}
    type={type === 'password' && !showPassword ? 'password' : 'text'}
    name={name}
    autoComplete='off'
    value={value}
    onChange={onChange}
    InputProps={{
      endAdornment:
        type === 'password' ? (
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={() => setShowPassword(!showPassword)}
              edge='end'
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ) : null,
    }}
    sx={{
      marginTop: '25px',
      borderRadius: '8px',
      background: '#F6F5F5',
      '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
          borderColor: 'gray',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'gray',
          borderWidth: '1px',
        },
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderRadius: '8px',
      },
      '& .MuiInputLabel-root': {
        color: 'gray',
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: 'gray',
      },
      '& .MuiInputBase-input': {
        color: 'gray',
        '&::placeholder': {
          color: 'gray',
          opacity: 1,
        },
      },
    }}
  />
);

export default CustomTextField;
