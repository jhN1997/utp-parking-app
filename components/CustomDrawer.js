import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import useModulesByRol from '../utils/useModulesByRol';

export default function CustomDrawer(props) {
  const { usuario } = useAuth();
  const modules = useModulesByRol(usuario.rol);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.userInfo}>
        <Avatar.Icon size={48} icon="account" style={{ backgroundColor: '#FF7C84' }} />
        <Text style={styles.userName}>Hi, John</Text>
        <Text style={styles.userId}>U21213982</Text>
      </View>

      <View style={styles.drawerSection}>
        <DrawerItem
          label="Inicio"
          icon={() => <Icon name="home-outline" size={22} />}
          onPress={() => props.navigation.navigate('Home')}
        />

        {modules.map((mod) => (
          <DrawerItem
            key={mod.title}
            label={mod.title}
            icon={() => <Icon name={mod.icon} size={22} />}
            onPress={() => props.navigation.navigate(mod)}
          />
        ))}
      </View>

      <Divider style={{ marginVertical: 8 }} />

      <View style={styles.drawerSection}>
        <DrawerItem label="Ver Perfil" icon={() => <Icon name="account-outline" size={22} />} />
        <DrawerItem label="Cambiar Contraseña" icon={() => <Icon name="lock-reset" size={22} />} />
        <DrawerItem label="Cerrar Sesión" icon={() => <Icon name="logout" size={22} />} />
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
