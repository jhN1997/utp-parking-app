import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { CommonActions, useNavigation } from '@react-navigation/native'; // 👈 IMPORTANTE
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Avatar, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import useModulesByRol from '../utils/useModulesByRol';

export default function CustomDrawer(props) {
  const { auth, logout } = useAuth();
  const navigation = useNavigation(); // 👈 navegación raíz
  const modules = useModulesByRol(auth?.role);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        }),
      );
    } catch (e) {
      Alert.alert('Error', 'No se pudo cerrar sesión.');
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.userInfo}>
        <Avatar.Icon size={48} icon="account" style={{ backgroundColor: '#FF7C84' }} />
        <Text style={styles.userName}>
          {auth?.name}, {auth?.lastNames}
        </Text>
        <Text style={styles.userId}>{auth?.utpCode}</Text>
      </View>

      <View style={styles.drawerSection}>
        <DrawerItem
          key={0}
          label="Inicio"
          icon={() => <Icon name="home-outline" size={22} />}
          onPress={() => props.navigation.navigate('Home')}
        />
        {modules.map((mod, index) => (
          <DrawerItem
            key={index + 1}
            label={mod.title}
            icon={() => <Icon name={mod.icon} size={22} color="#000" />}
            onPress={() => props.navigation.navigate(mod.route)}
          />
        ))}
      </View>

      <Divider style={{ marginVertical: 8 }} />

      <View style={styles.drawerSection}>
        <DrawerItem label="Ver Perfil" icon={() => <Icon name="account-outline" size={22} />} />
        <DrawerItem label="Cambiar Contraseña" icon={() => <Icon name="lock-reset" size={22} />} />
        <DrawerItem
          label="Cerrar sesión"
          icon={() => <Icon name="logout" size={22} color="#f00" />}
          onPress={handleLogout}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  userId: {
    fontSize: 13,
    color: '#777',
  },
  drawerSection: {
    paddingVertical: 8,
  },
});
