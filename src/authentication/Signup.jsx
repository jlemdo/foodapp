// import React, { useState, useContext } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, Image, ScrollView } from 'react-native';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';
// import { AuthContext } from '../context/AuthContext';

// const SignUp = () => {
//   const navigation = useNavigation();
//   const { login } = useContext(AuthContext);

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [country, setCountry] = useState('');
//   const [zipCode, setZipCode] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSignUp = async () => {
//     if (!name || !email || !phone || !password || !confirmPassword) {
//       Alert.alert("Error", "Please fill all required fields");
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match");
//       return;
//     }

//     const payload = {
//       first_name: name.split(" ")[0],
//       last_name: name.split(" ")[1] || "",
//       email,
//       contact_number: phone,
//       password,
//       password_confirmation: confirmPassword
//     };

//     setLoading(true);
//     try {
//       const response = await axios.post('https://food.siliconsoft.pk/api/register', payload);
//       if (response.status === 201) {
//         const userData = response.data.user;
//         login(userData);
//         setLoading(false);
//         Alert.alert("Success", "User Registered Successfully!");
//         navigation.navigate('Login');
//       }
//     } catch (error) {
//       setLoading(false);
//       if (error.response) {
//         Alert.alert("Signup Error", error.response.data.message || "Something went wrong");
//       } else {
//         Alert.alert("Error", "Network Error. Please try again later.");
//       }
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Logo */}
//       <Image source={require('../assets/logo.webp')} style={styles.logo} />

//       <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} placeholderTextColor="#666" />
//       <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} placeholderTextColor="#666" />
//       <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} placeholderTextColor="#666" />
//       <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} placeholderTextColor="#666" />
//       <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} placeholderTextColor="#666" />

//       {/* Address Section */}
//       <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} placeholderTextColor="#666" />
//       <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} placeholderTextColor="#666" />
//       <TextInput style={styles.input} placeholder="State" value={state} onChangeText={setState} placeholderTextColor="#666" />
//       <TextInput style={styles.input} placeholder="Country" value={country} onChangeText={setCountry} placeholderTextColor="#666" />
//       <TextInput style={styles.input} placeholder="Zip Code" keyboardType="number-pad" value={zipCode} onChangeText={setZipCode} placeholderTextColor="#666" />

//       <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
//         {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//         <Text style={styles.link}>Already have an account? Login</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginBottom: 18,
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   button: {
//     width: '100%',
//     backgroundColor: 'tomato',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginVertical: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   link: {
//     color: '#2a9d8f',
//     marginTop: 10,
//     fontSize: 16,
//   },
// });

// export default SignUp;
// src/authentication/SignUp.jsx
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import fonts from '../theme/fonts';

export default function SignUp() {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    deliveryReference: '',
    zipCode: '',
    birthMonth: '',
    birthYear: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setErrors({ ...errors, [key]: null });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) {e.name = 'Obligatorio';}
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      {e.email = 'Email inválido';}
    if (!form.phone.trim()) {e.phone = 'Obligatorio';}
    if (form.password.length < 6)
      {e.password = 'Mínimo 6 caracteres';}
    if (form.password !== form.confirmPassword)
      {e.confirmPassword = 'No coincide';}
    if (!form.zipCode.trim()) {e.zipCode = 'Obligatorio';}
    return e;
  };

  const handleSignUp = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setLoading(true);

    const payload = {
      first_name: form.name.split(' ')[0] || '',
      last_name: form.name.split(' ')[1] || '',
      email: form.email,
      contact_number: form.phone,
      password: form.password,
      password_confirmation: form.confirmPassword,
      address: form.address,
      delivery_reference: form.deliveryReference,
      zip_code: form.zipCode,
      dob: `${form.birthMonth} ${form.birthYear}`,
    };

    try {
      const { status, data } = await axios.post(
        'https://food.siliconsoft.pk/api/register',
        payload
      );
      if (status === 201) {
        login(data.user);
        Alert.alert('Éxito', 'Usuario registrado');
        navigation.replace('Home');
      }
    } catch (err) {
      Alert.alert(
        'Error',
        err.response?.data?.message || 'Intenta nuevamente'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/** Nombre completo */}
      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder="Nombre completo"
        placeholderTextColor="rgba(47,47,47,0.5)"
        value={form.name}
        onChangeText={t => handleChange('name', t)}
        autoCapitalize="words"
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      {/** Teléfono */}
      <TextInput
        style={[styles.input, errors.phone && styles.inputError]}
        placeholder="Teléfono"
        placeholderTextColor="rgba(47,47,47,0.5)"
        value={form.phone}
        onChangeText={t => handleChange('phone', t)}
        keyboardType="phone-pad"
      />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

      {/** Contraseña */}
      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Contraseña"
        placeholderTextColor="rgba(47,47,47,0.5)"
        value={form.password}
        onChangeText={t => handleChange('password', t)}
        secureTextEntry
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      {/** Confirmar contraseña */}
      <TextInput
        style={[styles.input, errors.confirmPassword && styles.inputError]}
        placeholder="Confirmar contraseña"
        placeholderTextColor="rgba(47,47,47,0.5)"
        value={form.confirmPassword}
        onChangeText={t => handleChange('confirmPassword', t)}
        secureTextEntry
      />
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword}</Text>
      )}

      {/** Email */}
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        placeholderTextColor="rgba(47,47,47,0.5)"
        value={form.email}
        onChangeText={t => handleChange('email', t)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      {/** Dirección */}
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        placeholderTextColor="rgba(47,47,47,0.5)"
        value={form.address}
        onChangeText={t => handleChange('address', t)}
      />

      {/** Referencia de entrega */}
      <TextInput
        style={styles.input}
        placeholder="Referencia de entrega"
        placeholderTextColor="rgba(47,47,47,0.5)"
        value={form.deliveryReference}
        onChangeText={t => handleChange('deliveryReference', t)}
      />

      {/** Código postal */}
      <TextInput
        style={[styles.input, errors.zipCode && styles.inputError]}
        placeholder="Código postal"
        placeholderTextColor="rgba(47,47,47,0.5)"
        value={form.zipCode}
        onChangeText={t => handleChange('zipCode', t)}
        keyboardType="number-pad"
      />
      {errors.zipCode && <Text style={styles.error}>{errors.zipCode}</Text>}

      {/** Fecha de nacimiento */}
      <View style={styles.row}>
        <Picker
          selectedValue={form.birthMonth}
          style={styles.picker}
          onValueChange={v => handleChange('birthMonth', v)}>
          <Picker.Item label="Mes" value="" />
          {[
            'Enero','Febrero','Marzo','Abril','Mayo','Junio',
            'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
          ].map(m => (
            <Picker.Item key={m} label={m} value={m} />
          ))}
        </Picker>
        <TextInput
          style={[styles.input, styles.yearInput]}
          placeholder="Año"
          placeholderTextColor="rgba(47,47,47,0.5)"
          value={form.birthYear}
          onChangeText={t => handleChange('birthYear', t)}
          keyboardType="number-pad"
        />
      </View>

      {/** Botón de registro */}
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={handleSignUp}
        disabled={loading}
        activeOpacity={0.7}
        accessible
        accessibilityLabel="Registrarse">
        {loading ? (
          <ActivityIndicator color="#2F2F2F" />
        ) : (
          <Text style={styles.btnText}>Registrarse</Text>
        )}
      </TouchableOpacity>

      {/** Link a login */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.backLink}
        accessible
        accessibilityLabel="Ir a iniciar sesión">
        <Text style={styles.backText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F2EFE4',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#FFF',
    borderColor: '#8B5E3C',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    fontSize: fonts.size.medium,
    color: '#2F2F2F',
  },
  inputError: {
    borderColor: '#E63946',
  },
  error: {
    width: '100%',
    color: '#E63946',
    fontSize: fonts.size.small,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 12,
  },
  picker: {
    flex: 1,
    height: 48,
    borderColor: '#8B5E3C',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
    color: '#2F2F2F',
  },
  yearInput: {
    flex: 1,
    marginLeft: 0,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#D27F27',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
    elevation: 2,
  },
  btnText: {
    color: '#ffffff',
    fontFamily: fonts.bold,
    fontSize: fonts.size.medium,
  },
  backLink: {
    marginTop: 16,
  },
  backText: {
    color: '#2F2F2F',
    fontFamily: fonts.regular,
    fontSize: fonts.size.small,
  },
});
